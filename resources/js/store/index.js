import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./modules/user";
import modals from "./modules/modals";
import group from "./modules/group";
import conversation from "./modules/conversation";

export default new Vuex.Store({
    modules: {
        user,
        modals,
        group,
        conversation
    }
});
