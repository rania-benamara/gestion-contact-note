<template>
  <Page>
    <ActionBar title="Delete Contact" /> <!-- Titre de la page -->
    <StackLayout>
      <TextField v-model="contactId" hint="Contact ID" /> <!-- Champ pour l'ID du contact à supprimer -->
      <Button text="Supprimer" @tap="deleteContact" /> <!-- Bouton pour supprimer le contact -->
      <Label v-if="error" text="Error deleting contact" class="error" /> <!-- Message d'erreur si la suppression échoue -->
      <Label v-if="success" text="Contact supprimer avec succees!" class="success" /> <!-- Message de succès -->
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
      contactId: '', // ID du contact à supprimer
      error: null, // Stocke le message d'erreur
      success: null, // Stocke le message de succès
    };
  },
  methods: {
    async deleteContact() { // Méthode pour supprimer un contact
      const token = ApplicationSettings.getString("userToken"); // Récupère le token de l'utilisateur
      if (!this.contactId) { // Vérifie si l'ID du contact est fourni
        this.error = 'Please enter a Contact ID.'; // Affiche un message d'erreur si aucun ID n'est fourni
        this.success = null;
        return; // Sort de la fonction
      }

      try {
        const response = await axios.delete(`http://10.0.2.2:3000/contacts/${this.contactId}`, { // Envoie une requête DELETE
          headers: {
            Authorization: token, // Ajoute le token dans les en-têtes
          },
        });
        this.success = response.data.message; // Stocke le message de succès
        this.error = null; // Réinitialise le message d'erreur
        this.contactId = ''; // Réinitialise le champ après la suppression
      } catch (error) {
        console.error('Error deleting contact:', error); // Affiche l'erreur dans la console
        this.error = 'Error deleting contact. Please try again.'; // Affiche le message d'erreur
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
