import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import { defaultClient as apolloClient } from './main'

import { GET_CURRENT_USER,
  GET_POSTS,
  INFINITE_SCROLL_POSTS,
  SIGNIN_USER,
  SIGNUP_USER,
  ADD_POST,
  SEARCH_POST,
  GET_USER_POSTS,
  UPDATE_USER_POST,
  DELETE_USER_POST
} from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    searchResults: [],
    userPosts: [],
    loading: false,
    user: null,
    error: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    },
    setSearchResults: (state, payload) => {
      if (payload !== null) {
        state.searchResults = payload
      }
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    setUserPosts: (state, payload) => {
      state.userPosts = payload
    },
    setLoading: (state, payload) => {
      state.loading = true
    },
    clearUser: state => (state.user = null),
    setError: (state, payload) => {
      state.error = payload
    },
    clearError: state => (state.error = null)
  },
  actions: {
    cError: ({commit}) => {
      commit('clearError')
    },
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true)
      apolloClient.query({
        query: GET_CURRENT_USER
      })
      .then(({ data }) => {
        commit('setLoading', false)
        // Add user data to state
        commit('setUser', data.getCurrentUser)
      })
      .catch(err => {
        commit('setLoading', false)
        console.error(err)
      })
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true)
      // using apolloclient to use getPosts query
      apolloClient
        .query({
          query: GET_POSTS
        }).then(({data}) => {
          commit('setPosts', data.getPosts)
          commit('setLoading', false)
        }).catch(err => {
          commit('setLoading', false)
          console.error(err)
        })
    },
    searchPosts: ({ commit }, payload) => {
      apolloClient.query({
        query: SEARCH_POST,
        variables: payload
      }).then(({ data }) => {
        commit('setSearchResults', data.searchPosts)
      }).catch(err => console.error(err))
    },
    getUserPosts: ({ commit }, payload) => {
      apolloClient.query({
        query: GET_USER_POSTS,
        variables: payload
      }).then(({ data }) => {
        commit('setUserPosts', data.getUserPosts)
      }).catch(err => console.error(err))
    },
    addPost: ({ commit }, payload) => {
      apolloClient.mutate({
        mutation: ADD_POST,
        variables: payload,
        update: (cache, { data: {addPost} }) => {
          const data = cache.readQuery({ query: GET_POSTS })
          data.getPosts.unshift(addPost)
          cache.writeQuery({
            query: GET_POSTS,
            data
          })
        },
        optimisticResponse: {
           __typename: 'Mutation',
           addPost: {
             __typename: 'Post',
             id: -1,
             ...payload
           }
        },
        // Rerun specified queries after performing the mutation in order to get fresh data
        refetchQueries: [
          {
            query: INFINITE_SCROLL_POSTS,
            variables: {
              pageNum: 1,
              pageSize: 2
            }
          }
        ]
      }).then(({ data }) => {
        console.log(data.addPost)
      }).catch(err => {
        console.error(err)
      })
    },
    updateUserPost: ({ state, commit }, payload) => {
      apolloClient.mutate({
        mutation: UPDATE_USER_POST,
        variables: payload
      }).then(({data}) => {
        const index = state.userPosts.findIndex(post => post.id === data.updateUserPost.id)
        const userPosts = [...state.userPosts.slice(0, index),
        data.updateUserPost,
        ...state.userPosts.slice(index + 1)]
        commit('setUserPosts', userPosts)
      }).catch(err => console.error(err))
    },
    deleteUserPost: ({ state, commit }, payload) => {
      apolloClient.mutate({
        mutation: DELETE_USER_POST,
        variables: payload
      }).then(({ data }) => {
        const index = state.userPosts.findIndex(
          post => post.id === data.deleteUserPost.id
          )
        const userPosts = [
          ...state.userPosts.slice(0, index),
          ...state.userPosts.slice(index + 1)
        ]
        commit('setUserPosts', userPosts)
      }).catch(err => console.error(err))
    },
    signinUser: ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading', true)
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false)
          localStorage.setItem('token', data.signinUser.token)
          // To make sure created methos is run in main.js (we run getcurrentUser), reload the page
          router.go()
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.error(err)
        })
    },
    signupUser: ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading', true)
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false)
          localStorage.setItem('token', data.signupUser.token)
          // To make sure created methos is run in main.js (we run getcurrentUser), reload the page
          router.go()
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.error(err)
        })
    },
    signoutUser: async ({ commit }) => {
      // Clear user state
      commit('clearUser')
      //Remove token from localStorage
      localStorage.setItem('token', '')
      //end session
      await apolloClient.resetStore()
      //redirect
      router.push('/')
    }
  },
  getters: {
    userPosts: state => state.userPosts,
    searchResults: state => state.searchResults,
    user: state => state.user,
    userFavorites: state => state.user && state.user.favorites,
    posts: state => state.posts,
    loading: state => state.loading,
    error: state => state.error
  }
})
