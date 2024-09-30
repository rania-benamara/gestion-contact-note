<template>
  <Page>
    <ActionBar title="Register" /> <!-- Titre de la page d'inscription -->
    <StackLayout>
      <TextField v-model="name" hint="Name" /> <!-- Champ pour le nom de l'utilisateur -->
      <TextField v-model="email" hint="Email" keyboardType="email" /> <!-- Champ pour l'email -->
      <TextField v-model="password" hint="Password" secure="true" /> <!-- Champ pour le mot de passe -->
      <Button text="Register" @tap="register" /> <!-- Bouton pour soumettre le formulaire d'inscription -->
      <Label v-if="error" text="Registration failed" class="error" /> <!-- Message d'erreur en cas d'échec -->
      <Button text="Login" @tap="login" /> <!-- Bouton pour naviguer vers la page de connexion -->
    </StackLayout>
  </Page>
</template>

<script>
import { ApplicationSettings } from "@nativescript/core"; // Importation des réglages de l'application
import axios from "axios/dist/axios"; // Importation de la librairie Axios pour les requêtes HTTP
import Login from './Login.vue'; // Importation du composant de connexion

export default {
  data() {
    return {
      name: '', // Variable pour le nom de l'utilisateur
      email: '', // Variable pour l'email
      password: '', // Variable pour le mot de passe
      error: null, // Variable pour stocker les messages d'erreur
    };
  },
  methods: {
    async login() { // Méthode pour naviguer vers la page de connexion
      this.$navigateTo(Login);
    },
    async register() { // Méthode pour enregistrer un nouvel utilisateur
      try {
        const response = await axios.post('http://10.0.2.2:3000/register', { // Envoi des données d'inscription
          nom: this.name,
          email: this.email,
          mot_de_pass: this.password,
        });
        console.log(response.data); // Log de la réponse du serveur
        this.$navigateTo(Login); // Navigation vers la page de connexion après l'inscription
      } catch (error) {
        console.error('Registration error:', error); // Log de l'erreur en cas d'échec
        this.error = 'Registration failed. Please try again.'; // Affichage du message d'erreur
      }
    },
  },
};
</script>
