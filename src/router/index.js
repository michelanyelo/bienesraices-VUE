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

// Guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

  if (requiresAuth) {
    const auth = useFirebaseAuth();

    try {
      await new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();
          user ? resolve(user) : reject(new Error('User not authenticated'));
        });
      });
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
