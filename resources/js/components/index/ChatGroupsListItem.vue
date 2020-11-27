<template>
	<div class="chat-groups-list-item" :class="{'--active': isGroupActive(group)}" @click="onGroupChanged">
		<b-avatar src="https://placekitten.com/300/300" size="2.4rem"></b-avatar>
		<h3 v-text="group.name"></h3>
	</div>
</template>

<script>
import chatUtils from "../../mixins/chat-utils";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
	name: "ChatGroupsListItem",
	props: { group: { type: Object } },
	mixins: [chatUtils],
	computed: {
		...mapGetters({}),
	},
	methods: {
		...mapActions({
			getGroupMessages: "group/getGroupMessages",
		}),
		...mapMutations({
			setActiveChatType: "user/setActiveChatType",
			setGroup: "group/setGroup",
		}),
		onGroupChanged() {
			this.setActiveChatType("group");
			this.setGroup(this.group);
			this.getGroupMessages();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../shared/scss/variables";

.chat-groups-list-item {
	display: flex;
	align-items: center;
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
		margin-left: 7px;
	}

	.recent-message {
		font-size: 0.9rem;
	}
}
</style>
