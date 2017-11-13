import AppMain from '../components/AppMain.vue'
import AppSection from '../components/AppSection.vue'
import AppThread from '../components/AppThread.vue'
//import AppSettings from '../components/AppSettings.vue'

export default {
  install (Vue) {
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
  }
}
