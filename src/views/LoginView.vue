<script setup>
import { useForm, useField } from 'vee-validate';

const { handleSubmit } = useForm();

// estos son los campos que se van a validar. en usefield se debe especificar el dato que se espera del vmodel
const email = useField('email');
const password = useField('password');

</script>

<template>

  <v-card flat max-width="600" class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Iniciar Sesión
    </v-card-title>
    <v-card-subtitle class="text-h5">
      Inicia sesión con tu cuenta
    </v-card-subtitle>

    <v-form class="mt-5">
      <v-text-field type="email" label="Correo electrónico" required v-model="email.value.value"></v-text-field>
      <v-text-field type="password" label="Password" required v-model="password.value.value"></v-text-field>
      <v-btn block color="pink-accent-2">Iniciar Sesión</v-btn>
    </v-form>
  </v-card>
</template>
