<template>
  <div>
    <app-sidebar
      :class="{ hidden: !sidebarShown }"
      id="sidebar" />

    <div
      :class="{ expanded: !sidebarShown }"
      id="content">
      <app-header
        id="header"
        @sidebarToggled="toggleSidebar" />

      <div id="component" class="container">
        <component :is="currentView"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'

export default {
  name: 'AppInterface',
  data () {
    return {
      sidebarShown: true
    }
  },
  computed: {
    ...mapGetters([
      'currentView',
    ])
  },
  methods: {
    toggleSidebar () {
      this.sidebarShown = !this.sidebarShown
    }
  },
  components: {
    AppHeader,
    AppSidebar
  }
}
</script>

<style scoped>
#sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  max-width: 90%;
  transition-property: left;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  border-right: 1px solid rgba(0, 0, 0, 0.07);
}

#sidebar.hidden {
  left: -300px;
}

#header {
  height: 34px;
  margin-bottom: 16px;
}

#content {
  position: absolute;
  left: 300px;
  right: 0;
  top: 0;
  bottom: 0;
  transition-property: left;
  transition-duration: 0.2s;
  transition-timing-function: linear;
}

#content.expanded {
  left: 0;
}

#component {
  max-width: 800px;
  margin: 0 auto;
}
</style>
