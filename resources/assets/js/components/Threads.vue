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
      <new-thread-form
        v-if="showNewThreadForm"
        @created="threadCreated" />
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
            <!-- TODO: remove v-if -->
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
  names: 'Threads',
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
    },
    updateThreads () {
      this.$root.requestThreads(this.section).then(response => {
        let threads = response.body

        for (let i = 0; i < threads.length; i++) {
          this.$http.get('/user/' + threads[i].author_id).then(response => {
            this.$set(threads[i], 'author', response.body)
            threads[i].author = response.body
          })
        }

        this.threads = threads
      })
    },
    threadCreated () {
      this.updateThreads()
      this.toggleNewThreadForm()
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.updateThreads()
    })
  },
}
</script>

<style scoped>
</style>
