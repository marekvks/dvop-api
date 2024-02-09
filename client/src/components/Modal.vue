<script>
import { Transition, ref } from 'vue';

let show = ref(false);

const showModal = () => show.value = true;
const closeModal = () => show.value = false;

export default {
    name: "Modal",
    data() {
        return {
            show
        };
    },
    methods: {
        showModal,
        closeModal
    },
    components: { Transition }
}

</script>

<template>
    <Transition name="overlay">
        <section class="overlay" v-if="show">
            <article class="content">
                <button type="button" class="close-btn" @click="closeModal()"><font-awesome-icon :icon="['fas', 'circle-xmark']" class="icon" /></button>
                <slot />
            </article>
        </section>
    </Transition>
</template>

<style scoped>

.overlay {
    display: grid;
    place-content: center;
    position: fixed;
    top: 0;

    width: 100%;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.5);
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;

    min-height: 200px;
    width: 500px;

    border-radius: 10px;
    background-color: #111f;
}

.close-btn {
    align-self: flex-end;

    margin-top: 8px;
    margin-right: 8px;
}

.icon {
    transition: 0.2s ease;
}

.close-btn:hover .icon {
    color: #ff2c2c;
    filter: drop-shadow(0 0 2px #ff2c2c);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

</style>