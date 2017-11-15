<template>
  <div class="thread" :id="'thread' + options.thread.id">
    <v-post
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
import VPost from './VPost.vue'
import Vue from 'vue'

export default {
  name: 'TheThread',
  data () {
    return {
      posts: [],
      showNewPostForm: false
    }
  },
  computed: {
    ...mapState([
      'options'
    ])
  },
  components: {
    VPost
  },
  methods: {
    toggleNewPostForm () {
      this.showNewPostForm = !this.showNewPostForm
    },
    updatePosts () {
      Vue.requestPosts(this.options.thread.id).then(posts => { this.posts = posts })
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
