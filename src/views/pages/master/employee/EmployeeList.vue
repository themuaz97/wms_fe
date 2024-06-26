<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { usePrimeVue } from 'primevue/config';

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const $primevue = usePrimeVue();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);
const BtnEmployeeImport = ref(false);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

// const onClearTemplatingUpload = (clear) => {
//     clear();
//     totalSize.value = 0;
//     totalSizePercent.value = 0;
// };

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const onTemplatedUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};

const BtnEmployeeDelete = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
        acceptClass: 'p-button-danger p-button-sm',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        }
    });
};

const BtnEmployeeAdd = () => {
    router.push({ name: 'employeeform' });
};

const BtnEmployeeEdit = (employee) => {
    router.push({ name: 'employeeedit', params: { DfEmployeeID: employee.DfEmployeeID } });
};

const agencies = ref([
    { DfEmployeeID: 1, DfEmployeeName: 'Suffian Bin Arifen', DfEmployeeEmail: 'suffian@xox.com.my', DfEmployeePhoneNo: '1234567890', DfEmployeeAgency: 'xox', DfEmployeePosition: 'Manager/OM', DfEmployeeYOW: '9 years, 5 months' },
    {
        DfEmployeeID: 2,
        DfEmployeeName: 'Syahrul Nizam bin Kamaruzaman',
        DfEmployeeEmail: 'syahrul.nizam@xox.com.my',
        DfEmployeePhoneNo: '1234567890',
        DfEmployeeAgency: 'xox',
        DfEmployeePosition: 'Asst Manager/PM',
        DfEmployeeYOW: '3 years, 4 months'
    },
    { DfEmployeeID: 3, DfEmployeeName: 'Lim Han Kit', DfEmployeeEmail: 'hk.lim@xox.com.my', DfEmployeePhoneNo: '1234567890', DfEmployeeAgency: 'xox', DfEmployeePosition: 'Asst Manager', DfEmployeeYOW: '6 years, 11 months' }
]);
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex justify-between items-center mb-4">
                    <div class="flex align-items-center w-full">
                        <h5 class="mb-0">Employee List</h5>
                        <div class="ml-auto flex align-items-center">
                            <Button label="Import" icon="pi pi-file-import" class="mr-3" @click="BtnEmployeeImport = true" />

                            <!-- import ui -->
                            <Dialog v-model:visible="BtnEmployeeImport" modal header="Import Employee" class="w-8 md:w-8">
                                <Toast />
                                <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true" accept=".xlsx,.xls,.csv" :maxFileSize="1000000" @select="onSelectedFiles">
                                    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                                        <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                                            <div class="flex gap-2">
                                                <Button @click="chooseCallback(uploadCallback)" icon="pi pi-file-excel" rounded outlined></Button>
                                                <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
                                                <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
                                            </div>
                                            <ProgressBar :value="totalSizePercent" :showValue="false" :class="['md:w-20rem h-1rem w-full md:ml-auto', { 'exceeded-progress-bar': totalSizePercent > 100 }]"
                                                ><span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span></ProgressBar
                                            >
                                        </div>
                                    </template>
                                    <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                        <div v-if="files.length > 0">
                                            <h5>Pending</h5>
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <div>
                                                        <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                                    </div>
                                                    <span class="font-semibold">{{ file.name }}</span>
                                                    <div>{{ formatSize(file.size) }}</div>
                                                    <Badge value="Pending" severity="warning" />
                                                    <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded severity="danger" />
                                                </div>
                                            </div>
                                        </div>

                                        <div v-if="uploadedFiles.length > 0">
                                            <h5>Completed</h5>
                                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                                <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                                    <div>
                                                       <!-- <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" /> -->
                                                    </div>
                                                    <span class="font-semibold">{{ file.name }}</span>
                                                    <div>{{ formatSize(file.size) }}</div>
                                                    <Badge value="Completed" class="mt-3" severity="success" />
                                                    <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded severity="danger" />
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #empty>
                                        <div class="flex align-items-center justify-content-center flex-column">
                                            <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
                                            <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                                        </div>
                                    </template>
                                </FileUpload>
                            </Dialog>
                            <Button label="Add Employee" icon="pi pi-plus" severity="primary" @click="BtnEmployeeAdd" />
                        </div>
                    </div>
                </div>

                <DataTable class="col-12 md:col-12" :value="agencies" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
                    <Column class="col-1" field="DfEmployeeID" header="ID" />
                    <Column class="col-2" field="DfEmployeeName" header="Name" />
                    <Column class="col-2" field="DfEmployeeEmail" header="Email" />
                    <Column class="col-1" field="DfEmployeePhoneNo" header="Phone No" />
                    <Column class="col-1" field="DfEmployeeAgency" header="Agency" />
                    <Column class="col-2" field="DfEmployeePosition" header="Position" />
                    <Column class="col-2" field="DfEmployeeYOW" header="Year of Working" />
                    <Column class="col-1" field="action" header="Action">
                        <template #body="slotProps">
                            <div class="flex justify-content-center">
                                <Button icon="pi pi-pencil" class="mr-2" severity="primary"  v-tooltip.top="'edit'" @click="BtnEmployeeEdit(slotProps.data)" />
                                <Toast />
                                <ConfirmPopup />
                                <Button @click="BtnEmployeeDelete($event)" icon="pi pi-trash" severity="danger"  v-tooltip.top="'delete'"></Button>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped>
.uploader-ui {
  border-width: 2px;
  border-style: solid;
  border-radius: 66px; /* This creates a fully rounded element */
  color: #6c757d;
}
</style>
