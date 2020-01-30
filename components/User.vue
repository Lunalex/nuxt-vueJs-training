<template>
  <b-row class="component-card-standard">
    <b-col>
      <b-row>
        <b-col align-self="center"><h2>User</h2></b-col>
      </b-row>
      <b-row cols="3" align-h="around">
        <b-col class="parameter-name">Id:</b-col>
        <b-col class="parameter-value">{{ user.id }}</b-col>
      </b-row>
      <b-row cols="3" align-h="around">
        <b-col class="parameter-name">Name:</b-col>
        <b-col class="parameter-value">{{ user.name }}</b-col>
      </b-row>
      <b-row cols="3" align-h="around">
        <b-col class="parameter-name">Email:</b-col>
        <b-col class="parameter-value">{{ user.email }}</b-col>
      </b-row>
      <b-row cols="3" align-h="around"> 
        <b-col class="parameter-name">Password:</b-col>
        <b-col class="parameter-value">
          <b-button v-on:click="changePassword()" variant="dark">modify</b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  
  props: {
    user: {
      id: String,
      name: String,
      email: String
    }
  },

  methods: {
    changePassword() {
      console.log("password changed!")
    }
  }
}
</script>