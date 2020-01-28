<template>
  <b-row>
    <b-col>
      <b-row>
        <b-col align-self="center">
          <h2>My Account</h2>
        </b-col>
      </b-row>
      <!-- need to add :userData (etc.) to components for display -->
      <b-row cols="1" cols-lg="2" align-h="around" align-v="start" v-if="userIsConnected">
        <b-col class="my-3">
          <user :user="userData" />
        </b-col>
        <b-col class="my-3" v-if="isClient">
          <user-client :client="clientData" />
        </b-col>
        <b-col class="my-3" v-if="isCollab">
          <user-collaborator :collab="collabData" />
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import User from "~/components/User.vue";
import User_client from "~/components/User_client.vue";
import User_collaborator from "~/components/User_collaborator.vue";

import { mapState } from "vuex";

export default {
  
  middleware({ store, redirect }) {
      if(!store.state.isConnected) {
        return redirect('/login')
      }
    },

  components: {
    user: User,
    "user-client": User_client,
    "user-collaborator": User_collaborator
  },

  data() {
    return {
      userData: {},
      clientData: {},
      collabData: {},
      isClient: false,
      isCollab: false
    };
  },

  computed: {
    userIsConnected() {
      let userIsConnected = this.$store.state.isConnected;
      if (userIsConnected) {
        this.displayConnectedUser();
      }
      return userIsConnected;
    },
  },

  methods: {
    displayConnectedUser() {
      let state = this.$store.state;

      this.userData = {
        id: state.user_connected.id,
        name: state.user_connected.name,
        email: state.user_connected.email
      };
      if (state.user_connected.isClient == true) {
        this.isClient = true;
        this.isCollab = false;
        this.clientData = {
          company: state.user_connected.company,
          projects: state.user_connected.projects
        };
      }
      if (state.user_connected.isClient == false) {
        this.isClient = false;
        this.isCollab = true;
        this.collabData = {
          admin: state.user_connected.admin,
          accounts: state.user_connected.accounts
        };
      }
    }
  }
}
</script>

<style>
.parameter-name {
  text-align: right;
  font-weight: bold;
  margin: 2px 0;
}

.parameter-value {
  text-align: left;
}
</style>