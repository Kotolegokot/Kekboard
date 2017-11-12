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

$(() => {
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
      section: {},   // for Threads.vue
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
      'currentView',
      'title'
    ]),
    methods: {
      requestUser: () => Vue.http.get('/user'),
      requestSections: () => Vue.http.get('/sections'),
      requestThreads: (section) => Vue.http.get('/threads/' + section.id),
      requestCreateNewThread: (section, name) => Vue.http.post('/threads/create', {
        section: section.id,
        name
      }, {
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      })
    },
    updated () {
      $(document).attr('title', this.title)
    }
  })

  vue.$store.commit('goSections')
})
