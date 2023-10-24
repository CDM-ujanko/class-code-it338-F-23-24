<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label" for="name">Name</label>
        <input id="name" v-model="student.name" class="form-control" placeholder="Name" required type="text">
      </div>

      <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <input id="email" v-model="student.email" class="form-control" placeholder="some@email.com" required
               type="email">
      </div>

      <div class="input-group">
        <span class="input-group-text">Description</span>
        <textarea v-model="student.description" aria-label="With textarea" class="form-control" required></textarea>
      </div>

      <button class="btn btn-primary" type="submit">Create</button>
    </form>
    {{ student }}

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentEditView",
  data() {
    return {
      student: {
        name: '',
        email: '',
        description: ''
      }
    }
  },

  mounted() {},

  methods: {
    onSubmit() {
      axios.post(`${process.env.VUE_APP_API_BASE}/student`, this.student)
          .then(res => {
            console.log(res);
            let id = res.data;
            this.$router.push(`/student/${id}`);
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