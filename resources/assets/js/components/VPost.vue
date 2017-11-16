<template>
  <div class="card">
    <div v-if="post.isMain()" class="card-header">
      {{ threadName }}
    </div>
    <div class="card-body">
      {{ post.body }}
    </div>
    <div class="d-flex align-items-center card-footer">
      <div class="post-id">
        <span
          class="link"
          @click="jump('post' + post.id)">
          <small>#{{ post.id }}</small>
        </span>

        <span v-if="post.answers_to_post">
          ---&gt;
          <span
            class="link"
            @click="jump('post' + post.answers_to_post.id)">
            <small>#{{ post.answers_to_post.id }}</small>
          </span>
        </span>
      </div>

      <div class="btn-answer ml-auto">
        <span
          @click="toggleAnswerForm"
          class="link"
          >
          <small>answer</small>
        </span>
      </div>
    </div>

    <v-post-form-answer
      v-show="showAnswerForm"
      :answers_to_post="post"
      @answered="postCreated"
      />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import VPostFormAnswer from './VPostFormAnswer.vue'

export default {
  name: 'VPost',
  data () {
    return {
      showAnswerForm: false,
      threadName: ''
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    },
  },
  methods: {
    toggleAnswerForm () {
      this.showAnswerForm = !this.showAnswerForm
    },

    postCreated () {
      this.toggleAnswerForm()
      this.$emit('answered')
    },

    ...mapActions([
      'jump'
    ])
  },
  components: {
    VPostFormAnswer
  },
  created () {
    if (this.post.isMain()) {
      Vue.requestThread(this.post.thread_id).then(thread => {
        this.threadName = thread.name
      })
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 0;
}

.card-footer {
  padding-top: 0;
  padding-bottom: 2px;
}
</style>
