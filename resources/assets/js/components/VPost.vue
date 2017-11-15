<template>
  <div :id="'post' + post.id" class="card">
    <div class="card-body">
      {{ post.body }}
    </div>
    <div class="d-flex card-footer">
      <small>
        <span
          class="link"
          @click="jump('post' + post.id)">
          #{{ post.id }}
        </span>

        <span v-if="post.answers_to_post">
          -----&gt; <a :href="'#post' + post.answers_to_post.id">#{{ post.answers_to_post.id }}</a>
        </span>
      </small>

      <div class="ml-auto">
        <small>
          <span
            @click="toggleAnswerForm"
            class="link"
            >
            answer
          </span>
        </small>
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
import { mapActions } from 'vuex'
import VPostFormAnswer from './VPostFormAnswer.vue'

export default {
  name: 'VPost',
  data () {
    return {
      showAnswerForm: false
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
  }
}
</script>

<style scoped>
</style>
