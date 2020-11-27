const state = {
    isCreateNewGroupModalOpen: false,
};

const getters = {
    isCreateNewGroupModalOpen: state => state.isCreateNewGroupModalOpen,
};

const actions = {
};

const mutations = {
    showCreateNewGroupModal(state) {
        state.isCreateNewGroupModalOpen = true;
    },
    hideCreateNewGroupModal(state) {
        state.isCreateNewGroupModalOpen = false;
    },
};

export default {
    namespaced: true,

    state,
    getters,
    actions,
    mutations
};
