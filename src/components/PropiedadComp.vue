<script setup>
defineProps({
  propiedad: {
    type: Object,
  },
  formatearPrecio: {
    type: Function,
  }
})
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
      <v-img :src="`/${propiedad.imagen}.jpg`" height="230" cover />
      <v-card-title>
        {{ propiedad.titulo }}
      </v-card-title>

      <v-card-text class="text-truncate">
        {{ propiedad.descripcion }}
      </v-card-text>

      <v-card-text class="text-h6 font-weight-bold">
        Precio: {{ formatearPrecio(propiedad.precio) }}
      </v-card-text>

      <template v-slot:actions>
        <v-btn block color="info" variant="tonal" :to="{ name: 'propiedad', params: { id: propiedad.id } }">Ver
          más</v-btn>
      </template>
    </v-card>
  </v-col>
</template>

<style scoped></style>
