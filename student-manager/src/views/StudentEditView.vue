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

      <div v-if="!editMode" class="mb-3">
        <label class="form-label" for="email">Photo</label>
        <input id="photo" @input="onFileUpload" class="form-control" required type="file" accept="image/png, image/jpeg">
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
      },
      file: null
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
        let formData = new FormData();
        formData.append('name', this.student.name);
        formData.append('email', this.student.email);
        formData.append('description', this.student.description);
        formData.append('photo', this.file);

        axios({
          method: 'POST',
          url: `${process.env.VUE_APP_API_BASE}/student`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
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
    },

    onFileUpload(e) {
      this.file = e.target.files[0]
      console.log(this.file);
    }
  }
}
</script>

<style scoped>

</style>