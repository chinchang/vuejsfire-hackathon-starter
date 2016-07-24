<template>
    <div class="pad">
      <section class="page-section">
        <h2>Title</h2>
        <input type="text" class="title-input" placeholder="My cool Item!" v-model="title">
      </section>

      <section class="page-section">
        <h2>Notes
          <a @click="showHelp">
            <svg viewBox="0 0 24 24">
              <path d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
            </svg>
          </a>
        </h2>
        <textarea v-model="notes" class="dialogue-input" id="" cols="30" rows="10"></textarea>
      </section>

      <div class="fixed-btns">
        <button class="btn  hint--left" aria-label="Save" @click="save">
          <svg viewBox="0 0 24 24">
            <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
          </svg>
          <span>Save</span>
        </button>
      </div>

      <modal :is-visible.sync="isHelpModalVisible">
        <h2>Some help regarding Creation</h2>
        <p>Lorem Ipsum Donal Trump :)</p>
      </modal>

    </div>
</template>

<script>
import { auth } from '../Auth.js';
import notificationStore from '../NotificationStore.js';
import Modal from '../Modal.vue';

export default {
  components: { Modal },

  data () {
    return {
      title: '',
      notes: '',
      isHelpModalVisible: false
    }
  },

  route: {
    data: function (transition) {
      var self = this;
      var itemId = transition.to.params.itemId;

      if (itemId) {
        firebase.database().ref('/items/' + itemId).once('value').then(function (result) {
          var item = result.val();

          self.notes = item.notes;
          self.title = item.title;
        })
      } else {
        // TODO: Add sample actors
        this.title = ''
        this.dialogue = '1: Hello!\n1: I am a dummy character\n2: Mee too!\n1: Delete and add characters of your own\n2: Or simply play with us!';
      }
    }
  },

  created () {
    var self = this;

    document.title = 'Create';
  },

  methods: {
    showHelp () {
      this.isHelpModalVisible = true;
    },

    saveFirstTime () {
      var self = this,
        newItemKey = firebase.database().ref().child('items').push().key,
        userId = firebase.auth().currentUser.uid;

      firebase.database().ref('items/' + newItemKey).set({
        title: self.title || 'Untitled Item',
        notes: self.notes,
        createdBy: userId,
        createdOn: Date.now()
      }).then(function () {
        console.log('saved item', newItemKey);

        // Save new item with user too.
        firebase.database().ref('users/' + userId).child('items').child(newItemKey).set(true).then(function () {
          self.showSaveNotification();
          self.$route.router.go({ name: 'edit', params: { itemId: newItemKey }});
        });
      });
    },

    save () {
      var self = this,
        itemId = this.$route.params.itemId;

      if (!itemId) {
        this.saveFirstTime();
        return;
      }

      firebase.database().ref('items/' + itemId).update({
        title: this.title || 'Untitled Item',
        notes: this.notes,
        updatedOn: Date.now(),
        actors: this.actors
      }).then(self.showSaveNotification);
    },

    showSaveNotification () {
      notificationStore.add({
        title: 'Item Saved!'
      });
    }
  }
}
</script>

<style>

@media screen and (max-width: 700px) {
  .title-input {
    width: 100%;
  }
  .notes-input {
    padding: 10px;
    width: 100%;
  }
}
.fixed-btns {
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 40px;
  justify-content: right;
  text-align: right;
  top: 35%;
}
.fixed-btns > .btn {
  margin: 10px 0;
}
@media screen and (max-width: 800px) {
  .fixed-btns {
    padding: 10px;
  }
  .fixed-btns > .btn {
    border-radius: 50%;
    padding: 6px 11px;
  }
  .fixed-btns > .btn > span {
    display: none;
  }
}
.dialogue-text {
  color: blueviolet;
}
</style>
