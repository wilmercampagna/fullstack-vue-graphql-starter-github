<template>
  <div class="bckg">
    <gql-header></gql-header>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import GqlHeader from '@/components/layout/Header'
export default {
  components: {GqlHeader}
}
</script>


<style lang="scss">
@import '@/assets/scss/main.scss';
  .fade-enter-active,
  .fade-leave-active {
    transition-property: opacity; 
    transition-duration: 0.25s;
  }

  .fade-enter-active {
    transition-delay: 0.25s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    // transform: translateY(-25px);
  }
  .bckg {
    background-color: #F1F4F6;
  }
</style>

