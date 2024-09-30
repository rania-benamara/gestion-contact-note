<template>
  <Page>
    <ActionBar title="Notes" /> <!-- Titre de la page -->
    <StackLayout>
      <Label text="Notes List" fontSize="20" fontWeight="bold" /> <!-- Titre de la liste des notes -->
      <Label v-if="loading" text="Loading..." /> <!-- Affiche "Loading..." pendant le chargement -->
      <Label :text="'Notes Count: ' + notes.length" /> <!-- Affiche le nombre de notes -->
      <ScrollView height="400"> <!-- Défilement pour la liste des notes -->
        <StackLayout>
          <Label v-for="(note, index) in notes" :key="index" :text="getNoteString(note)" textWrap="true" class="note-item" /> <!-- Affiche chaque note -->
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios"; // Importation de la librairie Axios pour les requêtes HTTP
import { ApplicationSettings } from "@nativescript/core"; // Importation des réglages de l'application

export default {
  data() {
    return {
      loading: true, // Indique si les notes sont en cours de chargement
      notes: [] // Tableau pour stocker les notes
    };
  },
  mounted() {
    this.fetchNotes(); // Appelle la méthode pour récupérer les notes lors du montage du composant
  },
  methods: {
    async fetchNotes() { // Méthode pour récupérer les notes
      try {
        const token = ApplicationSettings.getString("userToken"); // Récupère le token de l'utilisateur
        console.log('Fetching notes...'); // Log pour indiquer que la récupération commence

        const response = await axios.get('http://10.0.2.2:3000/notes', { // Requête GET pour récupérer les notes
          headers: { Authorization: token } // Ajoute le token dans les en-têtes
        });

        this.notes = response.data; // Stocke les notes récupérées
        console.log('Notes loaded:', this.notes); // Log des notes chargées
      } catch (err) {
        console.error('Error fetching notes:', err); // Log de l'erreur en cas d'échec
      } finally {
        this.loading = false; // Indique que le chargement est terminé
      }
    },
    getNoteString(note) { // Méthode pour formater une note en chaîne de caractères
      return `Note ID: ${note.id} - Content: ${note.contenu}`; // Retourne le format de la note
    }
  }
};
</script>

<style scoped>
.note-item {
  margin: 10;
  padding: 10;
  border-width: 1;
  border-color: #ccc;
  border-radius: 5;
}
</style>
