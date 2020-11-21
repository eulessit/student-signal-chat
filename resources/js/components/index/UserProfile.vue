<template>
    <div class="user-profile">
        <b-avatar src="https://placekitten.com/300/300" size="3rem"></b-avatar>
        <div class="ml-3">
            <h3 v-text="currentUser.name"></h3>
            <h4>Senior Developer</h4>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "UserProfile",
    computed: {
        ...mapGetters({ currentUser: "user/currentUser" })
    }
};
</script>

<style lang="scss" scoped>
@import "../../shared/scss/variables";

.user-profile {
    display: flex;
    align-items: center;
    h3,
    h4 {
        margin-bottom: 0;
        font-weight: 700;
    }

    h3 {
        color: $blue;
        font-size: 1.2rem;
    }
    h4 {
        color: $grey;
        font-size: 0.9rem;
    }
}
</style>
