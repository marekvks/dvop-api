<script>
import { RouterView } from 'vue-router';
import ControlPanel from './views/ControlPanel.vue'
import CreateLocation from './components/CreateLocation.vue';

export default {
  name: "App",

  components: {
    ControlPanel,
    CreateLocation,
    RouterView
},

  data() {
    return {
      name: "..."
    }
  }
}
</script>

<template>
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
