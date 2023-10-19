<template>
  <div>
    {{ $route.params.id }}
    <div v-if="student" class="card" style="max-width: 18rem">
        <img :src="student.picture" class="card-img-top" alt="preview">
        <div class="card-body">
          <h5 class="card-title">{{ student.name }}</h5>
          <p class="card-text">{{ student.email}}</p>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentView",
  data() {
    return {
      student: {}
    }
  },

  mounted() {
    axios.get(`${process.env.VUE_APP_API_BASE}/student/${this.$route.params.id}`)
      .then(res => {
        console.log(res);
        this.student = res.data;
      })
    .catch(err => {
      // error
      console.error(err);
      this.$router.push('/404');
    })
  }
}
</script>

<style scoped>

</style>