<script setup>
import usePropiedades from '@/composables/usePropiedades';
import { formatearPrecio } from '@/helpers/formatearPrecio';

const { propiedadesCollection } = usePropiedades();
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>

  <v-btn color="blue" variant="flat" :to="{ name: 'nueva-propiedad' }">
    Nueva Propiedad
  </v-btn>

  <v-card class="mx-auto mt-10 pa-5">
    <v-list>
      <v-list-item v-for="propiedad in propiedadesCollection" :key="propiedad.id">
        <!-- imagen -->
        <template v-slot:prepend>
          <v-list-item-media start>
            <img :src="`/${propiedad.imagen}.jpg`" alt="`Imagen de la propiedad ${propiedad.titulo}`" width="250">
          </v-list-item-media>
        </template>

        <!-- titulo -->
        <v-list-item-title>
          {{ propiedad.titulo }}
        </v-list-item-title>

        <!-- precio -->
        <v-list-item-subtitle>
          {{ formatearPrecio(propiedad.precio) }}
        </v-list-item-subtitle>

        <!-- acciones -->
        <template v-slot:append>
          <v-btn color="warning" flat class="mr-2" :to="{ name: 'editar-propiedad', params: { id: propiedad.id } }">
            Editar
          </v-btn>

          <v-btn color="error" flat>
            Eliminar
          </v-btn>
        </template>

      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped></style>
