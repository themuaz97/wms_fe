<script setup>
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const confirm = useConfirm();
const toast = useToast();

const BtnPositionStsAdd = ref(false);
const BtnPositionStsEdit = ref(false);

const newPositionSts = ref('');
const editPositionSts = ref('');
const newPositionStsError = ref(false);
const editPositionStsError = ref(false);

const positionstatus = ref([
    {
        DfPositionStsID: 1,
        DfPositionSts: 'Permanent'
    },
    {
        DfPositionStsID: 2,
        DfPositionSts: 'Contract'
    }
]);

const BtnPositionStsDelete = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this position status?',
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

const saveNewPositionSts = () => {
    if (newPositionSts.value.trim() === '') {
        newPositionStsError.value = true;
        return;
    }
    positionstatus.value.push({
        DfPositionStsID: positionstatus.value.length + 1,
        DfPositionSts: newPositionSts.value
    });
    newPositionSts.value = '';
    BtnPositionStsAdd.value = false;
    newPositionStsError.value = false;
};

const saveEditPositionSts = () => {
    if (editPositionSts.value.trim() === '') {
        editPositionStsError.value = true;
        return;
    }
    // Assuming you have a way to determine which position status to edit
    // Update the appropriate position status
    BtnPositionStsEdit.value = false;
    editPositionStsError.value = false;
};
</script>

<template>
    <div class="card">
        <div class="flex justify-content-end mb-3">
            <Button icon="pi pi-plus" label="Add Position Status" @click="BtnPositionStsAdd = true" />
        </div>
        <Dialog v-model:visible="BtnPositionStsAdd" modal header="Add Position Status" class="col-6 md:col-4">
            <div class="flex flex-column gap-3 mb-3">
                <label for="DfPositionStsAdd" class="font-semibold w-6rem">Position Status</label>
                <InputText id="DfPositionStsAdd" class="flex-auto" autocomplete="off" v-model="newPositionSts" />
                <small v-if="newPositionStsError" class="p-error">Position status is required!</small>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="BtnPositionStsAdd = false"></Button>
                <Button type="button" label="Save" @click="saveNewPositionSts"></Button>
            </div>
        </Dialog>
        <DataTable :value="positionstatus" class="md:col-12" tableStyle="min-width: 50rem">
            <Column class="col-1" field="DfPositionStsID" header="Id"></Column>
            <Column class="col-9" field="DfPositionSts" header="Position Status"></Column>
            <Column class="col-1" field="action" header="Action">
                <template #body="">
                    <div class="flex justify-content-center">
                        <Button icon="pi pi-pencil" class="mr-2" severity="primary" v-tooltip.top="'edit'" @click="BtnPositionStsEdit = true" />

                        <Dialog v-model:visible="BtnPositionStsEdit" modal header="Edit Position Status" class="col-6 md:col-4">
                            <div class="flex flex-column gap-3 mb-3">
                                <label for="DfPositionStsEdit" class="font-semibold w-6rem">Position Status</label>
                                <InputText id="DfPositionStsEdit" class="flex-auto" autocomplete="off" v-model="editPositionSts" />
                                <small v-if="editPositionStsError" class="p-error">Position status is required!</small>
                            </div>
                            <div class="flex justify-content-end gap-2">
                                <Button type="button" label="Cancel" severity="secondary" @click="BtnPositionStsEdit = false"></Button>
                                <Button type="button" label="Save" @click="saveEditPositionSts"></Button>
                            </div>
                        </Dialog>
                        <Toast />
                        <ConfirmPopup></ConfirmPopup>
                        <Button @click="BtnPositionStsDelete($event)" icon="pi pi-trash" severity="danger" v-tooltip.top="'delete'"></Button>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>