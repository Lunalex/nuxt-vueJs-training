<template>
  <b-navbar toggleable="md" type="dark" variant="info" class="my-navbar">
    <b-navbar-brand>
      <n-link to="/">RiskControl Nuxt</n-link>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <n-link to="/mickey">Mickey Mouse</n-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <n-link to="/account">My account</n-link>
        </b-nav-item>
        <b-nav-item>
          <n-link to="/login">Login</n-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style>
.my-navbar a {
  text-decoration: none;
  color: whitesmoke;
}
</style>