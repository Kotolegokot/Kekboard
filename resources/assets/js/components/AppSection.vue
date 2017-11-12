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
      <app-section-new-thread-form
        v-if="showNewThreadForm"
        @created="threadCreated" />
    </p>

    <p>
      <ul id="threads-list" class="list-group">
        <a
          v-for="thread in threads"
          :key="thread.id"
          @click="go({ page: 'thread', thread })"
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
import { mapState, mapMutations } from 'vuex'
import AppSectionNewThreadForm from './AppSectionNewThreadForm.vue'
import Vue from 'vue'

export default {
  name: 'AppSection',
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
    AppSectionNewThreadForm
  },
  methods: {
    ...mapMutations([
      'go'
    ]),
    toggleNewThreadForm () {
      this.showNewThreadForm = !this.showNewThreadForm
    },
    updateThreads () {
      this.$root.requestThreads(this.section.id).then(response => {
        let threads = response.body

        for (let i = 0; i < threads.length; i++) {
          this.$root.requestUser(threads[i].author_id).then(response => {
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
