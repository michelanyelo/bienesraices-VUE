import { createRouter, createWebHistory } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/propiedades/:id',
      name: 'propiedad',
      component: () => import('@/views/PropiedadView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'propiedades',
          name: 'admin-propiedades',
          component: () => import('@/views/admin/AdminView.vue'),
        },
        {
          path: 'nueva',
          name: 'nueva-propiedad',
          component: () => import('@/views/admin/NuevaPropiedadView.vue'),
        },
        {
          path: 'editar/:id',
          name: 'editar-propiedad',
          component: () => import('@/views/admin/EditarPropiedadView.vue'),
        },
      ],
    },
  ],
});

// Función para verificar la autenticación
const checkAuth = () => {
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      user ? resolve(user) : reject(new Error('User not authenticated'));
    });
  });
};

// Guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

  if (requiresAuth) {
    try {
      await checkAuth();
      next();
    } catch (error) {
      console.error('Authentication error:', error.message);
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
