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
import axios from 'axios'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      usersDb: []
    };
  },
  async mounted() {
    try {
        await axios
        .get('/data/users.json', {
          'Accept': 'application/json'
        })
        .then((res) => { this.usersDb = res })
      } catch (err) {
        console.log(err)
      }
      console.log(this.usersDb)
  },
  methods: {
    loginFormSubmit: () => {
      //fetchUsers()
      if(this.isFormOk) {
        console.log("CONNECTED! 'connected_user' has been updated in the store");
      } else {
        console.log("AUTHENTIFICATION FAILED!")
      }
    },
    // fetchUsers: async () => {
      
    // },
    isFormOk: () => {
      usersDb.forEach(user => {
        if(user.name == loginForm.username && user.password == loginForm.password) {
          return true;
        }
      });
      return false;
    }
  }
};
</script>

<style>
</style>