<template>
  <div :id="'post' + post.id" class="card">
    <div class="card-body">
      {{ post.body }}
    </div>
    <div class="d-flex card-footer">
      <small>
        <a :href="'#post' + post.id">
          #{{ post.id }}
        </a>

        <span v-if="post.answers_to_post">
          -----&gt; <a :href="'#post' + post.answers_to_post.id">#{{ post.answers_to_post.id }}</a>
        </span>
      </small>

      <div class="ml-auto">
        <small>
          <a
            href="#"
            @click="toggleAnswerForm"
            >
            answer
          </a>
        </small>
      </div>
    </div>

    <app-thread-post-answer-form
      v-if="post.show_answer_form"
      :answers_to_post="post"
      @answered="postCreated"
      />
  </div>
</template>

<script>
import AppThreadPostAnswerForm from './AppThreadPostAnswerForm'

export default {
  name: 'AppThreadPost',
  props: {
    post: {
      type: Object,
      required: true
    },
  },
  methods: {
    toggleAnswerForm () {
      this.post.show_answer_form = !this.post.show_answer_form
    },
    postCreated () {
      this.toggleAnswerForm()
      this.$emit('answered')
    }
  },
  components: {
    AppThreadPostAnswerForm
  }
}
</script>

<style scoped>
</style>
