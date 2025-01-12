import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const errorMessage = ref('');
  // mensajes de errores de firebase a español
  const errorMessages = {
    'auth/invalid-credential': 'El usuario o la contraseña son incorrectos',
  };

  const authUser = ref({});
  // firebase
  const auth = useFirebaseAuth();
  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        authUser.value = user;
        console.log(authUser.value);
      })
      .catch((error) => {
        // Obtener el mensaje de error traducido o usar un mensaje genérico
        errorMessage.value = errorMessages[error.code] || 'Ocurrió un error inesperado';
      })
  }

  const hasError = computed(() => {
    return errorMessage.value
  })

  return {
    login,
    hasError,
    errorMessage
  }
})
