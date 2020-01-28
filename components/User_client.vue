<template>
  <b-row class="component-card-standard">
    <b-col>
      <b-row>
        <b-col align-self="center"><h2>Client</h2></b-col>
      </b-row>
      <b-row cols="3" align-h="around" align-v="start">
        <b-col class="parameter-name">Company:</b-col>
        <b-col class="parameter-value">{{ client.company }}</b-col>
      </b-row>
      <b-row cols="3" align-h="around" align-v="start">
        <b-col class="parameter-name">Projects:</b-col>
        <b-col class="parameter-value">{{ client.projects }}</b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    client: {
      company: String,
      projects: Number
    }
  }
}
</script>