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
        <p
          v-for="post in posts"
          :key="post.id">
          <app-thread-post :post="post" />
        </p>
      </ul>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppThreadNewPostForm from './AppThreadNewPostForm.vue'
import AppThreadPost from './AppThreadPost.vue'
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
    AppThreadNewPostForm,
    AppThreadPost
  },
  methods: {
    toggleNewPostForm () {
      this.showNewPostForm = !this.showNewPostForm
    },
    updatePosts () {
      this.$root.requestPosts(this.thread.id).then(response => {
        let posts = response.body

        for (let i = 0; i < posts.length; i++) {
          posts[i].author = null
          this.$root.requestUser(posts[i].author_id).then(response => {
            posts[i].author = response.body
          })

          posts[i].answers_to_post = null
          if(posts[i].answers_to_post_id != 0) {
            this.$root.requestPost(posts[i].answers_to_post_id).then(response => {
              posts[i].answers_to_post = response.body
            })
          }
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
