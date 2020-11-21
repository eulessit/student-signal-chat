const state = {
    sender: null,
    receiver: null,
    messages: [],
    participants: []
};

const getters = {
    receiver: state => state.receiver,
    messages: state => state.messages,
    participants: state => state.participants
};

const actions = {
    getParticipants({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/participants`)
                .then(res => {
                    commit("setParticipants", res.data.data);
                    if (res.data.data.length) {
                        commit("setReceiver", res.data.data[0]);
                    }
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    },
    getMessages({ commit, getters }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/api/messages")
                .then(res => {
                    commit("setMessage", res.data.data);
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    }
};

const mutations = {
    setReceiver(state, receiver) {
        state.receiver = receiver;
    },
    setMessage(state, messages) {
        state.messages = messages;
    },
    addMessage(state, message) {
        state.messages = state.messages.concat(message);
    },
    setParticipants(state, participants) {
        state.participants = participants;
    }
};

export default {
    namespaced: true,

    state,
    getters,
    actions,
    mutations
};
