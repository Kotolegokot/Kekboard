<template>
  <ul id="threads" class="list-group">
    <a v-for="thread in threads" @click="" href="#" class="list-group-item list-group-item-action">
      {{ thread.name }}
      <small>by {{ thread.author.name }}</small>
    </a>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  names: 'threads',
  data () {
    return {
      threads: []
    }
  },
  computed: {
    ...mapState([
      'section'
    ])
  },
  mounted () {
    Vue.http.get('/threads/' + this.section.id).then(response => {
      this.threads = response.body

      for (let i = 0; i < this.threads.length; i++) {
        Vue.http.get('/user/' + this.threads[i].author_id).then(response => {
          Vue.set(this.threads[i], 'author', response.body)
        })
      }
    }, response => {
      window.location.href = '/login'
    });
  }
}
</script>

<style scoped>

</style>
