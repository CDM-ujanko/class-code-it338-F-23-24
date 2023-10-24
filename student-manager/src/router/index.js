import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import StudentView from "@/views/StudentView.vue";
import StudentEditView from "@/views/StudentEditView.vue";
import ErrorView from "@/views/ErrorView.vue";

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/about',
        component: AboutView
    },
    {
        path: '/student/create',
        component: StudentEditView
    },
    {
        path: '/student/:id',
        component: StudentView
    },
    {
        path: '/:pathMatch(.*)',
        component: ErrorView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: 'active'
})

export default router;