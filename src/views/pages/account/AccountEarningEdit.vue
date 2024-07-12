<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

const router = useRouter();

const bankName = ref('');
const accountNo = ref('');
const basicSalary = ref(null);
const bankNameError = ref(false);
const accountNoError = ref(false);
const basicSalaryError = ref(false);

const BtnSaveEmployeeProfile = () => {
    bankNameError.value = !bankName.value;
    accountNoError.value = !accountNo.value;
    basicSalaryError.value = !basicSalary.value;

    if (bankName.value && accountNo.value && basicSalary.value) {
        router.push({ name: 'dashboard' });
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
                            <label for="TxtBankName">Bank Name</label>
                            <InputText id="TxtBankName" type="text" v-model="bankName" placeholder="Enter bank name" :class="{ 'p-invalid': bankNameError }" />
                            <small v-if="bankNameError" class="p-error">Bank Name is required!</small>
                        </div>
                        <div class="field col-12">
                            <label for="TxtAccountNo">Account No</label>
                            <InputText id="TxtAccountNo" v-model="accountNo" placeholder="Enter account number" :class="{ 'p-invalid': accountNoError }" />
                            <small v-if="accountNoError" class="p-error">Account No is required!</small>
                        </div>
                        <div class="field col-12 md:col-12">
                            <label for="TxtBasicSalary">Basic Salary</label>
                            <InputNumber id="TxtBasicSalary" v-model="basicSalary" :useGrouping="false" placeholder="Enter basic salary" :class="{ 'p-invalid': basicSalaryError }" />
                            <small v-if="basicSalaryError" class="p-error">Basic Salary is required!</small>
                        </div>
                        <div class="field col-12 md:col-12 mx-auto flex gap-2 button-group">
                            <Button type="button" label="Save" class="py-2 col-3" @click="BtnSaveEmployeeProfile" />
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
