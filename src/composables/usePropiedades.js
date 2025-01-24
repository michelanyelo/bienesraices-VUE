import { collection } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";
import { ref, computed } from "vue";

const hasPiscina = ref(false);

export default function usePropiedades() {

  const db = useFirestore();
  const propiedadesCollection = useCollection(collection(db, 'propiedades'));

  const propiedadesFiltradas = computed(() => {
    return hasPiscina.value ? propiedadesCollection.value.filter(propiedad => propiedad.alberca) : propiedadesCollection.value;
  });

  return {
    propiedadesCollection,
    propiedadesFiltradas,
    hasPiscina
  }
}
