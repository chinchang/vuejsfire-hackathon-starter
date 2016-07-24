<template>
  <div class="notification" transition="notification">
    {{ notification.title }}
  </div>
</template>

<script>

export default {
  props: [ 'notification' ],

  data() {
    return {
      timeout: null
    }
  },

  created() {
    this.timeout = setTimeout(this.close.bind(this), 2000);
  },

  methods: {
    close() {
      this.$dispatch('removeNotification', this.notification);
    }
  }
}
</script>


<style>
.notification {
  padding: 20px;
  border-radius: 8px;
  background: #333;
  color: #eee;
  margin-top: 20px;
}

.notification-transition {
  transform: translateY(0);
  transition: 0.3s ease;
}
.notification-enter, .notification-leave {
  opacity: 0;
  transform: translateY(30px);
}
.notification-leave {
  transform: translateY(-30px);
}

</style>
