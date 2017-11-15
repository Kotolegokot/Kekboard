<template>
  <div id="threads">
    <p>
      <span
        class="link btn btn-primary"
        @click="toggleNewThreadForm">
        New thread
      </span>
    </p>

    <p>
      <app-section-new-thread-form
        v-if="showNewThreadForm"
        @created="threadCreated" />
    </p>

    <p>
      <ul id="threads-list" class="list-group">
        <span
          v-for="thread in threads"
          :key="thread.id"
          @click="go({ page: 'thread',  thread })"
          class="link list-group-item list-group-item-action">
            {{ thread.name }}
            <small v-if="thread.author">by {{ thread.author.name }}</small>
        </span>
      </ul>
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TheSectionFormNewThread from './TheSectionFormNewThread.vue'
import Vue from 'vue'

export default {
  name: 'TheSection',
  data () {
    return {
      threads: [],
      showNewThreadForm: false
    }
  },
  computed: {
    ...mapState([
      'page',
      'options'
    ])
  },
  components: {
    TheSectionFormNewThread
  },
  methods: {
    ...mapMutations([
      'go'
    ]),
    toggleNewThreadForm () {
      this.showNewThreadForm = !this.showNewThreadForm
    },
    updateThreads () {
      Vue.requestThreads(this.options.section.id).then(response => {
        let threads = response.body

        for (let i = 0; i < threads.length; i++) {
          Vue.requestUser(threads[i].author_id).then(response => {
            this.$set(threads[i], 'author', response.body)
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
