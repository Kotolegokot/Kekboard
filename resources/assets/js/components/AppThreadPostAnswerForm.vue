<template>
  <div class="d-flex card card-body" id="new-post-form">
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
        rows="4" placeholder="Type your message here" class="form-control" id="post-body" required>
      </textarea>
    </div>

    <span @click="createPost" id="submit" class="ml-auto link btn btn-primary">Post</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
window.$ = require('jquery')

export default {
  name: 'AppThreadPostAnswerForm',
  data () {
    return {
      newPostBody: '',
      errors: []
    }
  },
  props: {
    answers_to_post: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState([
      'options'
    ])
  },
  methods: {
    createPost () {
      Vue.requestCreateNewPost(this.options.thread.id, this.newPostBody, this.answers_to_post.id).then(response => {
        this.errors = []
        this.newPostBody = ''
        this.$emit('answered')
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
ul#errors {
  margin-bottom: 0;
  list-style-type: none;
}

a#submit {
  width: 80px;
}
</style>
