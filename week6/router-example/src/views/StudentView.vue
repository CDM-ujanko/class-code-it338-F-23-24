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
import {getById} from "@/data/data";

export default {
  name: "StudentView",
  data() {
    return {
      student: {}
    }
  },

  mounted() {
    this.student = getById(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>