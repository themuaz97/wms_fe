<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const router = useRouter();

const name = ref('');
const icNo = ref('');
const email = ref('');
const staffId = ref('');
const phoneNo = ref();
const nameError = ref(false);
const icNoError = ref(false);
const emailError = ref(false);
const staffIdError = ref(false);
const phoneNoError = ref(false);

const BtnSaveEmployeeProfile = () => {
    nameError.value = !name.value;
    icNoError.value = !icNo.value;
    emailError.value = !email.value;
    staffIdError.value = !staffId.value;
    phoneNoError.value = !phoneNo.value;

    if (name.value && icNo.value && email.value && staffId.value && phoneNo.value) {
        router.push({ name: 'employeelist' });
    }
};

const BtnCancelEmployeeProfile = () => {
    router.push({ name: 'employeelist' });
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="col-12 md:col-12">
                <div class="p-fluid formgrid grid">
                    <div class="field col-10 md:col-8 justify-center mx-auto max-w-lg">
                        <div class="field col-12 md:col-12">
                            <label for="TxtEmployeeName">Name</label>
                            <InputText id="TxtEmployeeName" type="text" v-model="name" placeholder="Enter employee name" :class="{ 'p-invalid': nameError }" />
                            <small v-if="nameError" class="p-error">Name is required!</small>
                        </div>
                        <div class="field col-12 md:col-12">
                            <label for="TxtEmployeeICNo">IC No.</label>
                            <InputMask id="TxtEmployeeICNo" mask="999999-99-9999" v-model="icNo" placeholder="Enter IC No." v-tooltip.right="'Ex : 999999-99-9999'" :class="{ 'p-invalid': icNoError }" />
                            <small v-if="icNoError" class="p-error">IC No. is required!</small>
                        </div>
                        <div class="field col-12">
                            <label for="TxtEmployeeEmail">Email</label>
                            <InputText id="TxtEmployeeEmail" v-model="email" placeholder="Enter employee email address" :class="{ 'p-invalid': emailError }" />
                            <small v-if="emailError" class="p-error">Email is required!</small>
                        </div>
                        <div class="field col-12">
                            <label for="TxtEmployeeStaffId">Staff ID</label>
                            <InputText id="TxtEmployeeStaffId" v-model="staffId" placeholder="Enter Staff ID" :class="{ 'p-invalid': staffIdError }" />
                            <small v-if="staffIdError" class="p-error">Staff ID is required!</small>
                        </div>
                        <div class="field col-12 md:col-12">
                            <label for="TxtEmployeePhoneNo">Contact No.</label>
                            <InputNumber id="TxtEmployeePhoneNo" v-model="phoneNo" :useGrouping="false" placeholder="Enter employee contact number" :class="{ 'p-invalid': phoneNoError }" />
                            <small v-if="phoneNoError" class="p-error">Contact No. is required!</small>
                        </div>
                        <div class="field col-12 md:col-12 mx-auto flex gap-2 button-group">
                            <Button type="button" label="Save" class="col-3 py-2" @click="BtnSaveEmployeeProfile" />
                            <Button type="button" severity="secondary" label="Cancel" class="py-2 col-3" @click="BtnCancelEmployeeProfile" />
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
