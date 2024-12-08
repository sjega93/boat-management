import { createWebHistory, createRouter } from "vue-router";
import CreateComponent from "../components/CreateComponent.vue";
import EditComponent from "../components/EditComponent.vue";
import ListComponent from "../components/ListComponent.vue";
import OverviewComponent from "../components/OverviewComponent.vue";
const routes = [
    {
        path: "/home",
        name: "home",
        component: OverviewComponent, 
    },
    {
        path: "/create",
        name: "create",
        component: CreateComponent, 
    },
    {
        path: "/view",
        name: "view",
        component: ListComponent,
    },
    {
        path: "/edit/:id",
        name: "edit",
        component: EditComponent,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

// const router = createRouter({
//     history: createWebHashHistory(),
//     routes: [
//         {
//             path: "/",
//             name: "home",
//             component: CreateComponent, 
//         },
//         {
//             path: "/view",
//             name: "view",
//             component: ListComponent,
//         },
//         {
//             path: "/edit/:id",
//             name: "edit",
//             component: EditComponents,
//         },
//       ],
// });