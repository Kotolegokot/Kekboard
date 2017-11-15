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
      <textarea
        v-model="newPostBody"
        rows="4" placeholder="Type your message here" class="form-control" id="post-body" required>
      </textarea>
    </div>

    <span @click="createPost" id="submit" class="link btn btn-primary">Post</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
const $ = require('jquery')

export default {
  name: 'VPostFormAnswer',
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
    focus () {
      $("textarea#post-body").focus() // TODO: use Vue.js' ref
    },

    createPost () {
      Vue.requestCreateNewPost(this.options.thread.id, this.newPostBody, this.answers_to_post.id).then(response => {
        this.errors = []
        this.newPostBody = ''
        this.$emit('answered')
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
