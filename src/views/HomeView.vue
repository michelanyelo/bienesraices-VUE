<script setup>
import usePropiedades from '@/composables/usePropiedades';
import PropiedadComp from '@/components/PropiedadComp.vue';

const { propiedadesCollection, formatearPrecio } = usePropiedades();
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5">Nuestras Propiedades</h1>

  <v-card flat class="py-10">
    <v-row>
      <PropiedadComp v-for="propiedad in propiedadesCollection" :key="propiedad.id" :propiedad="propiedad"
        :formatearPrecio="formatearPrecio" />
    </v-row>
  </v-card>
</template>
