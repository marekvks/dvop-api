<script>
import { ref } from 'vue';
import Modal from './modal.vue';
import CreateLocation from './CreateLocation.vue';
import CreateOrder from './CreateOrder.vue';

let locations = ref([]);
let orders = ref([]);

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

const getOrders = async () => {
  const response = await fetch('http://localhost:8080/order', {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  });
  
  const data = await response.json();
  orders.value = data;
}

const deleteOrder = async (id, index) => {
  const response = await fetch(`http://localhost:8080/order/${id}`, {
    "method": "DELETE",
    "headers": {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  console.log(data.message);
  
  if (response.ok) {
    orders.value.splice(index, 1);
  }
}

const refreshData = () => {
  setInterval(() => {
    getLocations();
    getOrders();
  }, 5000);
}

export default {
  name: "ControlPanel",
  data() {
    return {
      locations,
      orders
    }
  },
  components: {
    Modal,
    CreateLocation,
    CreateOrder
},
  methods: {
    getLocations,
    deleteLocation,
    refreshData,
    getOrders,
    deleteOrder,
    openCreateLocationModal() {
      this.$refs.createLocationRef.showModal();
    },
    openCreateOrderModal() {
      this.$refs.createOrderRef.showModal();
    }
  },
  created() {
      refreshData();
  },
  mounted() {
    getLocations();
    getOrders();
  },
}

</script>

<template>
  <section class="page-container">
    <h1 class="title">control panel</h1>
    <article>
      <section class="side-panel left">
        <span class="icon-button-title">
          <button type="button" @click="openCreateLocationModal()">
            <font-awesome-icon :icon="['fas', 'circle-plus']" class="icon" />
          </button>
          <h2>Locations</h2>
        </span>
        <ul>
          <li v-for="(location, index) in locations" :key="index">
            <div class="text">
              <span class="order">{{ index + 1 }}.</span>
              <font-awesome-icon :icon="['fas', 'circle-arrow-right']" class="icon arrow-icon"/>
              <span class="address">{{ location.address }}</span>
            </div>
            <div class="buttons">
              <button type="button" class="edit">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" class="icon" />
              </button>
              <button type="button" class="delete" @click="deleteLocation(location.address, index)">
                <font-awesome-icon :icon="['fas', 'circle-minus']" class="icon" />
              </button>
            </div>
          </li>
        </ul>
      </section>
      <section class="side-panel right">
        <span class="icon-button-title">
          <button type="button" @click="openCreateOrderModal()">
            <font-awesome-icon :icon="['fas', 'circle-plus']" class="icon"/>
          </button>
          <h2>Orders</h2>
        </span>
        <ul>
          <li v-for="(order, index) in orders" :key="index">
            <div class="text">
              <span class="order"> </span>
              <font-awesome-icon :icon="['fas', 'circle-arrow-right']" class="icon arrow-icon"/>
              <span class="address">{{ order.id }}</span>
              <span class="status">{{ order.status }}</span>
            </div>
            <div class="buttons">
              <button type="button" class="edit">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" class="icon" />
              </button>
              <button type="button" class="delete">
                <font-awesome-icon :icon="['fas', 'circle-minus']" class="icon" @click="deleteOrder(order.id, index)" />
              </button>
            </div>
          </li>
        </ul>
      </section>
    </article>
  </section>
  <Modal ref="createOrderRef">
    <CreateOrder />
  </Modal>
</template>

<style scoped>
li {
  list-style: none;
}

.title {
  margin: 50px 0;
  text-transform: capitalize;
  font-size: 50px;
}

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;
}

article {
  display: flex;
  flex-direction: row;

  position: relative;
  width: 90%;
  min-height: 70vh;
  margin-bottom: 50px;

  border-radius: 10px;
  border: 1px solid #6625ff24;
  background: linear-gradient(45deg, rgba(150,0,99,0.05) 0%, rgba(34,19,203,0.1) 100%);
  box-shadow: 0px 1px 16px #0000009b;
}

.side-panel {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50%;
  border-radius: 10px;
}

.icon-button-title {
  display: flex;
  gap: 20px;
}

.icon-button-title h2 {
  font-size: 40px;
  font-weight: 700;

  margin: 10px 0;
}

.icon-button-title h2 {
  text-shadow: 0 0 3px #fff;
}

.icon-button-title .icon {
  color: #fff;
  filter: drop-shadow(0 0 1px #fff);
}

.icon-button-title button:hover > .icon {
  font-size: 30px;
  
  color: #e5e5e5;
}

.icon-button-title button {
  width: 40px;
}

.side-panel.left {
  justify-self: flex-start;
}

.side-panel.right {
  justify-self: flex-end;
}

ul {
  width: 90%;
}

ul > li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 70px;
  padding: 0 20px;

  border-radius: 6px;
}

ul > li:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

li > .text {
  display: flex;
  align-items: center;
  gap: 40px;
}

li .order, li .arrow-icon, li .address, li .status {
  font-size: 30px;
  width: 40px
}

li .arrow-icon {
  display: none;
}

li:hover .arrow-icon {
  display: block;
}

li:hover .order {
  display: none;
}

ul > li > .buttons {
  display: flex;
  gap: 10px;
}

.buttons > .edit > .icon, .delete > .icon {
  color: #c9c9c9;
}

.edit:hover > .icon, .delete:hover > .icon {
  color: #fff;
}

</style>
