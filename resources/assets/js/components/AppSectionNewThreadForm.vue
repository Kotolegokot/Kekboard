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
        type="text" class="form-control" id="thread-name" required />
      <small class="form-text text-muted">The name of the new thread</small>
    </div>

    <a href="#" @click="createThread" class="btn btn-primary">Create</a>
  </div>
</template>

<script>
import { mapState } from 'vuex'
window.$ = require('jquery')

export default {
  name: 'AppNewThreadForm',
  data () {
    return {
      newThreadName: '',
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
      this.$root.requestCreateNewThread(this.section.id, this.newThreadName).then(response => {
        this.errors = []
        this.newThreadName = ''
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
