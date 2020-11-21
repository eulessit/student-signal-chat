<template>
    <div class="chat-inbox py-3 px-4">
        <div class="logout-icon">
            <b-icon
                icon="box-arrow-right"
                font-scale="2"
                @click="onLogout"
            ></b-icon>
        </div>
        <InboxUserProfile />
        <hr class="w-100 my-4" />
        <ChatInboxMessages />
        <hr class="w-100 my-4" />
        <ChatInboxForm />
    </div>
</template>

<script>
import { mapActions } from "vuex";
import ChatInboxForm from "./ChatInboxForm";
import InboxUserProfile from "./InboxUserProfile";
import ChatInboxMessages from "./ChatInboxMessages";

export default {
    name: "ChatInbox",
    components: { ChatInboxForm, InboxUserProfile, ChatInboxMessages },
    methods: {
        ...mapActions({ logout: "user/logout" }),
        onLogout() {
            this.logout().then(_ => {
                this.$router.push("/login");
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.chat-inbox {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    .logout-icon {
        position: absolute;
        right: 0;
    }
}
</style>
