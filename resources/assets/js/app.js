import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import AppInterface from './components/AppInterface.vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppMain from './components/AppMain.vue'
import AppSection from './components/AppSection.vue'
import AppThread from './components/AppThread.vue'
import bootstrap from './bootstrap'
import KekboardAPI from './plugins/KekboardAPI.js'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(KekboardAPI)

$(() => {
  Vue.pages = {
    main: {
      title: '',
      url: '/',
      component: AppMain
    },
    section: {
      title: 'Section',
      url: options => '/section/' + options.section.id,
      component: AppSection
    },
    thread: {
      title: 'Thread',
      url: options => '/thread/' + options.thread.id,
      component: AppThread
    },
    settings: {
      title: 'Settings',
      url: '/settings',
      component: null
    }
  }

  let store = new Vuex.Store({
    state: {
      appName: 'Kekboard',
      page: 'main',
      pageTitle: '',
      pageUrl: '',
      options: {},

      sections: []
    },
    mutations: {
      go(state, { page, pushState = true, ...options }) {
        state.page = page
        state.pageTitle = typeof Vue.pages[page].title == 'function' ? Vue.pages[page].title(options) : Vue.pages[page].title
        state.pageUrl = typeof Vue.pages[page].url == 'function' ? Vue.pages[page].url(options) : Vue.pages[page].url
        state.options = options

        if (pushState) {
          window.history.pushState({ page, ...options }, this.title, state.pageUrl)
        }
      },

      logout () {
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
      AppInterface
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
