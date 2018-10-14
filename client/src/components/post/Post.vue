<template>
  <div class="container" v-if="getPost">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title"> {{ getPost.title }} </p>
        <a @click="handleToggleLike">
          <span class="icon" :class="{'liked': checkIfPostLiked}">
            <svg class="svg-inline--fa fa-w-16" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 576 512"><path fill="currentColor" d="M275.3 250.5c7 7.4 18.4 7.4 25.5 0l108.9-114.2c31.6-33.2 29.8-88.2-5.6-118.8-30.8-26.7-76.7-21.9-104.9 7.7L288 36.9l-11.1-11.6C248.7-4.4 202.8-9.2 172 17.5c-35.3 30.6-37.2 85.6-5.6 118.8l108.9 114.2zm290 77.6c-11.8-10.7-30.2-10-42.6 0L430.3 402c-11.3 9.1-25.4 14-40 14H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h78.3c15.9 0 30.7-10.9 33.3-26.6 3.3-20-12.1-37.4-31.6-37.4H192c-27 0-53.1 9.3-74.1 26.3L71.4 384H16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h356.8c14.5 0 28.6-4.9 40-14L564 377c15.2-12.1 16.4-35.3 1.3-48.9z"/></svg>
          </span>
        </a>
        <p class="subtitle is-7"> {{getPost.likes}} likes - {{getPost.messages.length}} comments </p>
        <a class="card-header-icon" aria-label="more options" @click="goToPreviousPage">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" viewBox="0 0 320 512"><path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"/></svg>
          </span>
        </a>
      </header>
      <div class="card-image" style="display: flex; justify-content: center;">
        <img :src="getPost.imageUrl" :alt="getPost.description" style="max-height: 60vh">
      </div>
    </div>
    <div class="container">
      <div class="section">
        <p class="is-pulled-left" >Messages ({{getPost.messages.length}})</p>
        <a class="button is-small is-rounded is-info is-pulled-right" @click="addComment">
          <span class="icon">
            <svg class="has-text-white" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 640 512"><path fill="currentColor" d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>
          </span>
          <span>Añadir Comentario</span>
        </a>
        <form v-if="writeComment" @submit.prevent="handleAddPostMessage">
          <textarea class="textarea is-info" type="text" v-model="messageBody" required></textarea>
          <a class="button is-info is-small" @click="handleAddPostMessage">Publicar comentario</a>
        </form>
      </div>
      <div class="container">
        <div class="card" v-for="message in getPost.messages" :key="message.id">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="message.messageUser.avatar" alt="User that comment" class="is-rounded">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4"> {{message.messageUser.username}} </p>
              </div>
            </div>
            <div class="content">
              <p class="subtitle is-6 is-marginless"> {{message.messageBody}} </p>
              <p class="subtitle is-7"> {{getTimeFromNow(message.messageDate)}} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { GET_POST, ADD_POST_MESSAGE, LIKE_POST, UNLIKE_POST } from '@/queries'
export default {
  name: 'Post',
  props: ['postId'],
  data () {
    return {
      postLiked: false,
      creator: false,
      writeComment: false,
      messageBody: ''
    }
  },
  apollo: {
    getPost: {
      query: GET_POST,
      variables () {
        return {
          postId: this.postId
        }
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'userFavorites']),
    checkIfPostLiked (postId) {
      if (this.userFavorites.some(item => item.id === this.postId)) {
        this.postLiked = true
        return true
      } else {
        this.postLiked = false
        return false
      }
    }
  },
  methods: {
    getTimeFromNow(time) {
      return moment(new Date(time)).fromNow()
    },
    handleToggleLike () {
      if (this.postLiked) {
        this.handleUnLikePost ()
      } else {
        this.handleLikePost ()
      }
    },
    handleLikePost () {
      const variables = {
        postId: this.postId,
        username: this.user.username
      }
      this.$apollo.mutate ({
        mutation: LIKE_POST,
        variables,
        update: (cache, { data: {likePost }}) => {
          const data = cache.readQuery({
            query: GET_POST,
            variables: { postId: this.postId }
          })
          data.getPost.likes += 1
          cache.writeQuery({
            query: GET_POST,
            variables: { postId: this.postId },
            data
          })
        }
      }).then(({data}) => {
        const updateUser = { ...this.user, favorites: data.likePost.favorites }
        this.$store.commit('setUser', updateUser)
      }).catch(err => console.error(err))
    },
    handleUnLikePost () {
      const variables = {
        postId: this.postId,
        username: this.user.username
      }
      this.$apollo.mutate ({
        mutation: UNLIKE_POST,
        variables,
        update: (cache, { data: {unlikePost }}) => {
          const data = cache.readQuery({
            query: GET_POST,
            variables: { postId: this.postId }
          })
          data.getPost.likes -= 1
          cache.writeQuery({
            query: GET_POST,
            variables: { postId: this.postId },
            data
          })
        }
      }).then(({data}) => {
        const updateUser = { ...this.user, favorites: data.unlikePost.favorites }
        this.$store.commit('setUser', updateUser)
      }).catch(err => console.error(err))
    },
    handleAddPostMessage () {
      const variables = {
        messageBody: this.messageBody,
        userId: this.user.id,
        postId: this.postId
      }
      this.$apollo.mutate({
        mutation: ADD_POST_MESSAGE,
        variables,
        update: (cache, { data: { addPostMessage } }) => {
          const data = cache.readQuery({
            query: GET_POST,
            variables: { postId: this.postId }
          })
          data.getPost.messages.unshift(addPostMessage)
          cache.writeQuery({
            query: GET_POST,
            variables: { postId: this.postId },
            data
          })
        },
      }).then(({ data }) => {
        console.log(data.addPostMessage)
      }).catch(err => console.error(err))
      this.messageBody = ''
      this.writeComment = !this.writeComment
    },
    addComment () {
      this.writeComment = !this.writeComment
    },
    goToPreviousPage () {
      this.$router.go(-1)
    },
    toggleImageDialog () {
      if (window.innerWidth > 500) {
        this.dialog = !this.dialog
      }
    }
  }
}
</script>

<style scoped>
  .liked {
    color: #F1F4F6;
    background-color: #ff3860;
    border-radius: 50%;
  }
  .pdn {
    padding: 10px;
  }
  .mrgn {
    margin: 20px;
  }
</style>
