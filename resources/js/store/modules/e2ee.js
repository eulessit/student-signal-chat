const state = {
    keyHelper: libsignal.KeyHelper,
    registrationId: localStorage.getItem("registrationId"),
    identityKeyPair: localStorage.getItem("identityKeyPair")
};

const getters = {
    keyHelper: state => state.keyHelper,
    registrationId: state => state.registrationId,
    identityKeyPair: state => JSON.parse(state.identityKeyPair)
};

const actions = {
    storePreKey(_, preKey) {
        return new Promise(async (resolve, reject) => {
            const { keyId, keyPair } = preKey;
            axios.post("/api/prekey", { keyId, keyPair }).then(res => {
                console.log(res.data);
                resolve(res);
            });
        });
    },
    install({ commit, getters, actions }) {
        return new Promise(async (resolve, reject) => {
            if (!getters.registrationId) {
                const registrationId = getters.keyHelper.generateRegistrationId();
                commit("setRegistrationId", registrationId);
            }

            // if (!getters.identityKeyPair) {
            const identityKeyPair = await getters.keyHelper.generateIdentityKeyPair();
            commit("setIdentityKeyPair", identityKeyPair);
            console.log(identityKeyPair);
            // const preKey = await getters.keyHelper.generatePreKey(keyId);
            // actions.storePreKey(preKey);

            console.log("KeyHelper", getters.keyHelper);
            console.log("registrationId: ", getters.registrationId);
            console.log("identityKeyPair: ", getters.identityKeyPair);
            console.log("identityKeyPair: ", identityKeyPair);
            // resolve();
        });
    }
};

const mutations = {
    setRegistrationId(state, registrationId) {
        state.registrationId = registrationId;
        localStorage.setItem("registrationId", registrationId);
    },
    setIdentityKeyPair(state, identityKeyPair) {
        identityKeyPair = JSON.stringify(identityKeyPair);
        state.identityKeyPair = identityKeyPair;
        localStorage.setItem("identityKeyPair", identityKeyPair);
    }
};

export default {
    namespaced: true,

    state,
    getters,
    actions,
    mutations
};
