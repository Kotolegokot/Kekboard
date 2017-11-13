<template>
  <nav>
    <p>
      <h1 class="text-center">
        LEL
      </h1>
    </p>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppSidebar',
  computed: {
    ...mapState([
      'appName'
    ])
  },
}
</script>

<style scoped>
</style>
