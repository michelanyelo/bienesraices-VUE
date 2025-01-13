import { defineStore } from "pinia";
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  // mensajes de errores de firebase a español
  const errorMessages = {
    'auth/invalid-credential': 'El usuario o la contraseña son incorrectos',
  };

  // firebase
  const auth = useFirebaseAuth();
  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials)
      })
      .catch((error) => {
        // Obtener el mensaje de error traducido o usar un mensaje genérico
        const errorMessage = errorMessages[error.code] || 'Ocurrió un error inesperado';
        console.error(errorMessage);
      })
  }

  return {
    login
  }
})
