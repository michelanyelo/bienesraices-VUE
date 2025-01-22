import { ref } from 'vue';

export default function useLocationMap() {

  const zoom = ref(12);
  const center = ref([-33.4514073, -70.6457466]);

  return {
    zoom,
    center
  }
}
