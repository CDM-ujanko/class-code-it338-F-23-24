<template>
  <div>
    <ul>
      <li v-for="id in ids" :key="id">
        <router-link :to="`/student/${id}`">Student: {{ id }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {getAllIds} from "@/data/data";

export default {
  name: "DirectoryView",
  data() {
    return {
      ids: getAllIds()
    }
  }
}
</script>

<style scoped>

</style>