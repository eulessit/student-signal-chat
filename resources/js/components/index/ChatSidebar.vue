<template>
    <div class="chat-sidebar py-3 px-4">
        <UserProfile />
        <hr class="my-4" />
        <ChatUsersList />
    </div>
</template>

<script>
import UserProfile from "./UserProfile";
import ChatUsersList from "./ChatUsersList";
export default {
    name: "ChatSidebar",
    components: { UserProfile, ChatUsersList }
};
</script>

<style lang="scss" scoped>
.chat-sidebar {
    height: 100%;
    background-color: #f9f9f9;
}
</style>
