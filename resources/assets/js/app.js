import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import AppHeader from './components/AppHeader.vue'
import AppSections from './components/AppSections.vue'
import AppThreads from './components/AppThreads.vue'
import AppThread from './components/AppThread.vue'
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
          component: AppSections
        },
        threads: {
          name: 'Threads',
          component: AppThreads
        },
        thread: {
          name: 'Thread',
          component: AppThread
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
      goThread (state, thread) {
        Vue.set(this.state, 'page', state.pages.thread)
        Vue.set(this.state, 'thread', thread)
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
        AppHeader
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
      }),

      requestPosts: (thread) => Vue.http.get('/posts/' + thread.id),

      requestCreateNewPost: (thread, body) => Vue.http.post('/posts/create', {
        thread: thread.id,
        body
      }, {
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      })
    },
    mounted () {
      $(document).attr('title', this.title)
    }
  })

  vue.$store.commit('goSections')
})
