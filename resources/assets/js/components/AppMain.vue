<template>
  <ul id="sections" class="list-group">
    <span v-for="section in sections" :key="section.id"
      @click="go({ page: 'section',  section })" class="link list-group-item list-group-item-action">
        <span class="shorthand badge badge-danger">{{ section.shorthand }}</span>
        {{ section.name }}
    </span>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'

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
    Vue.requestSections().then(response => { this.sections = response.body })
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

<style>
.link {
  cursor: pointer;
}
</style>
