<script>
import { ref } from 'vue';
import OrdersList from '../components/OrdersList.vue';
import LocationsList from '../components/LocationsList.vue';
import CreateLocation from '../components/CreateLocation.vue';
import CreateOrder from '../components/CreateOrder.vue';

const showCreateOrderModal = ref(false);
const showUpdateOrderModal = ref(false);
const showCreateLocationModal = ref(false);
const showUpdateLocationModal = ref(false);

export default {
  data() {
    return {
      showCreateLocationModal,
      showUpdateLocationModal,
      showCreateOrderModal,
      showUpdateOrderModal,
      updateLocation(data) {
        currentlyUpdatedLocation = data.location;
        showUpdateLocationModal.value = true;
        console.log(data.location);
      },
      cancelUpdatingLocation() {
        currentlyUpdatedLocation = null;
        showUpdateLocationModal.value = false;
      }
    }
  },
  components: {
    CreateLocation,
    CreateOrder,
    OrdersList,
    LocationsList
}
}

</script>

<template>
  <section class="page-container">
    <h1 class="title">control panel</h1>
    <article>
      <section class="side-panel left">
        <div class="icon-button-title">
          <button type="button" @click="() => showCreateLocationModal = true">
            <font-awesome-icon :icon="['fas', 'circle-plus']" class="icon" />
          </button>
          <h2>Locations</h2>
        </div>
        <LocationsList @updateLocation="updateLocation" />
      </section>
      <section class="side-panel right">
        <div class="icon-button-title">
          <button type="button" @click="() => showCreateOrderModal = true">
            <font-awesome-icon :icon="['fas', 'circle-plus']" class="icon"/>
          </button>
          <h2>Orders</h2>
        </div>
        <OrdersList />
      </section>
    </article>
  </section>

<!-- MODALS -->

  <Transition name="modal">
      <section class="modal create-order-modal" v-if="showCreateOrderModal">
          <article class="content">
              <button type="button" class="close-btn" @click="() => showCreateOrderModal = false"><font-awesome-icon :icon="['fas', 'circle-xmark']" class="icon" /></button>
              <CreateOrder />
          </article>
      </section>
  </Transition>

  <Transition name="modal">
    <section class="modal create-location-modal" v-if="showCreateLocationModal">
          <article class="content">
              <button type="button" class="close-btn" @click="() => showCreateLocationModal = false"><font-awesome-icon :icon="['fas', 'circle-xmark']" class="icon" /></button>
              <CreateLocation />
          </article>
      </section>
  </Transition>

</template>

<style scoped>
@import '../modal.css';

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

  min-height: 100vh;
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

.icon-button-title {
  display: flex;
  gap: 20px;
}

.icon-button-title h2 {
  font-size: 40px;
  font-weight: 700;

  margin: 10px 0;

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

</style>
