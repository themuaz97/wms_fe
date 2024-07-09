<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import router from '../../../router';
import { useToast } from 'primevue/usetoast';

const { layoutConfig } = useLayout();
const toast = useToast();

const email = ref('');
const password = ref('');
const checked = ref(false);

const emailError = ref(false);
const passwordError = ref(false);

const BtnForgotPassword = () => {
    router.push({ name: 'forgotpassword' });
};

const BtnLogin = () => {
    emailError.value = !email.value;
    passwordError.value = !password.value;
    if (email.value && password.value) {
        router.push({ name: 'dashboard' });
        console.log('Login success');
        toast.add({ severity: 'success', summary: 'Login Success', detail: 'Welcome, Muaz!', life: 3000 });
    }
};

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-dark' : 'logo-dark'}.svg`;
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="XOX logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <!-- <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" /> -->
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Muaz!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full" style="padding: 1rem" v-model="email" :class="{ 'p-invalid': emailError }" />
                        <small v-if="emailError" class="p-error">Email is required!</small>

                        <label for="password1" class="block text-900 font-medium text-xl mb-2 mt-5">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full" inputClass="w-full" :inputStyle="{ padding: '1rem' }" :class="{ 'p-invalid': passwordError }"></Password>
                        <small v-if="passwordError" class="p-error">Password is required!</small>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <Button class="font-medium ml-2 text-right pr-0 cursor-pointer" label="Forgot password?" @click="BtnForgotPassword" style="color: var(--primary-color)" link />
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="BtnLogin"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
  }

  .pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
  }
</style>
