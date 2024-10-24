
const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ],
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/RegisterComponent.vue') }
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/LoginComponent.vue') }
    ],
  },
  {
    path: '/habits',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('components/HabitHomeComponent.vue') }
    ],
  },
  {
    path: '/create-habit',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: "CreateHabit", component: () => import('components/EditHabitComponent.vue') }
    ],
  },
  {
    path: '/get-habit',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: ':id', name: "EditHabit", component: () => import('components/EditHabitComponent.vue') }
    ],
  },

  // Always leave this as the last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes


