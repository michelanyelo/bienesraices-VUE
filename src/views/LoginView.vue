<script setup>
import { useForm, useField } from 'vee-validate';
import { loginSchema as validationSchema } from '../schemas/loginSchema.js';
import { useAuthStore } from '../stores/authStore.js';

// veevalidate
const { handleSubmit } = useForm({ validationSchema });
// pinia
const auth = useAuthStore();
// estos son los campos que se van a validar. en usefield se debe especificar el dato que se espera del vmodel
const email = useField('email');
const password = useField('password');

const onSubmit = handleSubmit((values) => {
  auth.login(values);
})

</script>

<template>

  <v-card flat max-width="600" class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Iniciar Sesión
    </v-card-title>
    <v-card-subtitle class="text-h5">
      Inicia sesión con tu cuenta
    </v-card-subtitle>

    <!-- vuetify alert -->
    <v-alert v-if="auth.hasError" :title="auth.errorMessage" type="error" variant="tonal" class="my-5"></v-alert>


    <v-form class="mt-5">
      <v-text-field type="email" label="Correo electrónico" class="mb-5" required v-model="email.value.value"
        :error-messages="email.errorMessage.value"></v-text-field>
      <v-text-field type="password" label="Password" class="mb-5" required v-model="password.value.value"
        :error-messages="password.errorMessage.value"></v-text-field>
      <v-btn block color="pink-accent-2" @click="onSubmit">Iniciar Sesión</v-btn>
    </v-form>
  </v-card>
</template>
