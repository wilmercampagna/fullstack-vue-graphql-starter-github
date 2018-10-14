<template>
  <div class="container">
    <h1> Home App </h1>
    <carousel v-if="loading && posts.length > 0" :autoplay="true" :autoplayTimeout="4000" :speed="3000" paginationColor="#00BBF0"
    paginationActiveColor="#005792" :perPage="2" :paginationEnabled="true">
      <slide v-for="post in posts" :key="post.id">
        <router-link :to="`posts/${post.id}`">
          <img :src="post.imageUrl" :alt="post.description" style="height: 300px">
        </router-link>
      </slide>
    </carousel>
  </div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  created () {
    this.getCarouselPosts()
  },
  components: { Carousel, Slide },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['posts', 'loading'])
  },
  methods: {
    getCarouselPosts () {
      this.$store.dispatch("getPosts")
    }
  }
}
</script>
