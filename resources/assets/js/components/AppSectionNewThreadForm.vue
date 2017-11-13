<template>
  <div class="card card-body" id="new-thread-form">
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

    <a href="#" @click="createThread" class="btn btn-primary">Create</a>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
window.$ = require('jquery')

export default {
  name: 'AppNewThreadForm',
  data () {
    return {
      newThreadName: '',
      firstPostBody: '',
      errors: []
    }
  },
  computed: {
    ...mapState([
      'section'
    ])
  },
  methods: {
    createThread () {
      Vue.requestCreateNewThread(this.section.id, this.newThreadName, this.firstPostBody).then(response => {
        this.errors = []
        this.newThreadName = ''
        this.firstPostBody = ''
        this.$emit('created')
      }).catch(response => {
        this.errors = Object.values(response.body.errors).flatten()
      }).finally(response => {
        $("input#thread-name").focus()
      })
    }
  },
  mounted () {
    $("input#thread-name").focus()
  }
}
</script>

<style scoped>
#new-thread-form {
  width: 40%;
}

ul#errors {
  margin-bottom: 0;
  list-style-type: none;
}
</style>
