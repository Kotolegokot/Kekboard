require('./bootstrap');

import Vue from 'vue'
import Vuex from 'vuex'
import Header from './components/Header.vue'

Vue.use(Vuex)

$(function () {
  const store = new Vuex.Store({
    state: {
      appName: 'Kekboard',
      page: ''
    },
    mutations: {
      go (state, page) {
        Vue.set(this.state, 'page', page);
        $(document).attr('title', this.getters.title);
      }
    },
    getters: {
      title: state => state.appName + (state.page ? ' | ' + state.page : '')
    }
  })

  let vue = new Vue({
    el: "#app",
    components: {
        'app-header': Header,
    },
    store
  });
});
