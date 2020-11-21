import Vue from "vue";
import VueRouter from "vue-router";
import IndexPage from "../pages/Index.vue";
import LoginPage from "../pages/Login.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/", component: IndexPage },
        { path: "/login", component: LoginPage }
    ]
});

export default router;
