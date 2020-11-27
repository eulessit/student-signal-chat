<template>
	<div class="chat-inbox-messages">
		<!-- {{ messages }} -->
		<ChatInboxMessage v-for="message in messages" :message="message" :key="message.id" />
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ChatInboxMessage from "./ChatInboxMessage";
import chatUtils from "../../mixins/chat-utils";

export default {
	name: "ChatInboxMessages",
	mixins: [chatUtils],
	components: { ChatInboxMessage },
	computed: {
		...mapGetters({
			loggedIn: "user/loggedIn",
		}),
	},
	methods: {
		...mapActions({
			currentUser: "user/currentUser",
		}),
	},
};
</script>

<style lang="scss" scoped>
.chat-inbox-messages {
	flex: 1;
	overflow: hidden scroll;
	max-height: 70vh;
	background: white;
}
</style>
