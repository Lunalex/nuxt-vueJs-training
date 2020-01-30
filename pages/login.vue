<template>
  <b-row align-h="center">
    <b-col>
      <b-row>
        <b-col align-self="center">
          <h2>Login</h2>
          <b-form-invalid-feedback
            class="my-4"
            :force-show="noMatchFoundDisplay()"
          >no match found for username and/or password</b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-form @submit="loginFormSubmit">
        <b-form-group label="Username" label-for="username" label-align="left">
          <b-input
            type="text"
            id="username"
            v-model="loginForm.username"
            :state="usernameInputValidation"
          ></b-input>
          <b-form-invalid-feedback
            class="text-left"
            :state="usernameInputValidation"
            v-if="loginForm.username.length == 0"
          >username is required</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Password" label-for="password" label-align="left">
          <b-input
            type="password"
            id="password"
            v-model="loginForm.password"
            :state="passwordInputValidation"
          ></b-input>
          <b-form-invalid-feedback
            class="text-left"
            :state="passwordInputValidation"
            v-if="loginForm.password.length == 0"
          >password is required</b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" variant="info">Submit</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  // redirect or this.$router.push("/") doesn't work as the check is done before the state is updated 
  // same issue on account.vue when no user is connected
  // middleware({ store, redirect }) {
  //   if (store.state.isConnected) {
  //     return redirect("/");
  //   }
  // },

  data() {
    return {
      usersDb: [],
      loginForm: {
        username: "",
        password: "",
        submitted: false,
        noMatchFound: false
      }
    };
  },

  mounted() {
    this.fetchUsersFromJson();
  },

  computed: {
    usernameInputValidation() {
      return !this.loginForm.submitted || this.loginForm.username.length > 0 && !this.loginForm.noMatchFound ? null : false;
    },
    passwordInputValidation() {
      return !this.loginForm.submitted || this.loginForm.password.length > 0 && !this.loginForm.noMatchFound ? null : false;
    },
    noMatchFoundValidation() {
      return this.loginForm.submitted && (this.loginForm.username.length == 0 || this.loginForm.password.length == 0) ? false : this.loginForm.noMatchFound;
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
      this.loginForm.submitted = true;
      this.loginForm.noMatchFound = false;

      if (this.loginForm.username.length > 0 && this.loginForm.password.length > 0) {
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
        this.loginForm.noMatchFound = true;
      }
    },
    noMatchFoundDisplay() {
      if(!this.noMatchFoundValidation) {
        this.loginForm.noMatchFound = false
      }
      return this.loginForm.noMatchFound
    }
  }
};
</script>