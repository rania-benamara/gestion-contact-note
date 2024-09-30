<template>
  <Page>
    <ActionBar title="Modifier Note" /> <!-- Titre de la page -->
    <StackLayout>
      <TextField v-model="noteId" hint="Note ID" keyboardType="number" /> <!-- Champ pour l'ID de la note -->
      <TextField v-model="newDescription" hint="New Note Description" /> <!-- Champ pour la nouvelle description de la note -->
      <Button text="Modifier" @tap="modifyNote" /> <!-- Bouton pour modifier la note -->
      <Label v-if="error" text="Error modifying note" class="error" /> <!-- Message d'erreur si la modification échoue -->
      <Label v-if="success" text="Note modifier avec succees!" class="success" /> <!-- Message de succès -->
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
      noteId: '', // ID de la note à modifier
      newDescription: '', // Nouvelle description de la note
      error: null, // Stocke le message d'erreur
      success: null, // Stocke le message de succès
    };
  },
  methods: {
    async modifyNote() { // Méthode pour modifier une note
      const token = ApplicationSettings.getString("userToken"); // Récupère le token de l'utilisateur

      try {
        const response = await axios.put(`http://10.0.2.2:3000/notes/${this.noteId}`, { // Envoie une requête PUT pour modifier la note
          contenu: this.newDescription, // Nouvelle description à mettre à jour
        }, {
          headers: {
            Authorization: token, // Ajoute le token dans les en-têtes
          },
        });

        this.success = response.data.message; // Stocke le message de succès
        this.error = null; // Réinitialise le message d'erreur

        // Réinitialise les champs après modification réussie
        this.noteId = '';
        this.newDescription = '';
      } catch (error) {
        console.error('Error modifying note:', error); // Log l'erreur
        this.error = 'Error modifying note. Please try again.'; // Affiche un message d'erreur
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
