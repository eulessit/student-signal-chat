const state = {
    group: null,
    groups: [],
    participants: []
};

const getters = {
    group: state => state.group,
    groups: state => state.groups,
    messages: state => getMessages(state),
    participants: state => state.participants
};

const actions = {
    getParticipants({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/participants`)
                .then(res => {
                    const participants = res.data.data;
                    commit("setParticipants", participants);
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    },
    getGroups({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/groups`)
                .then(res => {
                    commit('setGroups', res.data.data);
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    },
    getGroupMessages({ commit, getters }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/groups/${getters.group.id}/messages`)
                .then(res => {
                    const group = res.data.data
                    commit("setGroup", group);
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    },
    createGroup({ commit }, form) {
        return new Promise((resolve, reject) => {
            axios
                .post(`/api/groups`, { ...form })
                .then(res => {
                    commit('addGroup', res.data.data);
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    },
    sendGroupMessage({ commit, getters }, message) {
        return new Promise((resolve, reject) => {
            axios
                .post(`/api/groups/${getters.group.id}/messages`, { content: message })
                .then(res => {
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    }
};

const mutations = {
    setParticipants(state, participants) {
        state.participants = participants;
    },
    setGroup(state, group) {
        state.group = group;
    },
    setGroups(state, groups) {
        state.groups = groups;
    },
    addGroup(state, group) {
        state.groups = state.groups.concat(group);
    },
    addGroupMessage(state, message) {
        const currentUser = this.getters['user/currentUser'];
        const activeChatType = this.getters['user/activeChatType'];
        if (activeChatType !== 'group') {
            return;
        }
        message.isSender = message.user_id === currentUser.id;
        state.group.group_messages = state.group.group_messages.concat(message);
    },    
};

const getMessages = state => {
    if (!state.group) return [];
    return state.group.group_messages
}

export default {
    namespaced: true,

    state,
    getters,
    actions,
    mutations
};
