<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/authStore';

const authStore = useAuthStore();
</script>

<template>
  <v-card elevation="3" max-width="1200" class="mx-auto">
    <v-layout>

      <v-app-bar color="blue-darken-3">
        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }">
            Bienes Raíces - VueFire
          </v-btn>
        </template>

        <template v-slot:append>
          <div v-if="authStore.isAuth">
            <v-btn :to="{ name: 'admin-propiedades' }">
              Admin Panel
            </v-btn>
            <v-btn @click="authStore.logout">
              Cerrar sesión
            </v-btn>
          </div>
          <div v-else>
            <v-btn :to="{ name: 'home' }">Inicio</v-btn>
            <v-btn :to="{ name: 'login' }">Iniciar sesión</v-btn>
          </div>
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped></style>
