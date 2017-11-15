<template>
  <ul id="sections" class="list-group">
    <span v-for="section in sections" :key="section.id"
      @click="go({ page: 'section',  section })" class="link list-group-item list-group-item-action">
        {{ section.name }}
    </span>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'

export default {
  name: 'TheMain',
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
</style>

<style>
.link {
  cursor: pointer;
}
</style>
