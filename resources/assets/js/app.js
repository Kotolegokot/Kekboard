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
        main: {
          name: 'Main',
          component: AppMain
        },
        section: {
          name: 'Section',
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

      sections: [],
      section: {},
    },
    mutations: {
      go(state, options) {
        switch (options.page) {
          case 'main':
            Vue.set(state, 'page', state.pages.main)
            break;
          case 'section':
            Vue.set(state, 'page', state.pages.section)
            Vue.set(state, 'section', options.section)
            break;
          case 'thread':
            Vue.set(state, 'page', state.pages.thread)
            Vue.set(state, 'thread', options.thread)
            break;
          case 'settings':
            Vue.set(state, 'page', state.pages.settings)
            break;
          default:
            break;
        }
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

      requestCreateNewThread: (sectionId, name, firstPostBody) => Vue.http.post('/threads/create', {
        section: sectionId,
        name,
        first_post_body: firstPostBody
      }, {
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      }),

      requestPosts: (threadId) => Vue.http.get('/posts/' + threadId),

      requestCreateNewPost: (threadId, body, answersToPostId) => Vue.http.post('/posts/create', {
        thread: threadId,
        body,
        answers_to_post: answersToPostId
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

  vue.$store.commit('go', { page: 'main' })
})
