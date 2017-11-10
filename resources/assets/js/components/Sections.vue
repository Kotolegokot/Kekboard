<template>
  <ul id="sections" class="list-group">
    <a v-for="section in sections" @click="goThreads(section)" href="#" class="list-group-item list-group-item-action">
      <span class="shorthand badge badge-danger">{{ section.shorthand }}</span>
      {{ section.name }}
    </a>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'sections',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'sections',
    ])
  },
  methods: {
    ...mapMutations([
      'goThreads',
    ])
  }
}
</script>

<style scoped>
.shorthand {
  position: absolute;
  left: -48px;
  width: 32px;
}
</style>
