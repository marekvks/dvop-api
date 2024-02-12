import { createRouter, createWebHistory } from 'vue-router';
import ControlPanel from '../components/ControlPanel.vue';
import Location from '../views/Location.vue';
import Order from '../views/Order.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
    {
        path: '/admin',
        name: 'home',
        component: ControlPanel
    },
    {
        path: '/location/:location',
        name: 'location',
        component: Location,
        async beforeEnter(to, from, next) {
            const address = to.params.location;

            const response = await fetch(`http://localhost:8080/location/${address}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                next();
                return true;
            }

            next({ name: 'NotFound' })
        }
    },
    {
        path: '/order/:id',
        name: 'order',
        component: Order,
        async beforeEnter(to, from, next) {
            const id = Number(to.params.id);

            const response = await fetch(`http://localhost:8080/order/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                next();
                return true;
            }

            next({ name: 'NotFound' })
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;