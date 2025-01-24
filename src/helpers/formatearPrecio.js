export const formatearPrecio = (price) => Number(price).toLocaleString('es-ES', {
  style: 'currency',
  currency: 'CLP',
})
