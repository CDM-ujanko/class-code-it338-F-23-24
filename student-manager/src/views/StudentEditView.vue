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

      <button class="btn btn-primary my-3" type="submit">{{ editMode ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentEditView",
  data() {
    return {
      editMode: !!this.$route.params.id,
      student: {
        name: '',
        email: '',
        description: ''
      }
    }
  },

  mounted() {
    if (this.editMode) {
      axios.get(`${process.env.VUE_APP_API_BASE}/student/${this.$route.params.id}`)
          .then(res => {
            console.log(res);
            this.student = res.data;
          })
          .catch(err => {
            // error
            console.error(err);
          })
    }
  },

  methods: {
    onSubmit() {
      if (this.editMode) {
        axios.put(`${process.env.VUE_APP_API_BASE}/student/${this.$route.params.id}`, this.student)
            .then((res) => {
              console.log(res);
              this.$router.push(`/student/${this.$route.params.id}`);
            })
            .catch(err => {
              // error
              console.error(err);
            })
      } else {
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
}
</script>

<style scoped>

</style>