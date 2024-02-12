<script>
import { ref } from 'vue';


const locations = ref([]);

const getLocations = async () => {
    const url = 'http://localhost:8080/location';

    const response = await fetch(url, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    locations.value = data;
    console.log(locations.value[0].address)
}

const postOrder = async (description, locationAddress) => {
    const url = `http://localhost:8080/location/${locationAddress}/order`;

    console.log(locationAddress);

    const reqBody = {
        description
    }

  const response = await fetch(url, {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  });

  const data = await response.json();
}

export default {
  name: "CreateOrder",
  data() {
    return {
        description: '',
        selectedLocation: '',
        locations
    }
  },
  methods: {
    postOrder,
    getLocations,
    submit() {
        this.$emit('submit', this.description, this.selectedLocation)
        postOrder(this.description, this.selectedLocation);
    }
  },
  mounted() {
    getLocations();
  }
}

</script>

<template>
    <h1>Create an order</h1>

    <form @submit.prevent="submit">
        <div class="group">
            <label for="address">Description </label>
            <input type="text" name="description" id="description" placeholder="Něco hrozně cool" v-model="description">
        </div>
        <div class="group">
            <label for="locationSelection">Location </label>
            <select name="locationSelection" id="locations" v-model="selectedLocation">
                <option :value="location.address" v-for="(location, index) in locations" :key="index">{{ location.address }}</option>
            </select>
        </div>
        <button type="submit" value="Submit">Submit</button>
    </form>
</template>

<style scoped>
@import '../modalContent.css';
</style>