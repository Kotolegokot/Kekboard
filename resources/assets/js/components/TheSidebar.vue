<template>
  <nav>
    <h3 id="brand-name">{{ appName }}</h3>

    <ul id="sections">
      <li
        class="link d-flex section"
        v-for="section in sections"
        :key="section.id"
        @click="go({ page: 'section', section })">
        <span class="section-name">
          {{ section.name }}
        </span>
        <span class="section-shorthand ml-auto">
          /{{ section.shorthand }}/
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'TheSidebar',
  data () {
    return {
      sections: []
    }
  },
  computed: {
    ...mapState([
      'appName'
    ])
  },
  methods: {
    ...mapMutations([
      'go'
    ])
  },
  mounted () {
    Vue.requestSections().then(sections => { this.sections = sections })
  }
}
</script>

<style scoped>
#brand-name {
  text-align: center;
}

ul#sections {
  list-style: none;
  padding-left: 32px;
  padding-right: 32px;
}

li.section {
  color: #7f8c8d;
  font-family: 'Source Sans Pro', Arial, sans-serif;
  padding: 4px 0;
}

nav {
  padding-top: 16px;
}
</style>
