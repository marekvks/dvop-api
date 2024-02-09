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

const postOrder = async (product, locationAddress) => {
    const url = `http://localhost:8080/location/${locationAddress}/order`;

    console.log(locationAddress);

    const reqBody = {
        product
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
        product: '',
        selectedLocation: '',
        locations
    }
  },
  methods: {
    postOrder,
    getLocations,
    submit() {
        this.$emit('submit', this.product, this.selectedLocation)
        postOrder(this.product, this.selectedLocation);
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
            <label for="address">Product </label>
            <input type="text" name="product" id="product" placeholder="Něco hrozně cool" v-model="product">
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

h1 {
    margin-bottom: 10px;

    font-size: 25px;
    color: #fff;
}

form {
    display: flex;
    flex-direction: column;

    gap: 5px;
    width: 50%;
}

.group {
    display: flex;
    justify-content: space-between;
}

input {
    background: none;

    border: none;
    border-bottom: 1px solid #959595;
    outline: none;

    transition: border-color 0.2s ease;
}

input:focus {
    border-color: #fff;
}

input::placeholder {
    color: #d2d2d2;
}

select {
    width: 150px;
    padding-left: 10px;

    border: 1px solid #d2d2d2;
    border-radius: 4px;

    background-color: #121212;
}

select > option {
    width: 100%;

    outline: none;
    border: none;
    background-color: #121212;
}

button {
    align-self: center;

    width: 100px;
    margin-top: 15px;
    padding: 5px 10px;

    border: 1px solid #d2d2d2;
    border-radius: 5px;

    font-size: 18px;
    color: #d2d2d2;

    transition: all 0.2s ease;
}

button:hover {
    border-color: #fff;
    color: #fff;
}

</style>