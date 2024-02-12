<template>
    <section class="page-container">
        <h1 class="title">Order {{ order.id }}</h1>
        <article>
                <ul>
                    <li>
                        <h3 class="product"><span>Product</span> - {{ order.product }}</h3>
                        <h3 class="status"><span>Status</span> - {{ order.status }}</h3>
                    </li>
                </ul>
        </article>
    </section>
</template>

<script>
import { ref } from 'vue';

const order = ref([]);

export default {
    data() {
        return {
            order
        }
    },
    methods: {
        async getOrder () {
            const id = Number(this.$route.params.id);

            const response = await fetch(`http://localhost:8080/order/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            order.value = data;
        }
    },
    mounted() {
        this.getOrder();
    }
}

</script>

<style scoped>
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

  min-height: 100vh;
  width: 100%;
}

article {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 50%;
  min-height: 40vh;
  margin-bottom: 50px;

  border-radius: 10px;
  border: 1px solid #6625ff24;
  background: linear-gradient(45deg, rgba(150,0,99,0.05) 0%, rgba(34,19,203,0.1) 100%);
  box-shadow: 0px 1px 16px #0000009b;
}

ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
}

li {
    display: flex;
    flex-direction: column;
    gap: 20px;

    list-style: none;
}

li h3 {
    font-size: 30px;
    font-weight: 500;
}

li span {
    text-shadow: 0 0 3px #fff;
}

.product {
    align-self: flex-start;
}

.status {
    align-self: flex-end;
}
</style>