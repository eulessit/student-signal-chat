<template>
    <div class="chat-inbox-messages">
        <ChatInboxMessage
            v-for="message in messages"
            :message="message"
            :key="message.id"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ChatInboxMessage from "./ChatInboxMessage";
export default {
    name: "ChatInboxMessages",
    components: { ChatInboxMessage },
    computed: {
        ...mapGetters({
            loggedIn: "user/loggedIn",
            messages: "conversation/messages"
        })
    },
    methods: {
        ...mapActions({
            currentUser: "user/currentUser",
            getMessages: "conversation/getMessages"
        })
    },
    created() {
        if (this.loggedIn) {
            this.getMessages();
            setInterval(() => {
                this.getMessages();
            }, 1000);
        }
    }
};
</script>

<style lang="scss" scoped>
.chat-inbox-messages {
    flex: 1;
}
</style>
