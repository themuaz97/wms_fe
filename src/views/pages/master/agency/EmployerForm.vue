<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const agencyName = ref('');
const agencyAddress = ref('');
const agencyPhoneNo = ref('');

const agencyNameError = ref(false);
const agencyAddressError = ref(false);
const agencyPhoneNoError = ref(false);

const validate = () => {
    agencyNameError.value = !agencyName.value;
    agencyAddressError.value = !agencyAddress.value;
    agencyPhoneNoError.value = !agencyPhoneNo.value;
    return !agencyNameError.value && !agencyAddressError.value && !agencyPhoneNoError.value;
};

const BtnAgencyAdd = () => {
    if (validate()) {
        // Save the agency details
        router.push({ name: 'employerlist' });
    }
};

const BtnCancel = () => {
    router.push({ name: 'employerlist' });
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="col-12 md:col-12">
                    <h5>Add Agency</h5>
                    <div class="p-fluid formgrid grid">
                        <div class="field col-10 md:col-8 justify-center mx-auto max-w-lg">
                            <div class="field col-12 md:col-12">
                                <label for="TxtAgencyName">Name</label>
                                <InputText v-model="agencyName" id="TxtAgencyName" type="text" placeholder="Enter agency name" />
                                <small v-if="agencyNameError" class="p-error">Agency name is required!</small>
                            </div>
                            <div class="field col-12">
                                <label for="TxtAgencyAddress">Address</label>
                                <Textarea v-model="agencyAddress" id="TxtAgencyAddress" placeholder="Enter agency address" rows="4" />
                                <small v-if="agencyAddressError" class="p-error">Agency address is required!</small>
                            </div>
                            <div class="field col-12 md:col-12">
                                <label for="TxtAgencyPhoneNo">Contact No.</label>
                                <InputMask v-model="agencyPhoneNo" id="TxtAgencyPhoneNo" mask="(99)-9999999999" placeholder="(60)-1234567890" />
                                <small v-if="agencyPhoneNoError" class="p-error">Agency contact no. is required!</small>
                            </div>
                            <div class="field col-8 md:col-4 mx-auto flex gap-4">
                                <Button type="submit" label="Save" class="w-full" @click="BtnAgencyAdd" />
                                <Button type="button" severity="secondary" label="Cancel" class="w-full" @click="BtnCancel" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
