<template>
  <div class="thread" :id="'thread' + thread.id">
    <app-thread-post
      class="post"
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @answered="postCreated"
      />
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    AppThreadPost
  },
  methods: {
    toggleNewPostForm () {
      this.showNewPostForm = !this.showNewPostForm
    },
    updatePosts () {
      Vue.requestPosts(this.thread.id).then(response => {
        let posts = response.body

        for (let i = 0; i < posts.length; i++) {
          posts[i].author = null
          Vue.requestUser(posts[i].author_id).then(response => {
            posts[i].author = response.body
          })

          posts[i].answers_to_post = null
          if(posts[i].answers_to_post_id != 0) {
            Vue.requestPost(posts[i].answers_to_post_id).then(response => {
              posts[i].answers_to_post = response.body
            })
          }

          posts[i].show_answer_form = false
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
.post {
  margin-bottom: 16px;
}
</style>
