<template>
  <section class="page-section">

  <div class="pad">
    <div class="tac" style="margin: 80px 0" v-show="!isLoaded">
      <span class="spinner"></span><span class="text--light">Loading Item...</span>
    </div>

    <div v-if="isLoaded" transition="fade-in">
      <div class="dib">
        <h2 class="flush">{{ item.title }}</h2>
        <span style="font-size:0.8em;opacity:0.6">by <a class="link" v-link="{ name:'user', params:{ userId: item.createdBy } }">{{ userdisplayName }}</a></span>
      </div>
      <div class="item-action-btns">
        <a v-if="auth.user.uid === item.createdBy" v-link="{ name: 'edit', params: { itemId: $route.params.itemId } }" class="btn  hint--right" aria-label="Edit Item">
          <svg viewBox="0 0 24 24">
            <path d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" />
          </svg>
        </a>

        <div class="btn-group  dropdown">
          <a class="btn  hint--bottom-right" aria-label="Share this">
            <svg viewBox="0 0 24 24">
              <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
            </svg>
          </a>
          <div class="dropdown__menu  dropdown__menu--right" style="white-space:nowrap">
            <a class="btn" target="_blank" href="{{ shareUrls.twitter }}">
              <svg viewBox="0 0 16 16">
                <use xlink:href="#twitter-icon"/>
              </svg>
            </a>
            <a class="btn" target="_blank" href="{{ shareUrls.fb }}">
              <svg viewBox="0 0 24 24">
                <use xlink:href="#facebook-icon"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <p>{{ item.notes }}</p>
    </div>
  </div>
  </section>

</template>

<script>
import { auth } from '../Auth.js';
import itemService from '../ItemService.js';
import notificationStore from '../NotificationStore.js';

export default {
  data () {
    return {
      item: {},
      isLoaded: false,
      auth,
      userdisplayName: '',
      shareUrls: {}
    }
  },

  ready () {
    var self = this;

    itemService.fetchItem(this.$route.params.itemId).then(function (item) {

      self.item = Object.assign({}, self.item, item);
      document.title = item.title;

      self.isLoaded = true;

      firebase.database().ref('users/' + item.createdBy).child('displayName').once('value', function (snapshot) {
        self.userdisplayName = snapshot.val();
      });
      var url = encodeURIComponent('https://' + location.host + location.pathname + location.hash);

      self.shareUrls.twitter = 'https://twitter.com/intent/tweet?text="' + self.title + '"&url=' + url;

      self.shareUrls.fb = 'http://facebook.com/sharer/sharer.php?u=' + url;
    });
  },

  methods: {
  }
}
</script>


<style>
.item-action-btns {
  display: inline-block;
  vertical-align: top;
  margin-left: 20px;
}

</style>
