<template>
	<form class="chat-inbox-form mb-4" @submit.prevent="onSendMessage">
		<b-form-input class="p-2" type="text" name="message" v-model="message" placeholder="Write Something">
		</b-form-input>

		<b-icon @click="onSendMessage" icon="arrow-right-circle-fill " variant="primary" font-scale="2" class="ml-3"></b-icon>
	</form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	name: "ChatInboxForm",
	data() {
		return {
			message: "",
		};
	},
	computed: {
		...mapGetters({
			chatType: "user/activeChatType",
		}),
	},	
	methods: {
		...mapActions({
			sendMessage: "conversation/sendMessage",
			sendGroupMessage: "group/sendGroupMessage"
		}),
		onSendMessage() {
			console.log(this.chatType);
			if (this.chatType === 'conversation') {
				this.sendMessage(this.message).then((_) => {
					console.log('1-1 message sent!');
					this.message = "";
				});
			} else {
				this.sendGroupMessage(this.message).then((_) => {
					console.log('group message sent!');
					this.message = "";
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.chat-inbox-form {
	display: flex;
	align-items: center;

	input {
		flex: 1;
	}
}
</style>
