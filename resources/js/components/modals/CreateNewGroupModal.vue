<template>
	<b-modal title="Create new conversation" @hidden="resetForm" @ok.prevent="onOk" :visible="isCreateNewGroupModalOpen" @change="onChange">
		<b-form @submit.prevent="onOk">
			<b-form-group label="Conversation name" label-for="group-name">
				<b-form-input id="group-name" v-model="form.group_name" type="text" required placeholder="Conversation name"></b-form-input>
			</b-form-group>

			<b-form-group label="Participants">
				<b-form-checkbox class="ml-2 user-select-none" v-for="participant in participants" v-model="form.participants" :name="`participant-${participant.id}`" :value="participant.id" :key="participant.id">
					{{ participant.name }}
				</b-form-checkbox>
			</b-form-group>
		</b-form>
	</b-modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
	name: "CreateNewGroupModal",
	data() {
		return {
			form: {
				group_name: "",
				participants: [],
			},
		};
	},
	computed: {
		...mapGetters({
			participants: "group/participants",
			isCreateNewGroupModalOpen: "modals/isCreateNewGroupModalOpen",
		}),
	},
	methods: {
		...mapMutations({
			showCreateNewGroupModal: "modals/showCreateNewGroupModal",
			hideCreateNewGroupModal: "modals/hideCreateNewGroupModal",
		}),
		...mapActions({
			createConversation: "conversation/createConversation",
			createGroup: "group/createGroup",
		}),
		onChange(isVisible) {
			isVisible
				? this.showCreateNewGroupModal()
				: this.hideCreateNewGroupModal();
		},
		onOk() {
			const members = this.form.participants.length;
			if (members === 0) return false;
			if (members > 1) {
				if (!this.form.group_name) {
					this.$toastr.e("Please input conversation name.");
					return false;
				}
				this.createGroup(this.form).then((_) => {
					this.$toastr.s("Group created successfully.");
					this.hideCreateNewGroupModal();
				});
			} else {
				this.createConversation(this.form).then((_) => {
					this.$toastr.s("Conversation created successfully.");
					this.hideCreateNewGroupModal();
				});
			}
		},
		resetForm() {
			this.form = {
				group_name: "",
				participants: [],
			};
		},
	},
};
</script>
