import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './home/Home.vue';
import User from './user/User.vue';
import Item from './item/Item.vue';
import Edit from './edit/Edit.vue';
import About from './About.vue';

Vue.use(VueRouter);

var router = new VueRouter();

router.beforeEach(function () {
  scrollToTop();
});

router.afterEach(function (transition) {
  if (transition.to.defaultTitle !== false) {
    document.title = 'VueFire Hackathon Starter';
  }
  ga('set', 'page', transition.to.path);
  ga('send', 'pageview');
});

// Scrolls to the top with an easing
function scrollToTop() {
  if (document.body.scrollTop === 0) return;
  document.body.scrollTop = document.body.scrollTop + (-document.body.scrollTop) * 0.14;
  requestAnimationFrame(scrollToTop);
}

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/item/new/edit', name: 'new', component: Edit },
  { path: '/item/:itemId/edit', name: 'edit', component: Edit },
  { path: '/item/:itemId', name: 'item', component: Item },
  { path: '/user/:userId', name: 'user', component: User }
];

new Vue({
  el: 'app',
  render: h => h(App)
});
// router.start(App, 'app');