<template>
  <div>
    <div v-if="student" class="card" style="max-width: 18rem">
      <div class="card-body">
        <h5 class="card-title">{{ student.name }}</h5>
        <p class="card-text">{{ student.email }}</p>
        <router-link :to="`/student/${$route.params.id}/edit`" class="btn btn-primary">Edit</router-link>
        <button class="btn btn-danger mx-3" @click="deleteStudent">Delete</button>

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
  },

  methods: {
    deleteStudent() {
      if (!confirm('Are you sure you want to delete this student? This cannot be undone!')) {
        return;
      }

      axios.delete(`${process.env.VUE_APP_API_BASE}/student/${this.$route.params.id}`)
          .then((res) => {
            console.log(res);
            this.$router.push('/');
          })
          .catch(err => {
            // error
            console.error(err);
          })
    }
  }
}
</script>

<style scoped>

</style>