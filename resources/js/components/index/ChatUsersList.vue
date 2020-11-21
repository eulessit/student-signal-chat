<template>
    <div>
        <ChatUsersListItem
            v-for="participant in participants"
            :participant="participant"
            :key="participant.id"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ChatUsersListItem from "./ChatUsersListItem";

export default {
    name: "ChatUsersList",
    components: { ChatUsersListItem },
    computed: {
        ...mapGetters({ participants: "conversation/participants" })
    },
    methods: {
        ...mapActions({ getParticipants: "conversation/getParticipants" })
    },
    created() {
        this.getParticipants();
    }
};
</script>

<style lang="scss" scoped></style>
