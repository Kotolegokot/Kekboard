<template>
  <nav class="navbar sticky-top">
    <span
      class="link"
      v-html="iconHtml"
      @click="toggleSidebar"
      ></span>
  </nav>
</template>

<script>
window.octicons = require('octicons')

export default {
  name: 'AppHeader',
  data () {
    return {
      iconHtml: octicons['grabber'].toSVG({ width: '16px' })
    }
  },
  methods: {
    toggleSidebar () {
      this.$emit('sidebarToggled')
    }
  }
}
</script>

<style scoped>
</style>
