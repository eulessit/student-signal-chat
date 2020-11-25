<template>
    <div class="chat-users-list-item mb-4">
        <b-avatar
            src="https://placekitten.com/300/300"
            size="2.4rem"
        ></b-avatar>
        <div class="flex-grow-1 ml-2">
            <div class="d-flex justify-content-between">
                <h3 v-text="participant.name"></h3>
                <span>07:34 PM</span>
            </div>
            <div class="recent-message">Hello there!</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChatUsersListItem",
    props: { participant: { type: Object } }
};
</script>

<style lang="scss" scoped>
@import "../../shared/scss/variables";

.chat-users-list-item {
    display: flex;

    h3 {
        color: $blue;
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 0;
    }

    span {
        font-size: 0.7rem;
        color: $grey;
    }

    .recent-message {
        font-size: 0.9rem;
    }
}
</style>
