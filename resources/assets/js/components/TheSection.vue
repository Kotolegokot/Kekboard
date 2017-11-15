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
      <the-section-form-new-thread
        v-show="showNewThreadForm"
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
      Vue.requestThreads(this.options.section.id).then(threads => {
        for (let i = 0; i < threads.length; i++) {
          Vue.requestUser(threads[i].author_id).then(user => {
            this.$set(threads[i], 'author', user)
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
