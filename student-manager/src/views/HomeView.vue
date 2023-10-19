<template>
  <div>
    <ul>
      <li v-for="s in students" :key="s.id">
        <router-link :to="`/student/${s.id}`">{{ s.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      students: []
    }
  },

  mounted() {
    axios.get(`${process.env.VUE_APP_API_BASE}/students`).then(res => {
      this.students = res.data;
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<style scoped>

</style>