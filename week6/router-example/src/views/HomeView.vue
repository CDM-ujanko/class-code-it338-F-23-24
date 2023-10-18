<template>
  <div>
    Homepage!
    <HelloWorld msg="Hello World!"></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld
  }
}
</script>

<style scoped>

</style>