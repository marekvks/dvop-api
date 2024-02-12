<script>

const postLocation = async (address) => {
    const url = 'http://localhost:8080/location';

    const reqBody = {
        address
    }

  const response = await fetch(url, {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  });

  const data = await response.json();

  console.log(data)
}

export default {
  name: "CreateLocation",
  data() {
    return {
        address: ''
    }
  },
  methods: {
    postLocation,
    submit() {
        this.$emit('submit', this.address)
        postLocation(this.address);
    }
  }
}

</script>

<template>
    <h1>Create a location</h1>

    <form @submit.prevent="submit">
      <div class="group">
        <label for="address">Address</label>
        <input type="text" name="address" id="address" placeholder="Smíchov" v-model="address">
      </div>
      <button type="submit" value="Submit">Submit</button>
    </form>
</template>

<style scoped>
@import '../modalContent.css';
</style>