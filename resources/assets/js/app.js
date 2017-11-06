import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Header from './components/Header.vue'
import Sections from './components/Sections.vue'
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
        settings: {
          name: 'Settings',
          component: null
        }
      },
      page: ''
    },
    mutations: {
      go (state, page) {
        Vue.set(this.state, 'page', state.pages[page])
        $(document).attr('title', this.getters.title)
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
    ])
  })

  vue.$store.commit('go', defaultPage)
})
