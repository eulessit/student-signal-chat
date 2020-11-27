<template>
	<div class="main-navbar">
		<b-navbar toggleable="md" type="light" variant="light">
			<b-navbar-brand href="#">Chat applicaiton</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item href="#">
						<div class="logout-icon">
							<b-icon icon="box-arrow-right" font-scale="2" @click="onLogout"></b-icon>
						</div>
					</b-nav-item>

				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "MainNavbar",
	methods: {
		...mapActions({ logout: "user/logout" }),
		onLogout() {
			this.logout().then((_) => {
				this.$router.push("/login");
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.main-navbar {
}
</style>
