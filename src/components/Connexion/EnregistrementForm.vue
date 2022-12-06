<template>
  <q-form @submit.prevent="submitForm">
      <q-input
        autofocus
        ref="nomForm"
        label="Nom"
        type="texte"
        v-model="enregistrementForm.nom"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Veuillez renseigner votre nom.']"
        class="q-my-md"
        style="max-width: 50%"
      />

      <q-input
        ref="prenomForm"
        label="Prénom"
        type="texte"
        v-model="enregistrementForm.prenom"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Veuillez renseigner votre prénom.']"
        class="q-my-md"
      />
    <q-input
      ref="emailForm"
      label="E-mail"
      type="text"
      v-model="enregistrementForm.email"
      class="q-my-md"
      lazy-rules
      :rules="[ val => validateEmail (val) || 'Veuillez renseigner un e-mail valide.']"/>

    <q-input
      ref="passwordForm"
      label="Mot de passe"
      type="password"
      v-model="enregistrementForm.password"
      class="q-my-md"
      lazy-rules
      :rules="[ val => val.length >= 4 || 'Minimum 4 caractère']"/>
    <q-input
      type="password"
      outlined
      v-model="enregistrementForm.password_confirmation"
      label="Confirmer le mot de passe"
      class="q-my-md"
      :rules="[ val => val === enregistrementForm.password || 'Les mots de passe sont différents']"
      lazy-rules
    />

    <q-btn
      type="submit"
      color="primary"
      label="Créer un compte"
    />
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'EnregistrementForm',
  data () {
    return {
      enregistrementForm: {
        nom: '',
        prenom: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    ...mapActions('user', ['enregistrerUtilisateur']),
    submitForm () {
      this.enregistrerUtilisateur(this.enregistrementForm)
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
