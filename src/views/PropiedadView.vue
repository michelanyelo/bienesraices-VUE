<script setup>
import { watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { doc } from 'firebase/firestore';
import { useDocument, useFirestore } from 'vuefire';
import { formatearPrecio } from '../helpers/formatearPrecio.js';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import useLocationMap from '@/composables/useLocationMap';

const route = useRoute();
const id = route.params.id;
const db = useFirestore();
const docRef = doc(db, 'propiedades', id);
const propiedad = useDocument(docRef);
const { zoom, center } = useLocationMap();

watch(propiedad, (propiedad) => {
  if (propiedad) {
    center.value = propiedad.ubicacion;
  }
}, { immediate: true });

const titulo = computed(() => propiedad.value?.titulo);
const precio = computed(() => formatearPrecio(propiedad.value?.precio));
const wc = computed(() => propiedad.value?.wc);
const estacionamiento = computed(() => propiedad.value?.estacionamiento);
const habitaciones = computed(() => propiedad.value?.habitaciones);
const descripcion = computed(() => propiedad.value?.descripcion);
</script>

<template>
  <v-card flat>
    <v-card-title class="mt-5 text-h3 text-center py-5 font-weight-bold">
      {{ titulo }}
    </v-card-title>

    <v-img :src="`/${propiedad?.imagen}.jpg`" height="550" cover />

    <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row align-center">
      <v-card-text>
        Precio:
        <span class="font-weight-bold "> {{ precio }}</span>
      </v-card-text>

      <v-card-text>
        Baños:
        <span class="font-weight-bold "> {{ wc }}</span>
      </v-card-text>

      <v-card-text>
        Estacionamiento:
        <span class="font-weight-bold "> {{ estacionamiento }}</span>
      </v-card-text>

      <v-card-text>
        Habitaciones:
        <span class="font-weight-bold "> {{ habitaciones }}</span>
      </v-card-text>
    </div>

    <v-row>
      <v-col cols="12" md="8">
        <div class="text-pre-wrap py-10 text-h6">
          {{ descripcion }}
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <div class="py-10" style="height: 600px;">
          <LMap v-if="propiedad" v-model:zoom="zoom" :center="center" :use-global-leaflet="false"
            :key="center.toString()">
            <LMarker :lat-lng="center">
              <LPopup>{{ titulo }}</LPopup>
            </LMarker>
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
        </div>
      </v-col>
    </v-row>


  </v-card>
</template>

<style scoped>
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>
