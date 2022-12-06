<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          App Temps
        </q-toolbar-title>
        <q-btn
          v-if="!user"
          to="/connexion"
          flat
          icon-right="account_circle"
          label="Se connecter"
          class="absolute-right"
        />

        <q-btn
          v-else
          @click="deconnecterUtilisateur"
          flat
          icon-right="account_circle"
          label="Se déconnecter"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header>
          Menu de navigation
        </q-item-label>
      <!-- Liens du menu principal -->
        <!-- Home page -->
        <q-item
          v-for="lien in liens"
          :key="lien.id"
          :to="lien.route"
          exact
          clickable
          class="text-dark"
        >
          <q-item-section avatar>
            <q-icon :name="lien.icone" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ lien.libelle }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-footer elevated>
      <q-tabs>
        <q-route-tab
          v-for="lien in liens"
          :key="lien.id"
          :to="lien.route"
          :icon="lien.icone"
          :label="lien.libelle"
          exact
        />
      </q-tabs>
    </q-footer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout',
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['deconnecterUtilisateur'])
  },
  data () {
    return {
      // Indique si le menu latéral est ouvert ou non.
      leftDrawerOpen: false,
      // Tableau des liens de l'application
      liens: [
        {
          id: 1,
          libelle: 'Accueil',
          icone: 'home',
          route: '/'
        },
        {
          id: 2,
          libelle: 'Capteurs',
          icone: '',
          route: '/capteur'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
/* Applique les règles de ce bloc uniquement aux écrans >= 768px */
@media screen and (min-width: 768px) {
  /* Cache les éléments avec la classe CSS q-footer */
  .q-footer {
    display: none;
  }
  /* Lien actif du menu latéral */
  .q-drawer {
    .q-router-link--exact-active {
      color:  #26A69A !important;
    }
  }
}
</style>
