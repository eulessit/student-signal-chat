<template>
    <div v-if="receiver" class="inbox-user-profile">
        <b-avatar src="https://placekitten.com/300/300" size="2rem"></b-avatar>
        <div class="d-flex align-items-center ml-3">
            <h3 class="mb-0 mr-2" v-text="receiver.name"></h3>
            <span class="active-indicator"></span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "InboxUserProfile",
    computed: {
        ...mapGetters({ receiver: "conversation/receiver" })
    }
};
</script>

<style lang="scss" scoped>
@import "../../shared/scss/variables";
.inbox-user-profile {
    display: flex;
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
}
</style>
