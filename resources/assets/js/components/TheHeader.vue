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
const octicons = require('octicons')

export default {
  name: 'TheHeader',
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
