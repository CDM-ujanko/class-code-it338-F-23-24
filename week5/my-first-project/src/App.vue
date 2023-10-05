<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <Counter></Counter>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Counter from "@/components/Counter";
// import { sum, subtract } from './lib/hepers.js';

export default {
  name: 'App',
  components: {
    Counter,
    HelloWorld
  },
  mounted() {
    // console.log(subtract(2, 3));
    // console.log(sum(2, 3));
    // console.log(util.MY_OBJ);
    // util.alert('Alert message!');
  }
}
</script>

<style lang="scss">
@import "@/css/variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  div {
    background: lightcyan;
    margin: 10px;

    &.hello {
      background: lightcoral;
    }

    h1 {
      font-size: 12px;
    }
  }
}

p {
  color: $color;
}

h1 {
  color: $color;
}

button {
  color: $color;
}
</style>
