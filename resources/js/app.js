require("./bootstrap");

import Vue from "vue";
import store from "./store";
import router from "./router";
import App from "./components/App.vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
if (document.getElementById("app")) {
    new Vue({
        render: h => h(App),
        router,
        store
    }).$mount("#app");
}
