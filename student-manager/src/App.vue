<template>
  <div>
    <nav class="navbar navbar-expand bg-body-tertiary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <router-link to="/student/create" class="nav-link">Create</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>

          <span v-if="isLoggedIn" class="navbar-text">
            Hello {{ name }}
          </span>
          <router-link v-else to="/login" class="nav-link">Login</router-link>
        </div>
      </div>
    </nav>
    <router-view class="container py-2"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('getUserFromStorage');
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['isLoggedIn'];
    },

    name() {
      return this.$store.getters['name'];
    },
  }
}
</script>

<style lang="scss">
</style>
