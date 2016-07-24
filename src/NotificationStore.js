export default {
  notifications: [],

  add (notification) {
    this.notifications.push(notification);
  },

  remove (notification) {
    this.notifications.$remove(notification);
  }
}
