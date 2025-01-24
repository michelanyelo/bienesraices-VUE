import { ref } from 'vue';

export default function useLocationMap() {
  const zoom = ref(12);
  const center = ref([-33.4514073, -70.6457466]);

  function pin(e) {
    const marker = e.target.getLatLng();
    center.value = [marker.lat, marker.lng];
  }

  return {
    zoom,
    center,
    pin,
  };
}
