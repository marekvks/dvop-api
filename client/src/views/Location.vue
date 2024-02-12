<template>

<section class="page-container">
    <h1 class="title">{{ address }}</h1>
    <article>
        <section class="side-panel">
            <h2>Processing</h2>
            <ul>
                <li v-for="(order, index) in processingOrders" :key="index">
                    <span>{{ order.id }}</span>
                </li>
            </ul>
        </section>
        <section class="side-panel">
            <h2>Ready</h2>
            <ul>
                <li v-for="(order, index) in readyOrders" :key="index">
                    <span>{{ order.id }}</span>
                </li>
            </ul>
        </section>
    </article>
</section>

</template>

<script>
import { ref } from 'vue';

let orders = [];
const address = ref('');

const processingOrders = ref([]);
const readyOrders = ref([]);

const divideOrders = () => {
    processingOrders.value = orders.filter(order => order.status === 'processing');
    readyOrders.value = orders.filter(order => order.status === 'ready');

    console.log(processingOrders.value);
}

export default {
    data() {
        return {
            address,
            orders,
            processingOrders,
            readyOrders
        }
    },
    methods: {
        async getOrders() {
            address.value = this.$route.params.location;

            const response = await fetch(`http://localhost:8080/location/${address.value}/order`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            orders = data;

            divideOrders();
        },
        divideOrders
    },
    mounted() {
        this.getOrders();
    },
    created() {
        setInterval(() => {
            this.getOrders();
        }, 5000);
    }
}

</script>

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

  height: auto;
}

h2 {
  font-size: 40px;
  font-weight: 700;

  margin: 10px 0;

  text-shadow: 0 0 3px #fff;
}

ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 25px;
    align-content: center;

    width: 100%;
    height: 90%;
    overflow: hidden;
}

li span {
    font-size: 30px;
    font-weight: 600;
}
</style>