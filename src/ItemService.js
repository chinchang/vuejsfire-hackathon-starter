export default {
  // TODO: Add Item caching
  promises: {},

  fetchItem (itemId) {
    var self = this,
      item;

    // If already being asked for, reuse promise.
    if (this.promises[itemId]) {
      return this.promises[itemId];
    }

    var promise = firebase.database().ref('/items/' + itemId).once('value').then(function (result) {
      delete self.promises[itemId];
      item = result.val();
      item.uid = itemId;
      item.title = item.title || 'Untitled Item'
      // item.createdOnFormatted = self.getFormattedDate(item.createdOn);
      return item;
    });

    this.promises[itemId] = promise;
    return promise;
  }
}
