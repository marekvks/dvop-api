<template>
  <ul>
    <li v-for="(order, orderIndex) in orders" :key="orderIndex">
      <div class="text">
        <span>{{ order.id }}</span>
        <span class="description">{{ order.description }}</span>
        <select name="status" id="status" v-model="order.status" @change="changeOrderStatus($event, order.id)">
          <option v-for="(status, index) in availableStatuses" :key="index">{{ status }}</option>
        </select>
      </div>
      <div class="buttons">
        <button type="button" class="edit">
          <a :href="'/order/' + order.id"><font-awesome-icon :icon="['fas', 'circle-arrow-right']" class="icon" /></a>
        </button>
        <button type="button" class="delete">
          <font-awesome-icon :icon="['fas', 'circle-minus']" class="icon" @click="deleteOrder(order.id, index)" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue';

const orders = ref([]);
const availableStatuses = ref([]);

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
  
  if (response.ok) {
    orders.value.splice(index, 1);
  }
}

const getAvailableStatuses = async () => {
  const response = await fetch(`http://localhost:8080/order/availableStatuses`, {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  availableStatuses.value = data;
}

const updateOrderStatus = async (status, orderId) => {
  const reqBody = {
    status
  }

  console.log(reqBody);

  const response = await fetch(`http://localhost:8080/order/${orderId}/status`, {
    "method": "PATCH",
    "headers": {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  });

  const data = await response.json();
  console.log(data);
}

export default {
  data() {
    return {
      orders,
      availableStatuses
    }
  },
  methods: {
    getOrders,
    deleteOrder,
    refreshData() {
      setInterval(() => {
        getAvailableStatuses();
        getOrders();
      }, 5000);
    },
    changeOrderStatus(event, orderId) {
      const status = event.target.value;
      updateOrderStatus(status, orderId);
    }
  },
  mounted() {
    getAvailableStatuses();
    getOrders();
  },
  created() {
    this.refreshData();
  }
}

</script>

<style scoped>
@import '../lists.css';

li > .text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;

  width: 100%;
}

li span {
  font-size: 30px;
  width: 40px
}

select {
  justify-self: flex-end;
  width: auto;
  margin-right: 30px;
  padding: 4px 10px;

  border: 1px solid #d2d2d2;
  border-radius: 4px;

  background-color: #121212;

  font-size: 20px;
}

.description {
  display: inline-block;
  width: 200px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>