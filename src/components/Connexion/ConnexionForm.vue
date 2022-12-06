<template>
  <q-form @submit.prevent="submitForm">
    <q-input
      autofocus
      ref="emailForm"
      label="E-mail *"
      type="email"
      v-model="loginForm.email"
      class="q-my-md"
      :rules="[val => validateEmail(val) || 'Veuillez renseigner votre e-mail.']"
    />

    <q-input
      ref="passwordForm"
      label="Mot de passe"
      type="password"
      outlined
      v-model="loginForm.password"
      class="q-my-md"
      :rules="[ val => val && val.length > 0 || 'Veuillez renseigner votre mot de passe.']"
    />

    <q-btn
      type="submit"
      color="primary"
      label="Se connecter"
    />
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ConnexionForm',
  data () {
    return {
      loginForm: { // Formulaire de connexion
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('user', ['connecterUtilisateur']),

    /**
     * Appelle l'action de login du store
     */
    submitForm () {
      // Retourne un cookie CSRF afin de protéger le formulaire
      // await api.get('https://api-cafe.divtec.me/sanctum/csrf-cookie', { withCredentials: true }).then(async response => {
      //   await console.log(response.headers.get('set-cookies'))
      // })
      this.connecterUtilisateur(this.loginForm)
    },
    validateEmail (email) {
      // Source : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  }
}
</script>

<style>

</style>
