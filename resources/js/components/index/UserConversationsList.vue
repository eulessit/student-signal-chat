<template>
	<div>
		<UserConversationsListItem v-for="conversation in conversations" :conversation="conversation" :key="conversation.id" />
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import UserConversationsListItem from "./UserConversationsListItem";

export default {
	name: "UserConversationsList",
	components: { UserConversationsListItem },
	computed: {
		...mapGetters({ conversations: "conversation/conversations" }),
	},
};
</script>

<style lang="scss" scoped></style>
