<template>
  <div class="item-tile">
    <a class="item-tile__top" v-link="{ name: 'item', params: { itemId: item.uid }}" v-bind:title="item.title">
      <h2 class="flush">{{ item.title }}</h2>
    </a>
    <div class="item-tile__bottom  flex">
      <div class="flex" style="align-items:center;">
        <span>{{ createdOnFormatted }} </span>
      </div>
    </div>
  </a>
</template>

<script>

import { auth } from './Auth.js';
import itemService from './ItemService.js';

export default {
  props: [ 'item' ],

  data() {
    return {
      user: {}
    }
  },

  created() {
    var self = this;
    firebase.database().ref('users/' + this.item.createdBy).once('value', function (snapshot) {
      self.user = snapshot.val();
    });
  },

  computed: {
    createdOnFormatted: function () {
      var d = new Date(this.item.createdOn);
      var month = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ][d.getMonth()];
      return d.getDate() + ' ' + month + ', ' + d.getFullYear();
    }
  }
}
</script>


<style>
.item-tile {
  display: flex;
  flex-direction: column;
  margin: 20px;
  background: white;
  border: 1px solid #DDD;
  border-radius: 4px;
  flex-basis: calc(33% - 40px);
  overflow: hidden;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,0.1);
  transition: background 0.3s ease;
}
.item-tile h2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-tile:hover {
  background: #f6f6f6;
}
.item-tile__img {
  float: left;
  width: 40px;
  min-height: 30px;
  margin-right: 20px;
  vertical-align: top;
}
.item-tile__right {
  overflow: hidden;
}

.item-tile__top, .item-tile__bottom {
  padding: 20px;
}
.item-tile__top {
  min-height: 40px;
  flex: 1;
}
.item-tile__bottom {
  border-top: 1px solid #DDD;
  justify-content: space-between;
}

@media screen and (max-width: 1280px) {
  .item-tile {
    flex-basis: calc(50% - 40px);
  }
}
@media screen and (max-width: 900px) {
  .item-tile {
    flex-basis: 100%;
    margin: 20px 0;
  }
}
</style>
