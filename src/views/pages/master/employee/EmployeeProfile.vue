<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    name: 'EmployeeProfile',
    components: {
        InputText,
        Button
    },
    setup() {
        const router = useRouter();

        const name = ref('');
        const email = ref('');
        const phoneNo = ref();
        const nameError = ref(false);
        const emailError = ref(false);
        const phoneNoError = ref(false);

        const BtnSaveEmployeeProfile = () => {
            nameError.value = !name.value;
            emailError.value = !email.value;
            phoneNoError.value = !phoneNo.value;

            if (name.value && email.value && phoneNo.value) {
                router.push({ name: 'employeelist' });
            }
        };

        const BtnCancelEmployeeProfile = () => {
            router.push({ name: 'employeelist' });
        };

        return {
            name,
            email,
            phoneNo,
            nameError,
            emailError,
            phoneNoError,
            BtnSaveEmployeeProfile,
            BtnCancelEmployeeProfile
        };
    }
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
                        <div class="field col-12">
                            <label for="TxtEmployeeEmail">Email</label>
                            <InputText id="TxtEmployeeEmail" v-model="email" placeholder="Enter employee email address" :class="{ 'p-invalid': emailError }" />
                            <small v-if="emailError" class="p-error">Email is required!</small>
                        </div>
                        <div class="field col-12 md:col-12">
                            <label for="TxtEmployeePhoneNo">Contact No.</label>
                            <InputNumber id="TxtEmployeePhoneNo" v-model="phoneNo" :useGrouping="false" placeholder="Enter employee contact number" :class="{ 'p-invalid': phoneNoError }" />
                            <small v-if="phoneNoError" class="p-error">Contact No. is required!</small>
                        </div>
                        <div class="field col-8 md:col-4 mx-auto flex gap-4">
                            <Button type="button" label="Save" class="w-full" @click="BtnSaveEmployeeProfile" />
                            <Button type="button" severity="secondary" label="Cancel" class="w-full" @click="BtnCancelEmployeeProfile" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.p-invalid {
    border-color: var(--red-500);
}
</style>
