import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import TheInterface from './components/TheInterface.vue'
import TheHeader from './components/TheHeader.vue'
import TheSidebar from './components/TheSidebar.vue'
import bootstrap from './bootstrap'

import KekboardAPI from './plugins/KekboardAPI.js'
import Pages from './plugins/Pages.js'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(KekboardAPI)
Vue.use(Pages)

$(() => {
  let store = new Vuex.Store({
    state: {
      appName: 'Kekboard',
      page: 'main',
      pageTitle: '',
      pageUrl: '',
      options: {}
    },
    mutations: {
      go (state, { page, pushState = true, ...options }) {
        state.page = page
        state.pageTitle = typeof Vue.pages[page].title == 'function' ? Vue.pages[page].title(options) : Vue.pages[page].title
        state.pageUrl = typeof Vue.pages[page].url == 'function' ? Vue.pages[page].url(options) : Vue.pages[page].url
        state.options = options

        if (pushState) {
          window.history.pushState({ page, ...options }, this.title, state.pageUrl)
        }
      },
    },
    actions: {
      jump (context, id) {
        document.getElementById(id).scrollIntoView()
      },

      logout (context) {
        window.location.href = '/logout'
      }
    },
    getters: {
      title: state => state.appName + (state.pageTitle ? ' | ' + state.pageTitle : ''),
      currentView: state => Vue.pages[state.page].component
    }
  })

  let vue = new Vue({
    el: "#app",
    components: {
      TheInterface
    },
    store,
    computed: Vuex.mapGetters([
      'currentView',
      'title'
    ]),
    updated () {
      $(document).attr('title', this.title)
    }
  })

  vue.$store.commit('go', { page: 'main' })

  window.onpopstate = event => {
    vue.$store.commit('go', { pushState: false, ...event.state })
  }
})
