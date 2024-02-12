<template>
  <ul>
    <li v-for="(location, index) in locations" :key="index">
      <div class="text">
        <span class="order">{{ index + 1 }}.</span>
        <span class="address">{{ location.address }}</span>
      </div>
      <div class="buttons">
        <a :href="'/location/' + location.address"><font-awesome-icon :icon="['fas', 'circle-arrow-right']" class="icon arrow-icon"/></a>
        <button type="button" class="delete" @click="deleteLocation(location.address, index)">
          <font-awesome-icon :icon="['fas', 'circle-minus']" class="icon" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue';

const locations = ref([]);

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

const deleteLocation = async (address, index) => {
  const response = await fetch(`http://localhost:8080/location/${address}`, {
    "method": "DELETE",
    "headers": {
      "Content-Type": "application/json"
    }
  });
  
  const data = await response.json();
  console.log(data.message);
  
  if (response.ok) {
    locations.value.splice(index, 1);
  }
}

export default {
    data() {
        return {
            locations
        }
    },
    methods: {
        getLocations,
        deleteLocation,
        updateLocation(location) {
          const data = {
            location
          }
          this.$emit('updateLocation', data);
        }
    },
    created() {
        setInterval(() => {
            getLocations();
        }, 5000)
    },
    mounted() {
        getLocations();
    }
}
</script>

<style scoped>
@import '../lists.css';
@import '../modal.css';

.address {
  display: inline-block;
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>