<template>
  <Page>
    <ActionBar title="Contacts" /> <!-- Titre de la page -->
    <StackLayout>
      <Label text="Contacts List" fontSize="20" fontWeight="bold" /> <!-- Titre de la liste de contacts -->
      <Label v-if="loading" text="Loading..." /> <!-- Message de chargement -->
      <Label :text="'Contacts Count: ' + contacts.length" /> <!-- Affiche le nombre de contacts -->
      <ScrollView height="400"> <!-- Zone défilante pour la liste des contacts -->
        <StackLayout>
          <Label v-for="(contact, index) in contacts" :key="index" :text="getContactString(contact)" textWrap="true" class="contact-item" /> <!-- Affiche chaque contact -->
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios"; // Importation de la librairie Axios
import { ApplicationSettings } from "@nativescript/core"; // Importation des réglages de l'application

export default {
  data() {
    return {
      loading: true, // Indique si les contacts sont en chargement
      contacts: [] // Tableau pour stocker les contacts
    };
  },
  mounted() {
    this.fetchContacts(); // Récupère les contacts au montage du composant
  },
  methods: {
    async fetchContacts() { // Méthode pour récupérer les contacts
      try {
        const token = ApplicationSettings.getString("userToken"); // Récupère le token de l'utilisateur
        console.log('Fetching contacts...'); // Log pour indiquer le début du chargement

        const response = await axios.get('http://10.0.2.2:3000/contacts', { // Envoie une requête GET pour récupérer les contacts
          headers: { Authorization: token } // Ajoute le token dans les en-têtes
        });

        this.contacts = response.data; // Stocke les contacts récupérés
        console.log('Contacts loaded:', this.contacts); // Log pour afficher les contacts chargés
      } catch (err) {
        console.error('Error fetching contacts:', err); // Affiche l'erreur dans la console
      } finally {
        this.loading = false; // Met à jour l'état de chargement
      }
    },
    getContactString(contact) { // Méthode pour formater la chaîne d'un contact
      return `${contact.nom || ''} ${contact.prenom || ''} - ${contact.email || ''} - ${contact.telephone || ''}`; // Formate les informations du contact
    }
  }
};
</script>

<style scoped>
.contact-item {
  margin: 10;
  padding: 10;
  border-width: 1;
  border-color: #ccc;
  border-radius: 5;
}
</style>
