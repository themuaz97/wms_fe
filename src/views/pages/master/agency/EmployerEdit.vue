<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const BtnSaveAgency = () => {
    router.push({ name: 'employerlist' });
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
                    <h5>Edit Agency</h5>
                    <div class="p-fluid formgrid grid flex justify-content-center">
                        <div class="field col-10 md:col-8 max-w-lg">
                            <div class="field col-12 md:col-12">
                                <label for="TxtAgencyName">Name</label>
                                <InputText id="TxtAgencyName" type="text" placeholder="Enter agency name" />
                            </div>
                            <div class="field col-12">
                                <label for="TxtAgencyAddress">Address</label>
                                <Textarea id="TxtAgencyAddress" placeholder="Enter agency address" rows="4" />
                            </div>
                            <div class="field col-12">
                                <label for="TxtAgencyPhoneNo">Contact No.</label>
                                <InputNumber id="TxtAgencyPhoneNo" :useGrouping="false" placeholder="Enter agency contact number" />
                            </div>
                            <div class="button-group col-12 flex justify-content-center gap-2">
                                <Button type="submit" label="Save" class="col-3 py-1" @click="BtnSaveAgency" />
                                <Button type="button" severity="secondary" label="Cancel" class="col-3 py-1" @click="BtnCancel" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ``
    </div>
</template>

<style scoped>
.button-group {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

@media (max-width: 500px) {
    .button-group {
        flex-direction: column;
        align-items: center;
    }

    .button-group .p-button {
        width: 100%;
    }
}
</style>
