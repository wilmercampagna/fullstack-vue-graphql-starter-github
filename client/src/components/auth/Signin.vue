<template>
  <div class="container has-text-centered">
    <p class="title">Welcome back</p>
    <div class="container">
      <div class="column is-half is-offset-one-quarter">
        <div class="box has-background-primary">
          <form @submit.prevent="handleSigninUser">
            <p class="subtitle">Sign-in</p>

            <div v-if="error">
              <form-alert :message="error.message"></form-alert>
            </div>

            <div class="control has-icons-left has-icons-right pdn">
              <input class="input" type="text" placeholder="Username" v-model="username"
              :rules="usernameRules" required>
              <span class="icon is-left">
                <svg aria-hidden="true" height="20px" data-prefix="far" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path></svg>
              </span>
              <span class="icon is-right">
                <svg aria-hidden="true" height="20px" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
              </span>
            </div>
            <div class="control has-icon pdn">
              <input class="input" type="password" placeholder="Password" v-model="password"
              :rules="passwordRules" required>
              <span class="icon">
                <svg aria-hidden="true" height="20px" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
              </span>
            </div>
            <a v-if="!loading" class="button is-danger is-loading">Sign-in</a>
            <button v-else type="submit" class="button is-danger pdn">Sig-in</button>
          </form>
          <p class="subtitle is-6 pdn">Haven't an account
            <router-link to="signup">Signup</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Signin',
  data () {
    return {
      username: '',
      password: '',
      usernameRules: [
        username => !!username || "Username is required",
        username => username.length < 10 || "Username must be less than 10 characters"
      ],
      passwordRules: [
        password => !!password || "Password is required",
        password => password.length > 6 || "Password must be at less 7 characters"
      ]
    }
  },
  computed: {
    ...mapGetters(['user', 'error', 'loading'])
  },
  watch: {
    user (value) {
      // if user value changes from null to object, redirect to home page
      if (value) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    handleSigninUser () {
      this.$store.dispatch('signinUser', {
        username: this.username,
        password: this. password
      })
    }
  }
}
</script>

<style scoped>
  .pdn {
    padding: 5px;
  }
</style>

