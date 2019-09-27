import Home from './components/Home.vue';
import Catalog from './components/Catalog.vue';

const routes = [
    {
        path: "/",
        component: Home,
        name: "Home"
    },
    {
        path: "/category",
        component: Catalog,
        name: "Catalog"
    }
];

export default routes;
