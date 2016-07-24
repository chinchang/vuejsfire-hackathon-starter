<template>
  <div class="notifications">
    <notification :notification="item" v-for="item in notifications"></notification>
  </div>
</template>

<script>

import notificationStore from './NotificationStore.js';
import Notification from './Notification.vue';

export default {
  components: { Notification },

  data() {
    return {
      notifications: notificationStore.notifications
    }
  },

  methods: {
    close() {
      this.isVisible = false;
    }
  },

  events: {
    'removeNotification': function (notification) {
      notificationStore.remove(notification);
    }
  }
}
</script>


<style>
.notifications {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 1;
}
</style>
