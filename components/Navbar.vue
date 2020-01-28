<template>
  <b-navbar toggleable="md" type="dark" variant="info" class="my-navbar">
    <b-navbar-brand>
      <n-link to="/">RiskControl Nuxt</n-link>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <n-link to="/mickey">Mickey Mouse</n-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-if="store_isConnected">
        <b-nav-item>
          <n-link to="/account">{{ connectedUserName }}</n-link>
        </b-nav-item>
        <b-nav-item>
          <a v-on:click="disconnect()"><fontawesome :icon="disconnectIcon" /></a>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item>
          <n-link to="/login">Login</n-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

export default {

  computed: {
    store_isConnected() {
      return this.$store.state.isConnected
    },
    connectedUserName() {
      return this.$store.getters.connectedUserName
    },
    disconnectIcon() {
      return faPowerOff
    }
  },

  methods: {
    disconnect() {
      this.$store.dispatch('disconnectUser')
    }
  }

}
</script>


<style>
.my-navbar a {
  text-decoration: none;
  color: whitesmoke;
}
</style>