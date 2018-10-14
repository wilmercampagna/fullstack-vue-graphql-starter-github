<template>

  <div class="container">

    <!-- user details card -->
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-right">
            <figure class="image is-128x128">
              <img :src="user.avatar" class="is-rounded" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content has-text-centered">
            <p class="title is-4"> {{user.username}} </p>
            <p class="subtitle is-6"> {{user.email}} </p>
            <p> <a class="has-text-danger"> {{user.favorites.length}} </a> Favorites </p> 
            <p> <a class="has-text-danger"> {{userPosts.length}} </a> Posts Added </p>
            <br>
            <time datetime="2016-1-1">Joined {{ formatJoinDate(user.joinDate)}}</time>
          </div>
        </div>
      </div>
    </div>

    <!-- Post favorites by user -->
    <div class="box" v-if="!userFavorites.length">
      <p class="title is-5">You haven't favorites currently, go and add some</p>
    </div>
    <div class="container">
      <div class="container-fluid">
        <h2 class="has-text-info has-text-centered pdn spaces">Favorites
          <span> {{userFavorites.length}} </span>
        </h2>
      </div>
      <div class="is-flex-desktop">
        <div class="container" v-for="favorite in userFavorites" :key="favorite.id">
          <router-link :to="`/posts/${favorite.id}`">
            <div class="card spaces">
              <div class="card-image">
                <figure class="image is-3by1">
                  <img :src="favorite.imageUrl" alt="Placeholder image">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4"> {{favorite.title}} </p>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Post Added by user -->
    <div class="box" v-if="!userPosts.length">
      <p class="title is-5">You haven't Added any post, go and add some</p>
    </div>
    <div class="container">
      <div class="container-fluid">
        <h2 class="has-text-centered has-text-danger pdn spaces">Post Added for me
          <span> {{userPosts.length}} </span>
        </h2>
      </div>
      <div class="is-flex-desktop">
        <div class="container" v-for="myPost in userPosts" :key="myPost.id">
          <div class="card spaces">
          <router-link :to="`/posts/${myPost.id}`">
            <div class="card-image">
              <figure class="image is-3by1">
                <img :src="myPost.imageUrl" alt="Placeholder image">
              </figure>
            </div>
          </router-link>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-6"> {{myPost.title}} </p>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a class="card-footer-item is-paddingless">
                <span class="icon has-text-info" @click="editPost(myPost)">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/></svg>
                </span>
              </a>
              <a class="card-footer-item is-paddingless" @click="handleDeleteUserPost(myPost)">
                <span class="icon has-text-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 512 512"><path fill="currentColor" d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"/></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit post section -->
    <div class="modal" :class="{'is-active': edit}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Actualizar Post <a class="has-text-danger"> {{title}} </a> </p>
          <button class="delete" aria-label="close" @click="editPost"></button>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="handleUpdateUserPost">
            <div class="control pdn">
              <input class="input" type="text" placeholder="Post title" v-model="title"
              :rules="titleRules" required>
            </div>
            <div class="control pdn">
              <input class="input" type="text" placeholder="Image Url" v-model="imageUrl"
              :rules="imageRules" required>
            </div>
            <div class="pdn">
              <div class="image" v-if="imageUrl">
                <img :src="imageUrl" alt="image" height="300px">
              </div>
            </div>
            <div class="field">
              <label class="label">Categories</label>
              <div class="control">
                <div class="select">
                  <select v-model="formulario.categories">
                    <option v-for="category in categories" :key="category.index" :value="category">
                       {{ category }} </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="control pdn">
              <textarea class="textarea" type="textarea" placeholder="Description" v-model="description"
              :rules="descRules" required> </textarea>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="handleUpdateUserPost">Save changes</button>
          <button class="button" @click="editPost">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {mapGetters} from 'vuex'
export default {
  name: 'Profile',
  data () {
    return {
      edit: false,
      isFormValid: true,
      title: '',
      imageUrl: '',
      formulario: {
        categories: 'Art'
      },
      categories: [
        'Art',
        'Education',
        'Travel',
        'Photography',
        'Technology'
      ],
      description: '',
      titleRules: [
        title => !!title || 'Title is required'
      ],
      imageRules: [
        image => !!image || 'image is required'
      ],
      descRules: [
        desc => !!desc || 'description is required'
      ]
    }
  },
  created () {
    this.handleGetUserPosts ()
  },
  computed: {
    ...mapGetters(['user', 'userFavorites', 'userPosts'])
  },
  methods: {
    formatJoinDate (date) {
      return moment(new Date(date)).format("ll")
    },
    handleUpdateUserPost () {
      this.$store.dispatch('updateUserPost', {
        postId: this.postId,
        userId: this.user.id,
        title: this.title,
        imageUrl: this.imageUrl,
        categories: this.categories,
        description: this.description
      })
      this.edit = false
    },
    editPost (myPost) {
      this.edit = !this.edit
      this.postId = myPost.id,
      this.title = myPost.title,
      this.imageUrl = myPost.imageUrl,
      this.categories = myPost.categories,
      this.description = myPost.description
    },
    handleDeleteUserPost (myPost) {
      const deletePost = window.confirm(`Are you sure you want to delete ${myPost.title} post?`)
      if (deletePost) {
        this.$store.dispatch('deleteUserPost', {
          postId: myPost.id
        })
      }
    },
    handleGetUserPosts () {
      this.$store.dispatch('getUserPosts', {
        userId: this.user.id
      })
    }
  }
}
</script>

<style>
  .spaces {
    margin: 10px;
  }
</style>

