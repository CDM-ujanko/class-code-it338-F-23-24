<template>
  <div class="Login">
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input v-model="username" type="text" class="form-control" id="username">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" id="password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    login() {
      axios.post(`${process.env.VUE_APP_API_BASE}/login`, {
        username: this.username,
        password: this.password
      })
      .then((res) => {
        this.$store.commit('setUser', res.data)
        this.$router.push('/')
      }).catch(err => {
        console.error(err)
      })
    }
  }

}
</script>

<style scoped>

</style>