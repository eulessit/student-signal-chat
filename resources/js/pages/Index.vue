<template>
    <div v-if="ready" id="chat-app">
        <b-container fluid class="my-4">
            <b-row class="h-100" no-gutters>
                <b-col class="chat-sidebar" cols="4">
                    <ChatSidebar />
                </b-col>
                <b-col class="chat-sidebar" cols="8">
                    <ChatInbox />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import e2ee from "../mixins/e2ee";
import { mapActions } from "vuex";
import ChatInbox from "../components/index/ChatInbox";
import ChatSidebar from "../components/index/ChatSidebar";
export default {
    name: "ChatApp",
    components: { ChatInbox, ChatSidebar },
    mixins: [e2ee],
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem("api_token")) {
            next();
            return;
        }
        next("/login");
    },
    data() {
        return {
            ready: false
        };
    },
    methods: {
        ...mapActions({
            getUser: "user/getUser"
        })
    },
    created() {
        this.getUser().then(_ => {
            this.ready = true;
        });
    }
};
</script>

<style lang="scss" scoped>
#chat-app {
    width: 100%;
    height: 100%;
    display: flex;
    background: white;
}
</style>
