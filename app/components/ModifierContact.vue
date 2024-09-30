<template>
  <Page>
    <ActionBar title="Modifier Contact" /> <!-- Titre de la page -->
    <StackLayout>
      <TextField v-model="contactId" hint="Contact ID" /> <!-- Champ pour l'ID du contact -->
      <TextField v-model="nom" hint="Nom" /> <!-- Champ pour le nom du contact -->
      <TextField v-model="prenom" hint="Prénom" /> <!-- Champ pour le prénom du contact -->
      <TextField v-model="email" hint="Email" keyboardType="email" /> <!-- Champ pour l'email -->
      <TextField v-model="telephone" hint="Téléphone" keyboardType="phone" /> <!-- Champ pour le téléphone -->
      <Button text="Modifier Contact" @tap="modifyContact" /> <!-- Bouton pour modifier le contact -->
      <Label v-if="error" text="Error modifying contact" class="error" /> <!-- Message d'erreur si la modification échoue -->
      <Label v-if="success" text="Contact modifier avec succes!" class="success" /> <!-- Message de succès -->
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
      contactId: '', // ID du contact à modifier
      nom: '', // Nom du contact
      prenom: '', // Prénom du contact
      email: '', // Email du contact
      telephone: '', // Téléphone du contact
      error: null, // Stocke le message d'erreur
      success: null, // Stocke le message de succès
    };
  },
  methods: {
    async modifyContact() { // Méthode pour modifier un contact
      const token = ApplicationSettings.getString("userToken"); // Récupère le token de l'utilisateur
      console.log('Token:', token); // Log du token

      if (!this.contactId) { // Vérifie si l'ID du contact est fourni
        this.error = 'Please enter a Contact ID.'; // Affiche un message d'erreur si l'ID est manquant
        this.success = null;
        return; // Sort de la fonction
      }

      try {
        const response = await axios.put(`http://10.0.2.2:3000/contacts/${this.contactId}`, { // Envoie une requête PUT pour modifier le contact
          nom: this.nom, // Nouveau nom
          prenom: this.prenom, // Nouveau prénom
          email: this.email, // Nouvel email
          telephone: this.telephone, // Nouveau téléphone
        }, {
          headers: {
            Authorization: token, // Ajoute le token dans les en-têtes
          },
        });

        this.success = response.data.message; // Stocke le message de succès
        this.error = null; // Réinitialise le message d'erreur

        // Réinitialise les champs après modification réussie
        this.contactId = '';
        this.nom = '';
        this.prenom = '';
        this.email = '';
        this.telephone = '';
      } catch (error) {
        console.error('Error modifying contact:', error.response ? error.response.data : error.message); // Log l'erreur
        this.error = error.response ? error.response.data.error || 'Error modifying contact. Please try again.' : 'Error modifying contact.'; // Affiche le message d'erreur
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
