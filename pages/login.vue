<template>
  <b-row align-h="center">
    <b-col>
      <b-row>
        <b-col align-self="center">
          <h2>Login</h2>
          <div v-if="noMatchWasFound">no match found for username and/or password</div>
        </b-col>
      </b-row>
      <b-form @submit="loginFormSubmit">
        <b-form-group label="Username" label-for="username" label-align="left">
          <b-input type="text" id="username" v-model="loginForm.username"></b-input>
        </b-form-group>
        <div v-if="usernameIsRequired" class="invalid-feedback">field is required</div>
        <b-form-group label="Password" label-for="password" label-align="left">
          <b-input type="password" id="password" v-model="loginForm.password"></b-input>
          <b-form-invalid-feedback :state="validation">field is required</b-form-invalid-feedback>
        </b-form-group>
        <div v-if="validateForm.passwordRequired" class="invalid"></div>
        <b-button type="submit" variant="info">Submit</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  // it's here for safety reasons even though for now when accessing a '/login' typing the url
  // session is reset thus preventing from isConnected to ever be true when accessing the page
  middleware({ store, redirect }) {
    if (store.state.isConnected) {
      return redirect("/");
    }
  },

  data() {
    return {
      usersDb: [],
      loginForm: {
        username: "",
        password: ""
      },
      validateForm: {
        username: false,
        password: false,
        matchFound: false
      }
    };
  },

  mounted() {
    this.fetchUsersFromJson();
  },

  computed: {
    getUsername() {
      return this.loginForm.username
    },
    getPassword() {
      return this.loginForm.password
    },
    usernameIsRequired() {
      return this.validateForm.usernameRequired;
    },
    passwordIsRequired() {
      return this.validateForm.passwordRequired;
    },
    noMatchWasFound() {
      return this.validateForm.noMatchFound;
    }
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
      this.validateForm.noMatchFound = false
      
      if (this.getUsername == "") {
        this.validateForm.usernameRequired = true;
      } else {
        this.validateForm.usernameRequired = false;
      }

      if (this.getPassword == "") {
        this.validateForm.passwordRequired = true;
      } else {
        this.validateForm.passwordRequired = false;
      }

      if (this.loginForm.username != "" && this.loginForm.password != "") {
        for (let i = 0; i < this.usersDb.length; i++) {
          let user = this.usersDb[i];
          if (
            user.name == this.loginForm.username &&
            user.password == this.loginForm.password
          ) {
            let userForStore = user;
            delete userForStore.password;
            this.$store.dispatch("connectUser", userForStore);
            this.$router.push("/");
            break;
          }
        }
        this.validateForm.noMatchFound = true
      }
      console.log("validateForm =")
      console.log("> usernameRequired = " + this.validateForm.usernameRequired)
      console.log("> passwordRequired = " + this.validateForm.passwordRequired)
      console.log("> noMatchFound = " + this.validateForm.noMatchFound)
    }
  }
};
</script>