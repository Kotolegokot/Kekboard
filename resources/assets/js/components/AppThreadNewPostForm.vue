<template>
  <div class="card card-body" id="new-post-form">
    <div v-if="errors.length" class="alert alert-danger">
      <ul id="errors">
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>
    </div>

    <div class="form-group">
      <textarea
        v-model="newPostBody"
        @keyup.enter.stop="createPost"
        rows="4" placeholder="Type your message here" class="form-control" id="post-body" required>
      </textarea>
    </div>

    <a href="#" @click="createPost" class="btn btn-primary">Post</a>
  </div>
</template>

<script>
import { mapState } from 'vuex'
window.$ = require('jquery')

export default {
  name: 'AppThreadNewPostForm',
  data () {
    return {
      newPostBody: '',
      errors: []
    }
  },
  computed: {
    ...mapState([
      'thread'
    ])
  },
  methods: {
    createPost () {
      this.$root.requestCreateNewPost(this.thread.id, this.newPostBody).then(response => {
        this.errors = []
        this.newPostBody = ''
        this.$emit('created')
      }).catch(response => {
        this.errors = Object.values(response.body.errors).flatten()
      }).finally(response => {
        $("textarea#post-body").focus()
      })
    }
  },
  mounted () {
    $("textarea#post-body").focus()
  }
}
</script>

<style scoped>
#new-post-form {
  width: 60%;
}

ul#errors {
  margin-bottom: 0;
  list-style-type: none;
}
</style>
