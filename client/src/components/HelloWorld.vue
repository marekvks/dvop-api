<script>
import { ref } from 'vue';

let locations = ref([{
  "address": "Smichov"
}]);

let interval = null;

const getLocations = async () => {
  const response = await fetch('http://localhost:8080/location', {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  locations.value = data;
}

const postLocation = async () => {
  const reqBody = {
    "address": 'Smichov!'
  }

  const response = await fetch('http://localhost:8080/location', {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newLocation)
  });
};

const refreshData = () => {
  interval = setInterval(getLocations, 5000);
}

export default {
  name: "Location",
  data() {
    return {
      locations
    }
  },
  methods: {
    getLocations,
    refreshData,
    postLocation
  },
  created() {
      refreshData();
  },
  mounted() {
    console.log('hehe');
    getLocations();
  },
}

</script>

<template>
  <div class="card">
    <button type="button" @click="postLocation()">fetch</button>
  </div>
  <ul>
    <li v-for="location in locations">
      <span>{{ location.address }}</span>
    </li>
  </ul>
</template>

<style scoped>
li {
  list-style: none;
}
</style>
