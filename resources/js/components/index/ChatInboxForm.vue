<template>
    <form class="chat-inbox-form mb-4" @submit.prevent="sendMessage">
        <b-form-input
            class="p-2"
            type="text"
            name="message"
            v-model="message"
            placeholder="Write Something"
        >
        </b-form-input>

        <b-icon
            @click="sendMessage"
            icon="arrow-right-circle-fill "
            variant="primary"
            font-scale="2"
            class="ml-3"
        ></b-icon>
    </form>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: "ChatInboxForm",
    data() {
        return {
            message: ""
        };
    },
    methods: {
        ...mapMutations({ addMessage: "conversation/addMessage" }),
        sendMessage() {
            axios.post("/api/messages", { content: this.message }).then(res => {
                this.addMessage(res.data.data);
                this.message = "";
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.chat-inbox-form {
    display: flex;
    align-items: center;

    input {
        flex: 1;
    }
}
</style>
