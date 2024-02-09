import { createApp } from 'vue';
import './style.css';
import App from './App.vue';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faCirclePlus, faCircleArrowRight, faPenToSquare, faCircleMinus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faCirclePlus, faCircleArrowRight, faPenToSquare, faCircleMinus, faCircleXmark);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')