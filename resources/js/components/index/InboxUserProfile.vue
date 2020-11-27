<template>
	<div class="inbox-container">
		<div v-if="activeChat" class="inbox-user-profile">
			<b-avatar src="https://placekitten.com/300/300" size="2rem"></b-avatar>
			<div class="d-flex align-items-center ml-3">
				<h3 class="mb-0 mr-2" v-text="activeChat.name || activeChat.receiver.name"></h3>
				<span class="active-indicator"></span>
			</div>
			<div class="participants-list" v-if="activeChatType === 'group'">
				<span v-text="formatGroupParticipants"></span>
			</div>
		</div>
	</div>
</template>

<script>
import chatUtils from "../../mixins/chat-utils";

export default {
	name: "InboxUserProfile",
	mixins: [chatUtils],
	computed: {
		formatGroupParticipants() {
			if (!this.activeGroup || !this.activeGroup.participants) {
				return "";
			}
			return this.activeGroup.participants
				.map((participant) => participant.name)
				.join(", ");
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../shared/scss/variables";
.inbox-container {
	min-height: 65px;
}

.inbox-user-profile {
	display: flex;
	flex-wrap: wrap;
	align-items: center;

	h3 {
		font-size: 1.3rem;
		font-weight: 700;
	}

	.active-indicator {
		width: 10px;
		height: 10px;
		display: block;
		border-radius: 50%;
		background-color: $green;
	}

	.participants-list {
		display: flex;
		align-items: center;
		width: 100%;
		margin-top: 7px;

		span {
			font-weight: 700;
			font-size: 0.7rem;
			color: #808080;
		}
	}
}
</style>
