<template>
	<div>
		<ChatGroupsListItem v-for="group in groups" :group="group" :key="group.id" />
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import ChatGroupsListItem from "./ChatGroupsListItem";

export default {
	name: "ChatGroupsList",
	components: { ChatGroupsListItem },
	computed: {
		...mapGetters({ groups: "group/groups" }),
	},
};
</script>

<style lang="scss" scoped></style>
