<template>
  <nav id="header" class="d-flex navbar sticky-top navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <!-- <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> -->
      {{ appName }}
    </a>

    <div id="menu" class="dropdown ml-auto">
      <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" style="color: white">
        {{ username }}
      </a>
      <div class="dropdown-menu dropdown-menu-right" style="left: initial; right: 0">
        <a href="#" @click="goToSettings" class="dropdown-item">Settings</a>
        <a href="/logout" class="dropdown-item">Quit</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'header',
  data () {
    return {
      username: ''
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
    ]),
    goToSettings () {
      this.$store.commit('go', 'settings')
    }
  },
  mounted () {
    this.$http.get('/user').then(response => {
      this.username = response.body.name
    }, response => {
      window.location.href = '/login'
    })
  }
}
</script>
