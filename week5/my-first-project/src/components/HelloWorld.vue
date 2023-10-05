<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    This is inside the component!
    <Counter />
  </div>
  <div>
    second div!
  </div>
</template>

<script>
// import {MY_OBJ} from "@/lib/hepers.js";
import Counter from "@/components/Counter";

export default {
  name: 'HelloWorld',
  components: {
    Counter
  },
  props: {
    msg: String
  },
  mounted() {
    // console.log('in component', MY_OBJ);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#app {
  background: red !important;
}

h1 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
