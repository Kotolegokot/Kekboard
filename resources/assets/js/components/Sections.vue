<template>
  <ul id="sections" class="list-group">
    <a v-for="section in sections" href="#" class="list-group-item list-group-item-action">
      {{ section }}
    </a>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'sections',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'sections',
    ])
  },
  methods: {
    ...mapActions([
      'updateSections'
    ]),
  },
  mounted () {
    this.updateSections()
  }
}
</script>
