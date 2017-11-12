<template>
  <ul id="sections" class="list-group">
    <a v-for="section in sections" :key="section.id"
      @click="go({ page: 'section', section })" href="#" class="list-group-item list-group-item-action">
        <span class="shorthand badge badge-danger">{{ section.shorthand }}</span>
        {{ section.name }}
    </a>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppMain',
  data () {
    return {
      sections: []
    }
  },
  methods: {
    ...mapMutations([
      'go',
    ])
  },
  mounted () {
    this.$root.requestSections().then(response => { this.sections = response.body })
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
