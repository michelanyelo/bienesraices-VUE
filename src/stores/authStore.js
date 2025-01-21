import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {
  const errorMessage = ref('');
  // mensajes de errores de firebase a español
  const errorMessages = {
    'auth/invalid-credential': 'El usuario o la contraseña son incorrectos',
  };

  const router = useRouter();
  const authUser = ref(null);
  // vuefire
  const auth = useFirebaseAuth();

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user;
      }
    })
  });

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        authUser.value = user;
        router.push({ name: 'admin-propiedades' });
      })
      .catch((error) => {
        // Obtener el mensaje de error traducido o usar un mensaje genérico
        errorMessage.value = errorMessages[error.code] || 'Ocurrió un error inesperado';
      })
  }

  const logout = () => {
    signOut(auth).then(() => {
      authUser.value = null;
      router.push({ name: 'login' });
    }).catch(error => {
      console.error(error);
    })
  }

  const hasError = computed(() => {
    return errorMessage.value
  })

  const isAuth = computed(() => {
    return authUser.value;
  })

  return {
    login,
    logout,
    hasError,
    errorMessage,
    isAuth
  }
})
