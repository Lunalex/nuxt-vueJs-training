<template>
  <b-row class="component-card-standard">
    <b-col>
      <b-row>
        <b-col align-self="center"><h2>Collaborator</h2></b-col>
      </b-row>
      <b-row cols="3" align-h="around" align-v="start">
        <b-col class="parameter-name">Admin:</b-col>
        <b-col class="parameter-value">{{ collab.admin }}</b-col>
      </b-row>
      <b-row cols="3" align-h="around" align-v="start">
        <b-col class="parameter-name">Accounts:</b-col>
        <b-col class="parameter-value pl-4">
            <b-row v-for="account in collab.accounts" :key="account">
              {{ account }}
            </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    collab: {
      admin: Boolean,
      accounts: []
    }
}
}
</script>
