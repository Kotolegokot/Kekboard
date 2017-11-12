<template>
  <div :id="'post' + post.id" class="card">
    <div class="card-body">
      {{ post.body }}
    </div>
    <div class="card-footer">
      <span v-if="post.author">
        by {{ post.author.name }}
    </span>
      <span v-if="post.answers_to_post">
        to <a :href="'#post' + post.answers_to_post.id">post {{ post.answers_to_post.id }}</a>
      </span>
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
