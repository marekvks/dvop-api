<script>
import ControlPanel from './components/ControlPanel.vue'
import CreateLocation from './components/CreateLocation.vue';
import Footer from './components/Footer.vue'; 

export default {
  name: "App",

  components: {
    ControlPanel,
    CreateLocation,
    Footer
  },

  data() {
    return {
      name: "..."
    }
  }
}
</script>

<template>
  <ControlPanel />
  <Footer />
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
