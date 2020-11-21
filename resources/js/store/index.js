import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./modules/user";
import conversation from "./modules/conversation";

export default new Vuex.Store({
    modules: {
        user,
        conversation
    }
});
