<template>
  <div class="pad">

    <section class="page-section tac">
      <img class="user-pic  user-pic--big" v-bind:src="userLargePhotoUrl" width="100" height="100" alt="">
      <h2>{{ user.displayName }}</h2>
      <div class="user-stats" v-if="isUserDataLoaded" transition="space-n-fade">
        <span style="font-size:2em">{{ user.numItems }}</span><span> Created</span>
      </div>
    </section>

    <section class="page-section">
      <h2>Created Items</h2>
      <div class="tac" style="margin: 80px 0" v-if="!isUserDataLoaded">
        <span class="spinner"></span><span class="text--light">Hold tight...</span>
      </div>
      <div class="item-list" v-if="isUserDataLoaded">
        <item-tile :item="item" v-for="item in userItems" transitio="jump-up" stagger="70"  track-by="uid"></item-tile>
      </div>
      <div class="text--light" v-if="isUserDataLoaded && !user.numItems">No items created! Strange!</div>
    </section>

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
      user: {},
      userItems: [],
      isUserDataLoaded: false
    }
  },
  route: {
    data (transition) {
      var self = this;
      var userId = transition.to.params.userId;
      this.userItems.splice(0);
      isUserDataLoaded: false;

      firebase.database().ref('users/' + userId).once('value', function (snapshot) {
        self.user = snapshot.val();

        self.isUserDataLoaded = true;
        self.user.numItems = self.user.items ? Object.keys(self.user.items).length : 0;

        // GET user's items
        for(var itemId in self.user.items) {
          self.fetchItem(itemId, self.userItems);
        }

        transition.next({});
      });
    }
  },

  ready () {
  },

  methods: {
    fetchItem (itemId, pushInArray) {
      itemService.fetchItem(itemId).then(function (item) {
        pushInArray.push(item);
      });
    },
  },

  computed: {
    userLargePhotoUrl: function () {
      if (!this.user || !this.user.photoURL) { return ''; }
      return this.user.photoURL.replace(/normal/, '200x200')
    }
  }
}
</script>

<style>
  .item-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>
