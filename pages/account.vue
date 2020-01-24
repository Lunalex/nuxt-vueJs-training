<template>
  <b-row>
    <b-col>
      <b-row>
          <b-col align-self="center"><h2>My Account</h2></b-col>
      </b-row>
      <b-row cols="1" cols-lg="2" align-h="around" align-v="start">
        <b-col class="my-3" ><user /></b-col>
        <b-col class="my-3" ><user-client /></b-col>
        <b-col class="my-3"><user-collaborator /></b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import User from "~/components/User.vue";
import User_client from "~/components/User_client.vue";
import User_collaborator from "~/components/User_collaborator.vue";
export default {
  components: {
    user: User,
    "user-client": User_client,
    "user-collaborator": User_collaborator
  }
};
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