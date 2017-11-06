import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Header from './components/Header.vue'
import bootstrap from './bootstrap'

Vue.use(Vuex)
Vue.use(VueResource)

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
  })
})
