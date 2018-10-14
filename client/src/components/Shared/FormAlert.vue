<template>
  <article class="message is-danger">
    <div class="message-header" :value="true" dismissible>
      <p>{{message}}</p>
      <button class="delete" aria-label="delete" @click="cError"></button>
    </div>
    <!-- <div class="message-body" :value="true" dismissible>
      <strong> {{message}} </strong>
    </div> -->
  </article>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['message'],
  methods: {
    ...mapActions(['cError'])
  }
}
</script>
