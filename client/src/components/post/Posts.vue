<template>
  <div class="container">
    <div class="columns is-multiline is-centered" v-if="infiniteScrollPosts">
      <div class="column is-two-fifths" v-for="post in infiniteScrollPosts.posts" :key="post.id">
        <div class="card">
          <div class="card-image">
            <router-link :to="`posts/${post.id}`">
              <img :src="post.imageUrl" :alt="post.description">
            </router-link>
            <!-- <img :src="post.imageUrl" :alt="post.description"> -->
          </div>
          <div class="card-header">
            <div class="card-header-title" style="flex-direction: column; align-itemns: baseline;">
              <p> {{ post.title }} </p>
              <p class="subtitle is-7"> {{post.likes}} likes - {{post.messages.length}} comments </p>
            </div>
            <a class="card-header-icon" aria-label="more options" @click="showCreator">
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" viewBox="0 0 320 512"><path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"/></svg>
              </span>
            </a>
          </div>
          <footer class="card-footer" v-if="creator">

            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img class="is-rounded" :src="post.createdBy.avatar" alt="creator avatar">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-5">Created By {{ post.createdBy.username }}</p>
                  <p class="subtitle is-7">{{ formatCreatedDate(post.createdDate) }}</p>
                </div>
              </div>
            </div>
          </footer>
        </div>        
      </div>
    </div>
    <div class="">
      <a class="button is-danger" @click="showMorePosts" v-if="showMoreEnabled"> Fetch More </a>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { INFINITE_SCROLL_POSTS } from "../../queries";

const pageSize = 2

export default {
  name: "Posts",
  data() {
    return {
      pageNum: 1,
      // pageSize: 2,
      // showMoreEnabled: true,
      showPostCreator: false,
      creator: false
    };
  },
  apollo: {
    infiniteScrollPosts: {
      query: INFINITE_SCROLL_POSTS,
      variables: {
        pageNum: 1,
        pageSize
      }
    }
  },
  computed: {
    showMoreEnabled () {
      return this.infiniteScrollPosts && this.infiniteScrollPosts.hasMore
    }
  },
  methods: {
    formatCreatedDate (date) {
      return moment(new Date(date)).format('ll')
    },
    showCreator () {
      this.creator = !this.creator
    },
    showMorePosts() {
      this.pageNum += 1;
      // fetch more data and transform original result
      this.$apollo.queries.infiniteScrollPosts.fetchMore({
        variables: {
          // pageNum incremented by 1
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          console.log("previous result", prevResult.infiniteScrollPosts.posts)
          console.log("fetch more result", fetchMoreResult.infiniteScrollPosts);

          const newPosts = fetchMoreResult.infiniteScrollPosts.posts
          const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore
          // this.showMoreEnabled = hasMore;

          return {
            infiniteScrollPosts: {
              __typename: prevResult.infiniteScrollPosts.__typename,
              // Merge previous posts with new posts
              posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
              hasMore
            }
          }
        }
      })
    }
  }
}
</script>
