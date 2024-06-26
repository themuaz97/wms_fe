<script>
import { useRouter } from 'vue-router';

export default {
    name: 'AgencyForm',
    components: { },
    setup() {
        const router = useRouter();
        const BtnSaveAgency = () => {
            router.push({ name: 'employerlist' });
        };
        const BtnCancel = () => {
            router.push({ name: 'employerlist' });
        };
        return {
            BtnSaveAgency,
            BtnCancel
        };
    }
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="col-12 md:col-12">
                    <h5>Edit Agency</h5>
                    <div class="p-fluid formgrid grid">
                        <div class="field col-10 md:col-8 justify-center mx-auto max-w-lg">
                            <div class="field col-12 md:col-12">
                                <label for="TxtAgencyName">Name</label>
                                <InputText id="TxtAgencyName" type="text" placeholder="Enter agency name"/>
                            </div>
                            <div class="field col-12">
                                <label for="TxtAgencyAddress">Address</label>
                                <Textarea id="TxtAgencyAddress" placeholder="Enter agency address" rows="4" />
                            </div>
                            <div class="field col-12 md:col-12">
                                <label for="TxtAgencyPhoneNo">Contact No.</label>
                                <InputMask id="TxtAgencyPhoneNo" mask="(99)-9999999999" placeholder="(60)-1234567890" />
                            </div>
                            <div class="field col-8 md:col-4 mx-auto flex gap-4">
                                <Button type="submit" label="Save" class="w-full" @click="BtnSaveAgency" />
                                <Button type="button" severity="secondary" label="Cancel" class="w-full" @click="BtnCancel" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
