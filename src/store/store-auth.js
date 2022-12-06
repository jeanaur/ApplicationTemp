import { api } from 'boot/axios'
import { Loading, LocalStorage, Notify } from 'quasar'

// State : données du magasin
const state = {
  user: null,
  token: null
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}

/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  /**
   * Crée un compte utilisateur
   * @param commit Permet d'appeler une mutation pour mettre à jour le state
   * @param payload Contient le corps de la requête
   */
  async enregistrerUtilisateur ({ commit, dispatch }, payload) {
    Loading.show()
    await api.post('/newuser', payload)
      .then(response => {
        dispatch('setUser', response.data)
        Notify.create({
          color: 'green',
          message: response.data.message
        })
      })
      .catch(function (error) {
        Loading.hide()
        Notify.create({
          color: 'red',
          message: error.response.data.error
        })
      })
  },
  /**
   * Authentifie l'utilisateur, puis récupère le token de connexion
   * @param commit Permet d'appeler une mutation pour mettre à jour le state
   * @param payload Contient le corps de la requête
   */
  async connecterUtilisateur ({ commit, dispatch }, payload) {
    Loading.show()
    await api.post('/login', payload)
      .then(async response => {
        Loading.hide()
        dispatch('setUser', response.data)
      })
      .catch(function (error) {
        Loading.hide()
        Notify.create({
          color: 'red',
          message: error.response.data.error
        })
      })
  },
  async setUser ({ commit, dispatch, state }, data) {
    // Sauvegarde, commite, les données dans le magasin
    await commit('setUser', data.user)
    await commit('setToken', data.access_token)
    // Sauvegarde les données de l'utilisateur dans le localStorage
    LocalStorage.set('user', state.user)
    LocalStorage.set('token', state.token)
    // Récupération les capteurs de l'utilisateur
    dispatch('capteur/getListeCapteurs', null, { root: true })
    // Redirige l'utilisateur vers la page des tâches
    this.$router.push('/')
    // Cache la fenêtre de chargement
    Loading.hide()
  },
  async deconnecterUtilisateur ({ commit, state }) {
    Loading.show()
    const that = this
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }
    // Déconnexion de l'API
    await api.post('/logout', {}, config)
      .catch(function (error) {
        Notify.create({
          color: 'red',
          message: error.response.data.error
        })
      })
      .finally(function () {
        // Réinitialise user et token
        commit('setUser', null)
        commit('setToken', null)
        // Vide le locaStorage
        LocalStorage.clear()
        // Redirige l'utilisateur vers la page de connexion
        that.$router.push('/connexion')
        // location.reload() // recharge la page du navigateur
        Loading.hide()
      })
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace à notre objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
