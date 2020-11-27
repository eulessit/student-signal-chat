<template>
	<div class="chat-inbox-message mb-4" :class="{ sender: message.isSender }">
		<b-avatar src="https://placekitten.com/300/300" size="1.8rem"></b-avatar>
		<span class="message-card" v-text="message.content"></span>
	</div>
</template>

<script>
export default {
	name: "ChatInboxMessage",
	props: { message: { type: Object } },
};
</script>

<style lang="scss" scoped>
@import "../../shared/scss/variables";

.chat-inbox-message {
	display: flex;
	position: relative;

	&.sender {
		justify-content: flex-end;

		.message-card {
			color: #ffffff;
			margin-left: unset;
			margin-right: 2rem;
			background-color: $blue;
			border-bottom-left-radius: 7px;
			border-bottom-right-radius: 0;
		}
	}

	.b-avatar {
		position: absolute;
		bottom: -5px;
	}

	.message-card {
		padding: 4px 12px;
		margin-left: 2rem;
		border-radius: 7px;
		word-break: break-word;
		background-color: #fff;
		border: 1px solid rgba(0, 0, 0, 0.125);
		border-bottom-left-radius: 0;
	}
}
</style>
