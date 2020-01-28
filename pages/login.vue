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
import { mapState } from "vuex";

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

  mounted() {
    this.fetchUsersFromJson()    
  },

  methods: {
    fetchUsersFromJson() {
      try {
        this.$axios
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
    loginFormSubmit(event) {
      event.preventDefault(); // prevent auto-reload of the page when submitting the form
      this.usersDb.forEach(user => {
        if (
          user.name == this.loginForm.username &&
          user.password == this.loginForm.password
        ) {
          console.log("user found!");
          let userForStore = user;
          delete userForStore.password;
          this.$store.dispatch("connectUser", userForStore);
        }
      });
      if (this.$store.state.isConnected) {
        console.log("USER CONNECTED!");
      } else {
        console.log("CONNEXION FAILED!");
      }
    }
  }
}
</script>