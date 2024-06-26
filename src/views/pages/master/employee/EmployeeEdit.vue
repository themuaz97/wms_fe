<script>
import { useRouter } from 'vue-router';
import EmployeeEditProfile from './EmployeeEditProfile.vue';
import EmployeeEditEmployment from './EmployeeEditEmployment.vue';

export default {
    name: 'EmployeeForm',
    components: { EmployeeEditProfile, EmployeeEditEmployment },
    setup() {
        const router = useRouter();
        const saveAgency = () => {
            router.push({ name: 'employeelist' });
        };

        const cancelAgency = () => {
            router.push({ name: 'employeelist' });
        };
        return {
            saveAgency,
            cancelAgency
        };
    }
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="col-12 md:col-12">
                    <h5>Edit Employee</h5>
                    <TabView>
                        <TabPanel header="Profile">
                            <EmployeeEditProfile />
                        </TabPanel>
                        <TabPanel header="Employment">
                            <EmployeeEditEmployment />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    </div>
</template>
