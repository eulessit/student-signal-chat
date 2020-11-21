const state = {
    user: null,
    loggedIn: false
};

const getters = {
    loggedIn: state => state.loggedIn,
    currentUser: state => state.user
};

const actions = {
    login({ commit }, form) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/login", form)
                .then(res => {
                    localStorage.setItem("api_token", res.data.data.token);
                    commit("setUser", res.data.data.user);
                    commit("setLoggedIn", true);

                    resolve(res);
                })
                .catch(err => reject(err));
        });
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            if (!localStorage.getItem("api_token")) {
                resolve({});
            }

            axios
                .post("/api/logout")
                .then(res => {
                    localStorage.removeItem("api_token");
                    commit("setUser", null);
                    commit("setLoggedIn", false);
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    },
    getUser({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/api/get-user")
                .then(res => {
                    commit("setUser", res.data.data);
                    commit("setLoggedIn", true);
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    }
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setLoggedIn(state, loggedIn) {
        state.loggedIn = loggedIn;
    }
};

export default {
    namespaced: true,

    state,
    getters,
    actions,
    mutations
};
