<template>
  <div class="container has-text-centered">
    <p class="title">Add Post</p>
    <div class="container">
      <div class="column is-half is-offset-one-quarter">
        <form @submit.prevent="handleAddPost">
          <p class="subtitle">Sign-in</p>
          <div class="control pdn">
            <input class="input" type="text" placeholder="Post title" v-model="title"
            required>
          </div>
          <div class="control pdn">
            <input class="input" type="text" placeholder="Image Url" v-model="imageUrl"
            required>
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
            required> </textarea>
          </div>
          <a v-if="!loading" class="button is-danger is-loading">Submit</a>
          <button v-else type="submit" class="button is-danger pdn">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AddPost',
  data () {
    return {
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
      description: ''
    }
  },
  methods: {
    handleAddPost () {
      this.$store.dispatch('addPost', {
        title: this.title,
        imageUrl: this.imageUrl,
        description: this.description,
        categories: this.formulario.categories,
        creatorId: this.user.id
      })
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['loading', 'user'])
  }
}
</script>

