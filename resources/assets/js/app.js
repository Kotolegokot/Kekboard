import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Header from './components/Header.vue'
import Sections from './components/Sections.vue'
import Threads from './components/Threads.vue'
import bootstrap from './bootstrap'

Vue.use(Vuex)
Vue.use(VueResource)

const defaultPage = 'sections'

$(function () {
  const store = new Vuex.Store({
    state: {
      appName: 'Kekboard',
      pages: {
        sections: {
          name: 'Sections',
          component: Sections
        },
        threads: {
          name: 'Threads',
          component: Threads
        },
        settings: {
          name: 'Settings',
          component: null
        }
      },
      page: '',

      sections: [],  // for Sections.vue
      username: '',  // for Header.vue
      section: '',   // for Threads.vue
    },
    mutations: {
      goSections (state) {
        Vue.set(this.state, 'page', state.pages.sections)
      },
      goThreads (state, section) {
        Vue.set(this.state, 'page', state.pages.threads)
        Vue.set(this.state, 'section', section)
      },
      goSettings (state) {
        Vue.set(this.state, 'page', state.pages.settings)
      }
    },
    getters: {
      title: state => state.appName + (state.page ? ' | ' + state.page.name : ''),
      currentView: state => state.page.component
    }
  })

  let vue = new Vue({
    el: "#app",
    components: {
        'app-header': Header,
    },
    store,
    computed: Vuex.mapGetters([
      'currentView'
    ]),
    updated () {
      // update title
      $(document).attr('title', this.$store.getters.title)

      // update sections
      Vue.http.get('/sections').then(response => {
        this.$store.state.sections = response.body
      }, response => {
        window.location.href = '/login'
      })

      // update username
      Vue.http.get('/user').then(response => {
        this.$store.state.username = response.body.name
      }, response => {
        window.location.href = '/login'
      })
    }
  })

  vue.$store.commit('goSections')
})
