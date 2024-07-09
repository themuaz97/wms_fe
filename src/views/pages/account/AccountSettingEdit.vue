<script setup>
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const oldPassword = ref('');
const newPassword = ref('');
const newPassword1 = ref('');

const oldPasswordError = ref(false);
const newPasswordError = ref(false);
const newPassword1Error = ref(false);

const BtnSaveSetting = () => {
    oldPasswordError.value = !oldPassword.value;
    newPasswordError.value = !newPassword.value;
    newPassword1Error.value = !newPassword1.value;

    if (!oldPasswordError.value && !newPasswordError.value && !newPassword1Error.value && passwordMatch.value) {
        router.push({ name: 'account' });
        toast.add({ severity: 'info', summary: 'info', detail: 'Password Updated!', life: 3000 });
    }
};

const passwordMatch = computed(() => {
    return newPassword.value === newPassword1.value;
});

const BtnCancel = () => {
    router.push({ name: 'dashboard' });
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="col-12 md:col-12">
                <div class="p-fluid formgrid grid">
                    <div class="field col-10 md:col-8 justify-center mx-auto max-w-lg">
                        <div class="field col-12 md:col-12">
                            <label for="oldPassword">Old Password</label>
                            <Password v-model="oldPassword" :class="{ 'p-invalid': oldPasswordError }" toggleMask />
                            <small v-if="oldPasswordError" class="p-error">Old password is required</small>
                        </div>
                        <div class="field col-12 md:col-12">
                            <label for="newPassword">New Password</label>
                            <Password v-model="newPassword" :class="{ 'p-invalid': newPasswordError }" toggleMask>
                                <template #header>
                                    <h6>Pick a password</h6>
                                </template>
                                <template #footer>
                                    <Divider />
                                    <p class="mt-2">Suggestions</p>
                                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                        <li>At least one lowercase</li>
                                        <li>At least one uppercase</li>
                                        <li>At least one numeric</li>
                                        <li>Minimum 8 characters</li>
                                    </ul>
                                </template>
                            </Password>
                            <small v-if="newPasswordError" class="p-error">New password is required</small>
                        </div>
                        <div class="field col-12 md:col-12">
                            <label for="newPassword1">Confirm Password</label>
                            <Password v-model="newPassword1" :class="{ 'p-invalid': newPassword1Error }" toggleMask>
                                <template #header>
                                    <h6>Pick a password</h6>
                                </template>
                                <template #footer>
                                    <Divider />
                                    <p class="mt-2">Suggestions</p>
                                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                        <li>At least one lowercase</li>
                                        <li>At least one uppercase</li>
                                        <li>At least one numeric</li>
                                        <li>Minimum 8 characters</li>
                                    </ul>
                                </template>
                            </Password>
                            <small v-if="newPassword1Error" class="p-error">Confirm password is required</small>
                            <small v-if="!newPassword1Error && !passwordMatch" class="p-error">Passwords do not match</small>
                            <small v-else-if="newPassword && !newPassword1Error && passwordMatch" class="text-green-500">Passwords matched!</small>
                        </div>
                        <div class="col-12 flex justify-content-center py-3 gap-2 button-group">
                            <Button label="Save" class="col-3 md:col-3 py-2" @click="BtnSaveSetting" />
                            <Button severity="secondary" label="Cancel" class="col-3 md:col-3 py-2" @click="BtnCancel" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.button-group {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

@media (max-width: 600px) {
    .button-group {
        flex-direction: column;
        align-items: center;
    }

    .button-group .p-button {
        width: 100%;
    }
}
</style>
