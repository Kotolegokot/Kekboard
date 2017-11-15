import TheMain from '../components/TheMain.vue'
import TheSection from '../components/TheSection.vue'
import TheThread from '../components/TheThread.vue'
//import AppSettings from '../components/AppSettings.vue'

export default {
  install (Vue) {
    Vue.pages = {
      main: {
        title: '',
        url: '/',
        component: TheMain
      },
      section: {
        title: 'Section',
        url: options => '/section/' + options.section.id,
        component: TheSection
      },
      thread: {
        title: 'Thread',
        url: options => '/thread/' + options.thread.id,
        component: TheThread
      },
      settings: {
        title: 'Settings',
        url: '/settings',
        component: null
      }
    }
  }
}
