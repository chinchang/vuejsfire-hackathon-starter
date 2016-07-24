import deferred from './deferred.js';

export class Auth {

  constructor() {
    var self = this;
    this.isLoggedIn = false;
    this.user = null;
    this.loginDeferred = deferred();
    this.userDataDeferred = deferred();

    // Initialize Firebase
    // Change parameters according to your firebase config
    var config = {
      apiKey: "AIzaSyC1DkebpFDcclAFDpt2zbu_mcFTi9tRnA8",
      authDomain: "cool-project-9a463.firebaseapp.com",
      databaseURL: "https://cool-project-9a463.firebaseio.com",
      storageBucket: "",
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.user = firebase.auth().currentUser;
        self.isLoggedIn = true;
        self.loginDeferred.resolve();

        // Listen for future changes on user obj
        firebase.database().ref('users/' + self.user.uid).on('value', self.onUserDataChange.bind(self));
      } else {
        self.user = null;
        self.isLoggedIn = false;
      }
    });
  }

  onUserDataChange(snapshot) {
    Object.assign(this.user, snapshot.val());
    this.userDataDeferred.resolve(this.user);
  }

  onLogin() {
    return this.loginDeferred.promise;
  }

  getUserData() {
    return this.userDataDeferred.promise;
  }

  login(provider) {
    var self = this;
    var provider;
    if (provider === 'fb') {
      provider = new firebase.auth.FacebookAuthProvider();
    } else {
      provider = new firebase.auth.TwitterAuthProvider();
    }

    return firebase.auth().signInWithPopup(provider).then(function(result) {
      // Save this user in the store
      firebase.database().ref('users/' + result.user.uid).update({
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.providerData[0].photoURL,
        signedUpOn: Date.now()
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(error)
    });
  }

  logout() {
    firebase.auth().signOut().then(function () {
      location.reload();
    });
  }
}

// Export a singleton instance
export let auth = new Auth();