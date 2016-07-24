<template>
    <div>
      <div class="hero tac">
        <h1>VueFire Hackathon Starter</h1>
        <h3>The most beautiful and quick hackathon starter kit</h3>
        <br>
        <a class="btn  btn--light hint--bottom  big-create-btn" aria-label="Lets create" @click="onCreateClick">Begin</a>
      </div>
    </div>
</template>

<script>
import { auth } from '../Auth.js';
import itemService from '../ItemService.js';
import ItemTile from '../ItemTile.vue';

export default {
  components: { ItemTile },

  data () {
    return {
      name: 'Home',
      popularItems: [],
      recentItems: []
    }
  },

  created() {
    var self = this;
  },

  methods: {
    onCreateClick() {
      if (auth.isLoggedIn) {
        // Take user to some valid route
        // this.$route.router.go({ name: 'someValidRouteName' });
      } else {
        this.$dispatch('openLoginDialogEvent')
      }
    }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 4.5em;
    margin-bottom: 10px;
  }
  h3 {
    margin-top: 10px;
    opacity: 0.7;
    letter-spacing: 2px;
  }
  .hero {
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: radial-gradient(rgba(0,0,0,0.10) 15%, transparent 16%) 0 0, radial-gradient(rgba(0,0,0,0.1) 15%, transparent 16%) 8px 8px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;
    background-size: 16px 16px;
    background-color: var(--brand-color); /*#6543a9;*/
    color: white;
  }
  .big-create-btn {
    font-size: 2em;
  }
  @media screen and (max-width: 600px) {
    .hero__logo {
      display: none;
    }
  }
</style>
