<template>
  <div class="mgrn">
    <nav class="navbar is-primary is-fixed-top">
      <div class="navbar-brand">

        <router-link class="navbar-item" to="/">
          <img src="@/assets/while.png" alt="logo input" width="35px">
        </router-link>

        <a class="navbar-item">
          <div class="field has-addons">
            <div class="control">
              <a class="button has-background-grey-lighter">
                <svg aria-hidden="true" data-prefix="fas" data-icon="search-plus"
                class="svg-inline--fa fa-search-plus fa-w-16 has-text-white" role="img"
                width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 192v32c0 6.6-5.4 12-12 12h-56v56c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-56h-56c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h56v-56c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v56h56c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"></path></svg>
              </a>
            </div>
            <div class="control is-expanded">
              <input type="search" class="input"
              placeholder="Search Post" v-model="searchTerm" @input="handleSearchPosts">
            </div>
          </div>
        </a>

        <!-- search results card -->

        <div class="card" v-if="searchResults.length" id="search_card">
          <ul>
            <li v-for="result in searchResults" :key="result.id">
              <router-link class="box" :to="`/posts/${result.id}`">
                <h1 class="title is-5"> {{result.title}} </h1>
                <p class="subtitle is-6"> {{ result.description }} </p>
              </router-link>
            </li>
          </ul>
        </div>
        
        <div class="navbar-start">
          <router-link to="/" class="navbar-item is-hidden-touch">Home</router-link>
          <router-link v-if="user" class="navbar-item" :class="{'bounce': badgeAnimated}"
          to="/profile">
            <img :src="user.avatar" alt="avatar" class="pdn">
            <p class="pdn is-hidden-mobile"> {{user.username}} </p>
            <p class="has-text-danger" v-if="userFavorites"> {{userFavorites.length}} </p>
          </router-link>
        </div>
    
        <div class="navbar-burger burger" :class="{'is-active': burgerMenu}"
        data-target="navbarBurger" @click="openBurger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    
      <div id="navbarBurguer" class="navbar-menu" :class="{'is-active': burgerMenu}">
        <div class="navbar-end">
          <router-link v-for="item in dropItems" class="navbar-item" :to="item.link" :key="item.index">
            <span> {{item.title}} </span>
          </router-link>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"></a>
          <div class="navbar-dropdown">
            <router-link v-for="item in sideNavItems" :key="item.index" :to="item.link"
            class="navbar-item centeritem"> {{ item.title }} </router-link>
          </div>
        </div>
        <a class="navbar-item" v-if="user" @click="handleSignoutUser">
          <span class="icon has-text-danger">
            <svg aria-hidden="true" data-prefix="fas" width="20px" data-icon="power-off" class="svg-inline--fa fa-power-off fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M400 54.1c63 45 104 118.6 104 201.9 0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31-41.5 30.8-68 79.6-68 134.9-.1 92.3 74.5 168.1 168 168.1 91.6 0 168.6-74.2 168-169.1-.3-51.8-24.7-101.8-68.1-134-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z"></path></svg>
          </span>
        </a>
      </div>
    </nav>
  </div>
</template>       

<script>
import { mapGetters } from "vuex";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      searchTerm: '',
      burgerOne: false,
      burgerMenu: false,
      badgeAnimated: true
    };
  },
  methods: {
    handleSearchPosts () {
      this.$store.dispatch('searchPosts', {
        searchTerm: this.searchTerm
      })
    },
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },
    openBurgerOne() {
      this.burgerOne = !this.burgerOne;
    },
    openBurger() {
      this.burgerMenu = !this.burgerMenu;
    }
  },
  computed: {
    ...mapGetters(["user", "loading", "userFavorites", "searchResults"]),
    dropItems() {
      let items = [
        { title: "Post", link: "/posts" },
        { title: "Sign In", link: "/signin" },
        { title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [{ title: "Post", link: "/posts" }];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { title: "Home", link: "/" }
      ];
      if (this.user) {
        items = [
          { title: "Home", link: "/" },
          { title: "Create Post", link: "/addpost" },
          { title: "Profile", link: "/profile" }
        ];
      }
      return items;
    }
  }
};
</script>

<style scoped>
.mgrn {
  margin-bottom: 65px;
}
.pdn {
  padding: 5px;
}
.box {
background-color: rgba(199, 217, 218, 0.5) !important;
}
#search_card {
  position: absolute;
  width: 100vw;
  z-index: 8;
  top: 100%;
  left: 0%;
  background-color: rgba(97, 157, 255, 0.5) !important;
}
.bounce {
  animation: bounce 1s both;
}
@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}
@media screen and (max-width: 500px) {
  .input {
    max-width: 180px;
  }
}
@media screen and (max-width: 400px) {
  .input {
    max-width: 130px;
  }
}  
</style>

