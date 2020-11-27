import store from '../index';

const state = {
    conversation: null,
    conversations: []
};

const getters = {
    receiver: state => getReceiver(state),
    messages: state => getMessages(state),
    conversation: state => state.conversation,
    conversations: state => state.conversations,
};

const actions = {
    getConversations({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/conversations`)
                .then(res => {
                    const conversations = res.data.data
                    commit("setConversations", conversations);

                    if (conversations.length) {
                        commit('setConversation', conversations[0]);
                        dispatch('getConversation');
                    }
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    },
    getConversation({ commit, getters }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/conversations/${getters.conversation.id}/messages`)
                .then(res => {
                    const conversation = res.data.data
                    commit("setConversation", conversation);
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    },
    sendMessage({ commit, getters }, message) {
        return new Promise((resolve, reject) => {
            axios
                .post(`/api/conversations/${getters.conversation.id}/messages`, { content: message })
                .then(res => {
                    resolve(res);
                })
                .catch(err => reject(err));
        });
    },
    createConversation({ commit }, form) {
        return new Promise((resolve, reject) => {
            axios
                .post(`/api/create-conversation`, { ...form })
                .then(res => {
                    commit('addConversation', res.data.data);
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
        const currentUser = this.getters['user/currentUser'];
        const activeChatType = this.getters['user/activeChatType'];
        if (activeChatType !== 'conversation') {
            return;
        }
        message.isSender = currentUser.id === message.user_id;
        state.conversation.private_messages = state.conversation.private_messages.concat(message);
    },
    setConversation(state, conversation) {
        state.conversation = conversation;
    },
    setConversations(state, conversations) {
        state.conversations = conversations;
    },
    addConversation(state, conversation) {
        if (state.conversations.findIndex(c => c.id == conversation.id) < 0) {
            state.conversations = state.conversations.concat(conversation);
        }
        state.conversation = conversation;
    },
};

const getReceiver = (state) => {
    if (!state.conversation || !state.conversation.receiver) {
        return null;
    }

    let receiver = state.conversation.receiver;
    const currentUser = store.getters['user/currentUser'];

    if (receiver.id === currentUser.id) {
        receiver = state.conversation.sender;
    }

    return receiver;
}

const getMessages = state => {
    if (!state.conversation) return [];
    return state.conversation.private_messages
}

export default {
    namespaced: true,

    state,
    getters,
    actions,
    mutations
};
