<template>
	<div v-if="ready" id="chat-app">
		<MainNavbar />
		<b-container fluid class="my-4 flex-grow-1">
			<b-row class="h-100" no-gutters>
				<b-col class="chat-sidebar" cols="4">
					<ChatSidebar />
				</b-col>
				<b-col class="chat-sidebar" cols="8">
					<ChatInbox />
				</b-col>
			</b-row>
		</b-container>
		<ModalsHolder />
	</div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import ChatInbox from "../components/index/ChatInbox";
import MainNavbar from "../components/layouts/MainNavbar";
import ChatSidebar from "../components/index/ChatSidebar";
import ModalsHolder from "../components/modals/Index";

export default {
	name: "ChatApp",
	components: { ChatInbox, MainNavbar, ChatSidebar, ModalsHolder },
	beforeRouteEnter(to, from, next) {
		if (localStorage.getItem("api_token")) {
			next();
			return;
		}
		next("/login");
	},
	data() {
		return {
			ready: false,
		};
	},
	methods: {
		...mapMutations({
			addMessage: "conversation/addMessage",
			addGroupMessage: "group/addGroupMessage",
		}),
		...mapActions({
			getUser: "user/getUser",
			getGroups: "group/getGroups",
			getParticipants: "group/getParticipants",
			getConversations: "conversation/getConversations",
		}),
	},
	created() {
		this.getUser().then((res) => {
			const currentUserId = res.data.data.id;
			console.log(`chat.${currentUserId}`);

			Promise.all([
				this.getGroups(),
				this.getConversations(),
				this.getParticipants(),
			])
				.then((values) => ({
					groupsResponse: values[0].data,
					conversationsResponse: values[1].data,
					participantsResponse: values[2].data,
				}))
				.then(({ groupsResponse, conversationsResponse }) => {
					const groups = groupsResponse.data;
					const conversations = conversationsResponse.data;
					if (groups.length > 0) {
						groups.map(g => {
							Echo.channel(`group.${g.id}`).listen(
								"GroupMessageSent",
								(e) => {
									this.addGroupMessage(e.message);
								}
							);							
						})
					}
					if (conversations.length > 0) {
						conversations.map(c => {
							Echo.channel(`chat.${c.id}`).listen(
								"NewMessageSent",
								(e) => {
									this.addMessage(e.message);
								}
							);							
						})
					}
					this.ready = true;
				});
		});
	},
};
</script>

<style lang="scss" scoped>
#chat-app {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background: white;
}
</style>
