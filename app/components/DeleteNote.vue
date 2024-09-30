<template>
  <Page>
    <ActionBar title="Supprimer Note" /> <!-- Titre de la page -->
    <StackLayout>
      <TextField v-model="noteId" hint="Note ID" keyboardType="number" /> <!-- Champ pour l'ID de la note à supprimer -->
      <Button text="Supprimer" @tap="deleteNote" /> <!-- Bouton pour supprimer la note -->
      <Label v-if="error" text="Error deleting note" class="error" /> <!-- Message d'erreur si la suppression échoue -->
      <Label v-if="success" text="Note supprimer avec succees!" class="success" /> <!-- Message de succès -->
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
      noteId: '',          // ID de la note à supprimer
      error: null,        // Stocke le message d'erreur
      success: null,      // Stocke le message de succès
    };
  },
  methods: {
    async deleteNote() { // Méthode pour supprimer une note
      const token = ApplicationSettings.getString("userToken"); // Récupère le token de l'utilisateur
      try {
        const response = await axios.delete(`http://10.0.2.2:3000/notes/${this.noteId}`, { // Envoie une requête DELETE
          headers: {
            Authorization: token, // Ajoute le token dans les en-têtes
          },
        });
        this.success = response.data.message; // Stocke le message de succès
        this.error = null; // Réinitialise le message d'erreur
        this.noteId = ''; // Réinitialise le champ après la suppression
      } catch (error) {
        console.error('Error deleting note:', error); // Affiche l'erreur dans la console
        this.error = 'Error deleting note. Please try again.'; // Affiche le message d'erreur
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
