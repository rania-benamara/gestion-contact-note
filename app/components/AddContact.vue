<template>
  <Page>
    <ActionBar title="Ajouter Contact" /> <!-- Titre de la page -->
    <StackLayout>
      <TextField v-model="nom" hint="Nom" /> <!-- Champ pour le nom -->
      <TextField v-model="prenom" hint="Prénom" /> <!-- Champ pour le prénom -->
      <TextField v-model="email" hint="Email" keyboardType="email" /> <!-- Champ pour l'email -->
      <TextField v-model="telephone" hint="Téléphone" keyboardType="phone" /> <!-- Champ pour le téléphone -->
      <Button text="Ajouter" @tap="addContact" /> <!-- Bouton pour ajouter le contact -->
      <Label v-if="error" text="Error adding contact" class="error" /> <!-- Message d'erreur si ajout échoue -->
      <Label v-if="success" text="Contact ajouter avec succes" class="success" /> <!-- Message de succès -->
      <Button text="Retour" @tap="goBack" /> <!-- Bouton pour revenir à la page précédente -->
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios/dist/axios"; // Importation de la librairie Axios
import { ApplicationSettings } from "@nativescript/core"; // Importation des réglages de l'application

export default {
  data() {
    return {
      nom: '', // Stocke le nom
      prenom: '', // Stocke le prénom
      email: '', // Stocke l'email
      telephone: '', // Stocke le téléphone
      error: null, // Stocke le message d'erreur
      success: null, // Stocke le message de succès
    };
  },
  methods: {
    async addContact() { // Méthode pour ajouter un contact
      const token = ApplicationSettings.getString("userToken"); // Récupère le token de l'utilisateur
      try {
        const response = await axios.post('http://10.0.2.2:3000/contacts', { // Envoie une requête POST
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          telephone: this.telephone,
        }, {
          headers: {
            Authorization: token, // Ajoute le token dans les en-têtes
          },
        });
        this.success = response.data.message; // Stocke le message de succès
        this.error = null; // Réinitialise le message d'erreur
        // Réinitialise les champs après l'ajout réussi
        this.nom = '';
        this.prenom = '';
        this.email = '';
        this.telephone = '';
      } catch (error) {
        console.error('Error adding contact:', error); // Affiche l'erreur dans la console
        this.error = 'Error adding contact. Please try again.'; // Affiche le message d'erreur
        this.success = null; // Réinitialise le message de succès
      }
    },
    goBack() { // Méthode pour revenir en arrière
      this.$navigateBack(); // Navigue vers la page précédente
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.success {
  color: green;
}
</style>
