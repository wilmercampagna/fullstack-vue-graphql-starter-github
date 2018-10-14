<template>
  <div class="container has-text-centered">
    <p class="title">Get starter here</p>
    <div class="container">
      <div class="column is-half is-offset-one-quarter">
        <div class="box has-background-primary">
          <form @submit.prevent="handleSignupUser">
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
              <input class="input" type="text" placeholder="Email" v-model="email"
              :rules="emailRules" required>
              <span class="icon is-right">
                <svg aria-hidden="true" height="20px" data-prefix="far" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
              </span>
            </div>
            <div class="control has-icon pdn">
              <input class="input" type="password" placeholder="Password" v-model="password"
              :rules="passwordRules" required>
              <span class="icon">
                <svg aria-hidden="true" height="20px" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
              </span>
            </div>
            <div class="control has-icon pdn">
              <input class="input" type="password" placeholder="Confirm Password" v-model="passwordConfirmation"
              :rules="passwordRules" required>
              <span class="icon">
                <svg aria-hidden="true" height="20px" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
              </span>
            </div>
            <a v-if="!loading" class="button is-danger is-loading">Sign-up</a>
            <button v-else type="submit" class="button is-danger pdn">Sign-up</button>
          </form>
          <p class="subtitle is-6 pdn">Alred have an account?
            <router-link to="signin">Signin</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Signup',
  data () {
    return {
      isFormValid: true,
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      usernameRules: [
        username => !!usename || 'Username is requiered',
        username => !!usename.length < 10 || 'Username cannot be more than 10 characters'
      ],
      emailRules: [
        email => !!email || 'Email is requiered',
        email => /.@+./.test(email) || 'Email must be valid'
      ],
      passwordRules: [
        password => !!password || 'Password is requiered',
        password => password.length >= 4 || 'Password must be at least 4 characters',
        confirmation => confirmation === this.password || 'Password must match'
      ]
    }
  },
  watch: {
    user (value) {
      if (value) {
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapGetters(['error', 'loading', 'user'])
  },
  methods: {
    handleSignupUser () {
      this.$store.dispatch('signupUser', {
        username: this.username,
        email: this.email,
        password: this.password
      })
      this.$router.push('/')
      // if (this.$refs.form.validate()) {
      // }
    }
  }
}
</script>

<style>
  .pdn {
    padding: 5px;
  }
</style>
