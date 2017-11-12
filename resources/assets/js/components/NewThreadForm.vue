<template>
  <div class="card card-body" id="new-thread-form">
    <div class="form-group">
      <input type="text" class="form-control" id="thread-name" required autofocus />
      <small class="form-text text-muted">The name of the new thread</small>
    </div>

    <a href="#" @click="" class="btn btn-primary">Create</a>
  </div>
</template>

<script>
export default {
  name: 'new-thread',
  data () {
    return {}
  }
}
</script>

<style scoped>
#new-thread-form {
  width: 40%;
}
</style>
