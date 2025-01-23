export const validationSchema = {
  titulo(value) {
    if (value?.length >= 6) return true;
    return 'El título debe tener al menos 6 caracteres.';
  },
  precio(value) {
    if (/^[0-9]+$/.test(value)) return true;
    return 'El precio debe ser un valor numérico válido.';
  },
  habitaciones(value) {
    if (value) return true;
    return 'Por favor, selecciona la cantidad de habitaciones.';
  },
  wc(value) {
    if (value) return true;
    return 'Por favor, selecciona la cantidad de baños.';
  },
  estacionamiento(value) {
    if (value) return true;
    return 'Por favor, selecciona la cantidad de estacionamientos.';
  },
  descripcion(value) {
    if (value) return true;
    return 'La descripción es obligatoria. Por favor, proporciona más detalles.';
  },
};

// export const imageSchema = {
//   imagen(value) {
//     if (value) return true;
//     return 'Es necesario subir al menos una imagen de la propiedad.';
//   },
// };
