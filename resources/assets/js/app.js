import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import AppSection from './components/AppSection.vue'
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
          component: AppMain
        },
        threads: {
          name: 'Threads',
          component: AppSection
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
      requestCurrentUser: () => Vue.http.get('/user'),

      requestUser: (userId) => Vue.http.get('/user/' + userId),

      requestPost: (postId) => Vue.http.get('/post/' + postId),

      requestSections: () => Vue.http.get('/sections'),

      requestThreads: (sectionId) => Vue.http.get('/threads/' + sectionId),

      requestCreateNewThread: (sectionId, name) => Vue.http.post('/threads/create', {
        section: sectionId,
        name
      }, {
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      }),

      requestPosts: (threadId) => Vue.http.get('/posts/' + threadId),

      requestCreateNewPost: (threadId, body) => Vue.http.post('/posts/create', {
        thread: threadId,
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
