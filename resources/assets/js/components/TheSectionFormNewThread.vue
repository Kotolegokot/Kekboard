<template>
  <div class="card card-body">
    <div v-if="errors.length" class="alert alert-danger">
      <ul id="errors">
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>
    </div>

    <div class="form-group">
      <input
        v-model.trim="newThreadName"
        @keyup.enter.stop="createThread"
        type="text" class="form-control" id="thread-name" required>
      </input>
      <small class="form-text text-muted">The name of the new thread</small>
    </div>

    <div class="form-group">
      <textarea
        v-model="firstPostBody"
        rows="4"
        class="form-control"
        id="post-body" required>
      </textarea>
      <small class="form-text text-muted">The head post of the thread</small>
    </div>

    <span @click="createThread" class="link btn btn-primary">Create</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
window.$ = require('jquery')

export default {
  name: 'TheSectionFormNewThread',
  data () {
    return {
      newThreadName: '',
      firstPostBody: '',
      errors: []
    }
  },
  computed: {
    ...mapState([
      'options'
    ])
  },
  methods: {
    focus () {
      $("input#thread-name").focus() // TODO: use Vue.js' ref
    },

    createThread () {
      Vue.requestCreateNewThread(this.options.section.id, this.newThreadName, this.firstPostBody).then(response => {
        this.errors = []
        this.newThreadName = ''
        this.firstPostBody = ''
        this.$emit('created')
      }).catch(errors => {
        this.errors = errors
      })

      this.focus()
    }
  },
  mounted () {
    this.focus()
  }
}
</script>

<style scoped>
ul#errors {
  margin-bottom: 0;
  list-style-type: none;
}
</style>
