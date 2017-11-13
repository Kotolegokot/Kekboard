<template>
  <div :id="'post' + post.id" class="card">
    <div class="card-body">
      {{ post.body }}
    </div>
    <div v-if="post.answers_to_post" class="card-footer">
      <small>
        to <a :href="'#post' + post.answers_to_post.id">post {{ post.answers_to_post.id }}</a>
      </small>
    </div>
    <div v-else class="card-footer">
      <small>
        the main post of the thread
      </small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppThreadPost',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
