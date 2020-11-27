<template>
	<div class="chat-inbox py-3 pl-4">
		<div class="new-group-icon">
			<b-icon icon="plus-square" font-scale="2" @click="showCreateNewGroupModal"></b-icon>
		</div>
		<InboxUserProfile />
		<hr class="w-100 my-2" />
		<ChatInboxMessages />
		<hr class="w-100 my-2" />
		<ChatInboxForm />
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import ChatInboxForm from "./ChatInboxForm";
import InboxUserProfile from "./InboxUserProfile";
import ChatInboxMessages from "./ChatInboxMessages";

export default {
	name: "ChatInbox",
	components: { ChatInboxForm, InboxUserProfile, ChatInboxMessages },
	methods: {
		...mapMutations({
			showCreateNewGroupModal: "modals/showCreateNewGroupModal",
		}),
	},
};
</script>

<style lang="scss" scoped>
.chat-inbox {
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;

	.new-group-icon {
		position: absolute;
		top: 18px;
		right: 0;
	}
}
</style>
