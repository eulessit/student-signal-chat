<template>
    <div class="login-page">
        <b-form @submit.prevent="onSubmit">
            <b-form-group label="Email address:" label-for="email-address">
                <b-form-input
                    id="email-address"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="password">
                <b-form-input
                    id="password"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="Enter password"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Login",
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem("api_token")) {
            next("/");
            return;
        }
        next();
    },
    data() {
        return {
            form: { email: "", password: "" }
        };
    },
    methods: {
        ...mapActions({ login: "user/login" }),
        onSubmit() {
            this.login(this.form).then(_ => {
                location.href = "/";
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.login-page {
    display: flex;
    justify-content: center;
    width: 100%;

    form {
        width: 100%;
        max-width: 375px;
    }
}
</style>
