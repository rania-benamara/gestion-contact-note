<template>
  <Page>
    <ActionBar title="Logout" /> <!-- Titre de la page -->
    <StackLayout>
      <Label text="Voulez vous deconnecter?" /> <!-- Message demandant si l'utilisateur souhaite se déconnecter -->
      <Button text="Oui" @tap="logout" /> <!-- Bouton pour confirmer la déconnexion -->
      <Button text="Annuler" @tap="goBack" /> <!-- Bouton pour annuler et revenir en arrière -->
    </StackLayout>
  </Page>
</template>

<script>
import { ApplicationSettings } from "@nativescript/core"; // Importation des réglages de l'application
import Login from './Login.vue'; // Importation du composant de connexion

export default {
  methods: {
    logout() { // Méthode pour se déconnecter
      ApplicationSettings.setString("userToken", ""); // Efface le token de l'utilisateur
      this.$navigateTo(Login); // Navigue vers le composant de connexion
    },
    goBack() { // Méthode pour revenir en arrière
      this.$navigateBack(); // Navigue vers la page précédente
    }
  }
};
</script>

<style scoped>

</style>
