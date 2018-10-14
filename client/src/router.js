import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Posts from '@/components/post/Posts'
import AddPost from '@/components/post/AddPost'
import Post from '@/components/post/Post'

import Profile from '@/components/auth/Profile'
import Signin from '@/components/auth/Signin'
import Signup from '@/components/auth/Signup'
import AuthGuard from './AuthGuard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts/:postId',
      name: 'Post',
      component: Post,
      props: true,
      beforeEnter: AuthGuard
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/addpost',
      name: 'AddPost',
      component: AddPost,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
