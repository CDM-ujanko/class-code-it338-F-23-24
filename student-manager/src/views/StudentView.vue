<template>
  <div>
    <div v-if="student" class="card" style="max-width: 18rem">
      <div class="card-body">
        <img :src="apiBase + student.photo" alt="photo" class="card-img-top">
        <h5 class="card-title mt-2">{{ student.name }}</h5>
        <p class="card-text">{{ student.email }}</p>
        <template v-if="isLoggedIn">
          <router-link :to="`/student/${$route.params.id}/edit`" class="btn btn-primary">Edit</router-link>
          <button class="btn btn-danger mx-3" @click="deleteStudent">Delete</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex'

export default {
  name: "StudentView",
  data() {
    return {
      apiBase: process.env.VUE_APP_API_BASE,
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

  computed: {
    ...mapGetters([
        'isLoggedIn'
    ])
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