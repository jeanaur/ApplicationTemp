const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'connexion', component: () => import('pages/PageConnexion.vue') },
      { path: 'capteur', component: () => import('pages/PageCapteurs.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
