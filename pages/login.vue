<template>
  <b-row align-h="center">
    <b-col>
      <b-row>
        <b-col align-self="center">
          <h2>Login</h2>
        </b-col>
      </b-row>
      <b-form @submit="loginFormSubmit">
        <b-form-group label="Username" label-for="username" label-align="left">
          <b-input type="text" id="username" v-model="loginForm.username"></b-input>
        </b-form-group>
        <b-form-group label="Password" label-for="password" label-align="left">
          <b-input type="password" id="password" v-model="loginForm.password"></b-input>
        </b-form-group>
        <b-button type="submit" variant="info">Submit</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
// seems that I might not need to import
// but simply use $axios as we're usign Nuxt
// to investigate...
import axios from "axios"
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      usersDb: []
    };
  },
  async mounted() {
    try {
      await axios
        .get("/data/users.json", {
          Accept: "application/json"
        })
        .then(res => {
          this.usersDb = res.data;
        });
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    loginFormSubmit(event) {
      event.preventDefault(); // prevent auto-reload of the page when submitting the form
      this.usersDb.forEach(user => {
        if (
          user.name == this.loginForm.username &&
          user.password == this.loginForm.password
        ) {
          console.log("user found!")
          this.$store.dispatch('connectUser', user)
        }
      });
      if(this.$store.state.isConnected) {
        console.log("USER CONNECTED!");
      } else {
        console.log("CONNEXION FAILED!");
      }
    }
  }
};
</script>