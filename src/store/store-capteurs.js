import { api } from 'boot/axios'
import { afficherMessageErreur } from 'src/fonctions/messageErreur'

// State : données du magasin
const state = {
  capteurs: [],
  capteursCharges: false
}

const mutations = {
  setListeCapteurs (state, capteurs) {
    state.capteurs = capteurs
  },
  setCapteurCharges (state, valeur) {
    state.capteursCharges = valeur
  }
}

const actions = {
  getCapteursAPI: function ({ commit, rootState }) {
    commit('setCapteurCharges', false)
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.user.token }
    }
    api.get('/capteurs', config)
      .then(function (response) {
        commit('setListeCapteurs', response.data)
        commit('setCapteurCharges', true)
        console.log(response.data)
      })
      .catch(function (error) {
        afficherMessageErreur('Sensors couldn\'t be loaded !', Object.values(error?.response?.data ?? {}))
        throw error
      })
  },
  viderCapteurs ({ commit }) {
    commit('setListeCapteurs', [])
    commit('setCapteurCharges', false)
  }
}

const getters = {
  // Prend le state comme 1er paramètre
  capteurs: (state) => {
    return state.capteurs
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
