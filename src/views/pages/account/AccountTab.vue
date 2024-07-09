<script setup>
import AccountProfileEdit from './AccountProfileEdit.vue';
import AccountEmploymentEdit from './AccountEmploymentEdit.vue';
import AccountEarningEdit from './AccountEarningEdit.vue';
import AccountSettingEdit from './AccountSettingEdit.vue';

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="col-12 md:col-12">
                    <h5>Account Details</h5>
                    <TabView>
                        <TabPanel header="Profile">
                            <AccountProfileEdit />
                        </TabPanel>
                        <TabPanel header="Employment">
                            <AccountEmploymentEdit />
                        </TabPanel>
                        <TabPanel header="Earning">
                            <AccountEarningEdit />
                        </TabPanel>
                        <TabPanel header="Settings">
                            <AccountSettingEdit />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    </div>
</template>
