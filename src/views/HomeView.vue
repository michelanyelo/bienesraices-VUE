<script setup>
import usePropiedades from '@/composables/usePropiedades';
import PropiedadComp from '@/components/PropiedadComp.vue';
import { formatearPrecio } from '@/helpers/formatearPrecio';

const { hasPiscina, propiedadesFiltradas } = usePropiedades();
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5">Nuestras Propiedades</h1>

  <v-card flat class="py-10">
    <v-card-title class="text-h5">
      Búsqueda: <v-checkbox label="Tiene piscina" v-model="hasPiscina" />
    </v-card-title>
    <v-row>
      <PropiedadComp v-for="propiedad in propiedadesFiltradas" :key="propiedad.id" :propiedad="propiedad"
        :formatearPrecio="formatearPrecio" />
    </v-row>
  </v-card>
</template>
