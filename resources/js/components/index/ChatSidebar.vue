<template>
	<div class="chat-sidebar py-3 px-4">
		<UserProfile />
		<hr class="my-4" />
		<h3 class="h4">Groups Chat</h3>
		<ChatGroupsList />
		<hr class="my-4" />
		<h3 class="h4">Private Chat</h3>
		<UserConversationsList />
	</div>
</template>

<script>
import UserProfile from "./UserProfile";
import UserConversationsList from "./UserConversationsList";
import ChatGroupsList from "./ChatGroupsList";
export default {
	name: "ChatSidebar",
	components: { UserProfile, UserConversationsList, ChatGroupsList },
};
</script>

<style lang="scss" scoped>
.chat-sidebar {
	height: 100%;
	background-color: #f9f9f9;
}
</style>
