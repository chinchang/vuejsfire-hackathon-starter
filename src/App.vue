
<template>
  <div class="main-wrap">
    <header>
      <a class="header__logo-wrap" v-link="{ path: '/' }">
        <svg class="logo" style="width:48px;height:48px;margin-right:10px" viewBox="0 0 24 24">
          <path fill="#ffffff" d="M5,19A1,1 0 0,0 6,20H18A1,1 0 0,0 19,19C19,18.79 18.93,18.59 18.82,18.43L13,8.35V4H11V8.35L5.18,18.43C5.07,18.59 5,18.79 5,19M6,22A3,3 0 0,1 3,19C3,18.4 3.18,17.84 3.5,17.37L9,7.81V6A1,1 0 0,1 8,5V4A2,2 0 0,1 10,2H14A2,2 0 0,1 16,4V5A1,1 0 0,1 15,6V7.81L20.5,17.37C20.82,17.84 21,18.4 21,19A3,3 0 0,1 18,22H6M13,16L14.34,14.66L16.27,18H7.73L10.39,13.39L13,16M12.5,12A0.5,0.5 0 0,1 13,12.5A0.5,0.5 0 0,1 12.5,13A0.5,0.5 0 0,1 12,12.5A0.5,0.5 0 0,1 12.5,12Z" />
        </svg>
        <h3 style="display:inline-block;margin:0;color:white">VueFire Hackathon Starter</h3>
        <span class="beta-tag">Beta</span>
      </a>
      <div class="header__right">
        <a class="header-link" v-if="!isLoggedIn" v-on:click="isLoginModalVisible = true">Login</a>

        <modal :is-visible.sync="isLoginModalVisible" modal-class="login-modal">
          <div class="tac">
            <a class="btn" style="background:#4267b2; color: white" v-on:click="login('fb')">Login with Facebook</a>
            <br>
            <br>
            <a class="btn" style="background:#04A4FF; color: white" v-on:click="login('twitter')">Login with Twitter</a>
          </div>
        </modal>

        <template v-if="isLoggedIn">
          <a class="header-link hint--bottom" aria-label="Create new Item" v-link="{ name: 'new' }">
            <svg viewBox="0 0 24 24">
              <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </a>
          <a class="header-link  hint--bottom-left" aria-label="Logout" v-on:click="logout()">
            <svg viewBox="0 0 24 24">
              <path d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
            </svg>
          </a>
          <a class="header-link  hint--bottom-left" aria-label="See Profile" v-link="{ name: 'user', params: { userId: user.uid }}">
            <img class="user-pic vam" v-bind:src="user.photoURL" alt="">
          </a>
        </template>
      </div>
    </header>
    <div class="content-wrap">
      <router-view transition="fade-in" transition-mode="out-in"></router-view>
    </div>
    <footer>
      <div>
        &copy; 20XX Kushagra Gour
      </div>
      <div style="display:flex;align-items:center;">
        <a href="mailto:hello@coolproject.com" class="footer-link">contact</a>
        <a v-link="{ path: '/about' }" class="footer-link">about</a>
        <a href="https://twitter.com/chinchang457" target="_blank" class="footer-link">
          <svg viewBox="0 0 16 16">
            <use xlink:href="#twitter-icon"/>
          </svg>
        </a>
      </div>
    </footer>

    <notifications></notifications>

    <svg style="display:none">
      <defs>
        <!-- 16 16 0 0 -->
        <path id="twitter-icon" d="M15.969,3.058c-0.586,0.26-1.217,0.436-1.878,0.515c0.675-0.405,1.194-1.045,1.438-1.809
        c-0.632,0.375-1.332,0.647-2.076,0.793c-0.596-0.636-1.446-1.033-2.387-1.033c-1.806,0-3.27,1.464-3.27,3.27 c0,0.256,0.029,0.506,0.085,0.745C5.163,5.404,2.753,4.102,1.14,2.124C0.859,2.607,0.698,3.168,0.698,3.767 c0,1.134,0.577,2.135,1.455,2.722C1.616,6.472,1.112,6.325,0.671,6.08c0,0.014,0,0.027,0,0.041c0,1.584,1.127,2.906,2.623,3.206 C3.02,9.402,2.731,9.442,2.433,9.442c-0.211,0-0.416-0.021-0.615-0.059c0.416,1.299,1.624,2.245,3.055,2.271 c-1.119,0.877-2.529,1.4-4.061,1.4c-0.264,0-0.524-0.015-0.78-0.046c1.447,0.928,3.166,1.469,5.013,1.469 c6.015,0,9.304-4.983,9.304-9.304c0-0.142-0.003-0.283-0.009-0.423C14.976,4.29,15.531,3.714,15.969,3.058z"/>

        <!-- 24 24 0 0 -->
        <path id="facebook-icon" d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />

      </defs>
    </svg>
  </div>
</template>

<script>
import { auth } from './Auth.js';
import Modal from './Modal.vue';
import Notifications from './Notifications.vue';

export default {
  components: { Modal, Notifications },

  data () {
    return {
      isLoggedIn: false,
      user: null,
      isLoginModalVisible: false,
      isEmbedded: window.inIframe
    }
  },
  created () {
    var self = this;

    firebase.auth().onAuthStateChanged(function(user) {
      self.user = auth.user;
      self.isLoggedIn = auth.isLoggedIn;
      self.isLoginModalVisible = false;
    });
  },

  methods: {
    onLogin () {
      this.user = auth.user;
      this.isLoggedIn = auth.isLoggedIn;
    },

    login (provider) {
      auth.login(provider);
    },

    logout() {
      auth.logout();
    }
  },

  events: {
    'openLoginDialogEvent': function () {
      this.isLoginModalVisible = true;
    }
  }
}
</script>

<style>
:root {
  /* Change as per your preference */
  --brand-color: dodgerblue;
  --footer-color: black;
}

[class*="hint--"]:after {
  border-radius: 6px;
  text-transform: initial;
  word-spacing: normal;
}
.is-touch [class*="hint--"]:after,
.is-touch [class*="hint--"]:before {
  display: none;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.3em;
  margin: 0 0 10px 0;
}
textarea, input[type="text"] {
  border: 2px solid rgba(0,0,0,0.3);
  border-radius: 6px;
  padding: 10px;
  /*font-family: 'Abel', sans-serif;*/
  font-size: 1em;
}
textarea:focus, input[type="text"]:focus {
  outline: 0;
  border: 2px solid rgba(0,0,0,0.5);
}
.link {
  color: var(--brand-color);
}
.link:hover {
  text-decoration: underline;
}

.btn {
  display: inline-block;
  color: rgba(0,0,0,0.75);
  background: #efefef;
  padding: 5px 15px;
  margin: 0 0.2em;
  border: 3px solid rgba(0,0,0,0.03);
  border-radius: 30px;
  cursor: pointer;
  text-transform: uppercase;
  font-family: inherit;
  text-align: center;
  transition: 0.3s ease;
  font-size: 1.4em;
  letter-spacing: 3px;
  transition: 0.3s ease;
  outline: 0;
}
.btn--light {
  color: rgba(255,255,255,0.85);
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.35);
}
.btn svg {
  width: 36px;
  height: 36px;
  vertical-align: middle;
  fill: rgba(0,0,0,0.5);
  transition: 0.25s ease;
}
@media screen and (max-width: 600px) {
  .btn {
    padding: 3px 10px;
  }
  .btn svg {
    width: 28px; height: 28px;
  }
}
.btn--light svg {
  fill: white;
}
a > svg {
  width: 36px;
  height: 36px;
  vertical-align: middle;
  fill: #888;
  transition: 0.25s ease;
}
@media screen and (max-width: 600px) {
  a > svg {
    width: 28px; height: 28px;
  }
}
a:hover > svg {
  fill: #444;
}
.btn:hover {
  background: var(--brand-color);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  color: white;
}
.btn:hover svg {
  fill: white;
}
.page-section {
  margin-bottom: 50px;
  background: rgba(255,255,255,0.4);
  padding: 40px 80px;
  /* border-radius: 5px; */
  border: 3px solid rgba(0,0,0,0.1);
  border-left: 0;
  /* box-shadow: 0 3px 6px 0 rgba(0,0,0,0.1); */
  border-right: 0;
}
@media screen and (max-width: 600px) {
  .page-section {
    padding: 40px;
  }
}
@media screen and (max-width: 400px) {
 .page-section {
    padding: 20px;
  }
}
.page-section:first-of-type {
  border-top: 0;
}
header, footer {
  padding: 15px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}
@media screen and (max-width: 400px) {
 header, footer {
    padding: 10px 20px;
  }
}
header {
  background: radial-gradient(rgba(0,0,0,0.10) 15%, transparent 16%) 0 0, radial-gradient(rgba(0,0,0,0.1) 15%, transparent 16%) 8px 8px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;
  background-size: 16px 16px;
  background-color: var(--brand-color);
}
.header__logo-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.header__right {
  display: flex;
  align-items: center;
}
.header-link, .footer-link {
  letter-spacing: 1px;
  word-spacing: 3px;
  margin-left: 20px;
}
.header-link {
  color: rgba(255, 255,255, 0.8);
}
.header-link > svg {
  fill: rgba(255, 255,255, 0.8);
}
.header-link:hover {
  color: white;
}
.header-link:hover > svg {
  fill: rgba(255, 255,255, 1);
}
.footer-link {
  color: inherit;
}
.footer-link:hover {
  color: white;
  text-decoration: underline;
}
.footer-link > svg {
  fill: rgba(255, 255,255, 0.8);
}
.footer-link:hover > svg {
  fill: rgba(255, 255,255, 1);
}

.beta-tag {
  position: absolute;
  right: -36px;
  top: 2px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.3em;
  text-transform: uppercase;
  background: rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.9);
}
.content-wrap {
  flex: 1;
  position: relative;
  min-height: calc(100vh - 85px);
}
.fade-in-transition {
  transition: 0.3s ease;
}
.fade-in-enter, .fade-in-leave {
  opacity: 0;
}
.jump-up-transition {
  transition: 0.3s ease;
  transform: translateY(0);
}
.jump-up-enter, .jump-up-leave {
  opacity: 0;
  transform: translateY(30px);
}
footer {
  letter-spacing: 1px;
  word-spacing: 3px;
  font-size: 0.8em;
  font-weight: bold;
  letter-spacing: 2px;
  background: var(--footer-color);
  color: rgba(255,255,255,0.7);
}
.btn, h1, h2, h3, h4, h5, h6 {
  letter-spacing: 1px;
  word-spacing: 3px;
}
.user-pic {
  height: 30px;
  border-radius: 50%;
}
@media screen and (max-width: 600px) {
  .user-pic {
    height: 26px;
  }
}
.user-pic--big {
  width: 100px;
  height: 100px;
}
.login-modal {
  min-width: 0!important;
}

.btn-group {
  position: relative;
  display: inline-block;
}
.dropdown__menu {
  position: absolute;
  left: 0;
  top: 100%;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s ease;
  transform: translateY(10px);
}
.dropdown__menu--right {
  left: 100%;
  top: 0;
  transform: translateX(10px);
}
.dropdown:hover > .dropdown__menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.dropdown:hover > .dropdown__menu--right {
  transform: translateX(0);
}

.text--light {
  opacity: 0.6;
}

.spinner {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: var(--brand-color);
  margin-right: 10px;
  vertical-align: middle;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}

</style>
