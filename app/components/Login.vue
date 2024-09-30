<template>
  <Page>
    <ActionBar title="Login" /> <!-- Titre de la page -->
    <StackLayout>
      <TextField v-model="email" hint="Email" keyboardType="email" /> <!-- Champ pour l'email -->
      <TextField v-model="password" hint="Password" secure="true" /> <!-- Champ pour le mot de passe -->
      <Button text="Login" @tap="login" /> <!-- Bouton pour se connecter -->
      <Label v-if="error" text="Invalid credentials" class="error" /> <!-- Message d'erreur si les identifiants sont invalides -->
      <Button text="Register" @tap="register" /> <!-- Bouton pour accéder à l'enregistrement -->
    </StackLayout>
  </Page>
</template>

<script>
import { ApplicationSettings } from "@nativescript/core"; // Importation des réglages de l'application
import axios from "axios/dist/axios"; // Importation de la librairie Axios
import Register from './Register.vue'; // Importation du composant d'enregistrement
import TaskList from './TaskList.vue'; // Importation du composant pour la liste des tâches
import List from './List.vue'; // Importation du composant pour la liste

export default {
  data() {
    return {
      email: '', // Email de l'utilisateur
      password: '', // Mot de passe de l'utilisateur
      error: null, // Stocke le message d'erreur
      userToken: null // Stocke le token de l'utilisateur
    };
  },
  methods: {
    async register() { // Méthode pour naviguer vers le formulaire d'enregistrement
      this.$navigateTo(Register);
    },
    async login() { // Méthode pour se connecter
      try {
        const response = await axios.post('http://10.0.2.2:3000/login', { // Envoie une requête POST pour la connexion
          email: this.email, // Email de l'utilisateur
          mot_de_pass: this.password, // Mot de passe de l'utilisateur
        });
        console.log('Response:', response.data); // Log de la réponse

        if (response.data.token) { // Vérifie si un token est présent dans la réponse
          ApplicationSettings.setString("userToken", response.data.token); // Stocke le token
          this.$navigateTo(List); // Navigue vers la liste
        } else {
          console.log('Unexpected response:', response); // Log en cas de réponse inattendue
        }
      } catch (error) {
        console.error('Login error:', error); // Affiche l'erreur dans la console
        this.error = 'Invalid login credentials'; // Met à jour le message d'erreur
      }
    },
  },
  mounted() {
    this.userToken = ApplicationSettings.getString("userToken"); // Récupère le token stocké
    if (this.userToken) this.$navigateTo(List); // Navigue vers la liste si le token existe
  }
};
</script>
