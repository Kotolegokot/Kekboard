<template>
  <div id="threads">
    <p>
      <a
        class="btn btn-primary"
        href="#"
        @click="toggleNewThreadForm">
        New thread
      </a>
    </p>

    <p>
      <new-thread-form v-if="showNewThreadForm" />
    </p>

    <p>
      <ul id="threads-list" class="list-group">
        <a
          v-for="thread in threads"
          :key="thread.id"
          @click=""
          href="#"
          class="list-group-item list-group-item-action">
            {{ thread.name }}
            <small v-if="thread.author">by {{ thread.author.name }}</small>
        </a>
      </ul>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NewThreadForm from './NewThreadForm.vue'
import Vue from 'vue'

export default {
  names: 'threads',
  data () {
    return {
      threads: [],
      showNewThreadForm: false
    }
  },
  computed: {
    ...mapState([
      'section'
    ])
  },
  components: {
    NewThreadForm
  },
  methods: {
    toggleNewThreadForm () {
      this.showNewThreadForm = !this.showNewThreadForm
    }
  },
  mounted () {
    this.$root.requestThreads(this.section).then(response => {
      this.threads = response.body

      for (let i = 0; i < this.threads.length; i++) {
        this.$http.get('/user/' + this.threads[i].author_id).then(response => {
          this.$set(this.threads[i], 'author', response.body)
          this.threads[i].author = response.body
        })
      }
    })
  }
}
</script>

<style scoped>
</style>
