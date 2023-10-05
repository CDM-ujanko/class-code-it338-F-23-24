<template>
  <p>Count: {{ count }}
    <button class="btn btn-primary" @click="addOne">Add one!</button>
  </p>
  <br>
</template>

<script>
export default {
  name: "Counter",
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    console.log('Counter mounted!')
  },
  methods: {
    addOne() {
      this.count++
    }
  }
}
</script>

<style scoped>

</style>