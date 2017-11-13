<template>
  <nav id="header" class="d-flex navbar sticky-top navbar-dark bg-dark">
    <a href="#" @click="go({ page: 'main' })" class="navbar-brand">
      <!-- <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> -->
      {{ appName }}
    </a>

    <div id="menu" class="dropdown ml-auto">
      <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" style="color: white">
        {{ user.name }}
      </a>
      <div class="dropdown-menu dropdown-menu-right" style="left: initial; right: 0">
        <a href="#" @click="go({ page: 'settings' })" class="dropdown-item">Settings</a>
        <a href="/logout" class="dropdown-item">Quit</a>
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
      'go'
    ])
  },
  mounted () {
    Vue.requestCurrentUser().then(response => { this.user = response.body })
  }
}
</script>
