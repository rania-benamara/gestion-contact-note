<template>
  <Page>
    <ActionBar title="Ajouter Note" /> <!-- Titre de la page -->
    <StackLayout>
      <TextField v-model="contactId" hint="Contact ID" keyboardType="number" /> <!-- Champ pour l'ID du contact -->
      <TextField v-model="description" hint="Note Description" /> <!-- Champ pour la description de la note -->
      <Button text="Ajouter" @tap="addNote" /> <!-- Bouton pour ajouter la note -->
      <Label v-if="error" text="Error adding note" class="error" /> <!-- Message d'erreur si ajout échoue -->
      <Label v-if="success" text="Note ajouter avec succees!" class="success" /> <!-- Message de succès -->
      <Button text="Note" @tap="goBack" /> <!-- Bouton pour revenir à la page précédente -->
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios/dist/axios"; // Importation de la librairie Axios
import { ApplicationSettings } from "@nativescript/core"; // Importation des réglages de l'application

export default {
  data() {
    return {
      contactId: '',  // ID du contact
      description: '', // Description de la note
      error: null, // Stocke le message d'erreur
      success: null, // Stocke le message de succès
    };
  },
  methods: {
    async addNote() { // Méthode pour ajouter une note
      const token = ApplicationSettings.getString("userToken"); // Récupère le token de l'utilisateur
      try {
        const response = await axios.post(`http://10.0.2.2:3000/contacts/${this.contactId}/notes`, { // Envoie une requête POST
          contenu: this.description, // Contenu de la note
        }, {
          headers: {
            Authorization: token, // Ajoute le token dans les en-têtes
          },
        });
        this.success = response.data.message; // Stocke le message de succès
        this.error = null; // Réinitialise le message d'erreur
        // Réinitialise les champs après l'ajout réussi
        this.contactId = '';
        this.description = '';
      } catch (error) {
        console.error('Error adding note:', error); // Affiche l'erreur dans la console
        this.error = 'Error adding note. Please try again.'; // Affiche le message d'erreur
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
