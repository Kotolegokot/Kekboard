<template>
  <nav id="header" class="d-flex navbar sticky-top navbar-dark bg-dark">
    <span @click="go({ page: 'main' })" class="link navbar-brand">
      <!-- <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> -->
      {{ appName }}
    </span>

    <div id="menu" class="dropdown ml-auto">
      <span class="link nav-link dropdown-toggle" data-toggle="dropdown" style="color: white">
        {{ user.name }}
      </span>
      <div class="dropdown-menu dropdown-menu-right" style="left: initial; right: 0">
        <span @click="go({ page: 'settings' })" class="link dropdown-item">Settings</span>
        <span @click="logout" class="link dropdown-item">Quit</span>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Vue from 'vue'

export default {
  name: 'AppHeader',
  data () {
    return {
      user: {}
    }
  },
  computed: {
    ...mapState([
      'appName'
    ])
  },
  methods: {
    ...mapMutations([
      'go',
      'logout'
    ])
  },
  mounted () {
    Vue.requestCurrentUser().then(response => { this.user = response.body })
  }
}
</script>
