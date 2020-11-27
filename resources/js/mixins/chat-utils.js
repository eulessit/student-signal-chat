import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            activeGroup: 'group/group',
            groupMessages: "group/messages",
            activeChatType: 'user/activeChatType',
            privateMessages: "conversation/messages",
            activeConversation: 'conversation/conversation',
        }),
        messages() {
            if (this.activeChatType === 'conversation') {
                return this.privateMessages;
            }
            if (this.activeChatType === 'group') {
                return this.groupMessages;
            }
            return [];
        },
        activeChat() {
            if (this.activeChatType === 'conversation' && this.activeConversation) {
                return this.activeConversation;
            }
            if (this.activeChatType === 'group' && this.activeGroup) {
                return this.activeGroup;
            }
            return null;
        }
    },
    methods: {
        isGroupActive(group) {
            if (this.activeChatType !== 'group') {
                return false;
            }
            if (!this.activeGroup) {
                return false;
            }
            return group.id === this.activeGroup.id;
        },
        isConversationActive(conversation) {
            if (this.activeChatType !== 'conversation') {
                return false;
            }
            if (!this.activeConversation) {
                return false;
            }
            return conversation.id === this.activeConversation.id;
        }
    },
}
