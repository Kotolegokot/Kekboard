<template>
  <div id="thread">
    <p>
      <a
        class="btn btn-primary"
        href="#"
        @click="toggleNewPostForm">
        New post
      </a>
    </p>

    <p>
      <app-thread-new-post-form
        v-if="showNewPostForm"
        @created="postCreated" />
    </p>

    <p>
      <ul id="posts" class="list-group">
        <a
          v-for="post in posts"
          :key="post.id"
          @click=""
          href="#"
          class="list-group-item list-group-item-action">
            {{ post.body }}
            <small v-if="post.author">by {{ post.author.name }}</small>
          </a>
      </ul>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppThreadNewPostForm from './AppThreadNewPostForm.vue'
import Vue from 'vue'

export default {
  name: 'AppThread',
  data () {
    return {
      posts: [],
      showNewPostForm: false
    }
  },
  computed: {
    ...mapState([
      'thread'
    ])
  },
  components: {
    AppThreadNewPostForm
  },
  methods: {
    toggleNewPostForm () {
      this.showNewPostForm = !this.showNewPostForm
    },
    updatePosts () {
      this.$root.requestPosts(this.thread).then(response => {
        let posts = response.body

        for (let i = 0; i < posts.length; i++) {
          this.$http.get('/user/' + posts[i].author_id).then(response => {
            this.$set(posts[i], 'author', response.body)
          })
        }

        this.posts = posts
      })
    },
    postCreated () {
      this.updatePosts()
      this.toggleNewPostForm()
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.updatePosts()
    })
  }
}
</script>

<style scoped>
</style>
