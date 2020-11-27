<template>
	<div class="chat-users-list-item" :class="{'--active': isConversationActive(conversation)}" @click="onConversationChange">
		<b-avatar src="https://placekitten.com/300/300" size="2.4rem"></b-avatar>
		<div class="flex-grow-1 ml-2">
			<div class="d-flex justify-content-between">
				<h3 v-if="currentUser.id==conversation.sender_id" v-text="conversation.receiver.name"></h3>
				<h3 v-else v-text="conversation.sender.name"></h3>
				<span>10:34 AM</span>
			</div>
			<div class="recent-message" v-text="conversation.recent_message || 'Send a new message'"></div>
		</div>
	</div>
</template>

<script>
import chatUtils from "../../mixins/chat-utils";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
	name: "UserConversationsListItem",
	props: { conversation: { type: Object } },
	mixins: [chatUtils],
	computed: {
		...mapGetters({
			receiver: "conversation/receiver",
			currentUser: "user/currentUser",
		}),
	},
	methods: {
		...mapActions({
			getConversation: "conversation/getConversation",
		}),
		...mapMutations({
			setActiveChatType: "user/setActiveChatType",
			setConversation: "conversation/setConversation",
		}),
		onConversationChange() {
			this.setActiveChatType("conversation");
			this.setConversation(this.conversation);
			this.getConversation();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../shared/scss/variables";

.chat-users-list-item {
	display: flex;
	cursor: pointer;
	background-color: white;
	border-radius: 4px;
	margin-bottom: 7px;
	padding: 10px;
	&.--active {
		background-color: #eaeaea;
	}
	&:last-child {
		margin-bottom: unset;
	}

	h3 {
		color: $blue;
		font-size: 1rem;
		font-weight: 700;
		margin-bottom: 0;
	}

	span {
		font-size: 0.7rem;
		color: $grey;
	}

	.recent-message {
		font-size: 0.9rem;
	}
}
</style>
