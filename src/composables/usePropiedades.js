import { collection, doc, deleteDoc } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";
import { ref, computed } from "vue";

const hasPiscina = ref(false);

export default function usePropiedades() {

  const db = useFirestore();
  const propiedadesCollection = useCollection(collection(db, 'propiedades'));

  async function deletePropiedad(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      const docRef = doc(db, 'propiedades', id);
      await deleteDoc(docRef);
    }
  }

  const propiedadesFiltradas = computed(() => {
    return hasPiscina.value ? propiedadesCollection.value.filter(propiedad => propiedad.alberca) : propiedadesCollection.value;
  });

  return {
    propiedadesCollection,
    propiedadesFiltradas,
    hasPiscina,
    deletePropiedad
  }
}
