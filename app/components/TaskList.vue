<template>
    <Page>
        <ActionBar title="Gestion De Contact" /> <!-- Titre de la page de gestion des contacts -->
        <StackLayout>
            <Button text="Ajouter" @tap="goToAddContact" /> <!-- Bouton pour ajouter un contact -->
            <Button text="Modifier" @tap="handleButton2" /> <!-- Bouton pour modifier un contact -->
            <Button text="Supprimer" @tap="goToDeleteContact" /> <!-- Bouton pour supprimer un contact -->
            <Button text="Afficher" @tap="handleButton4" /> <!-- Bouton pour afficher la liste des contacts -->
            <Button text="Logout" @tap="handleButton5" /> <!-- Bouton pour se déconnecter -->
        </StackLayout>
    </Page>
</template>

<script>
import AddContact from './AddContact.vue'; // Importation du composant pour ajouter un contact
import DeleteContact from './DeleteContact.vue'; // Importation du composant pour supprimer un contact
import ModifierContact from './ModifierContact.vue'; // Importation du composant pour modifier un contact
import ContactsList from './ContactsList.vue'; // Importation du composant pour afficher la liste des contacts
import Logout from './Logout.vue'; // Importation du composant de déconnexion

export default {
    methods: {
        goToAddContact() { // Méthode pour naviguer vers le composant d'ajout de contact
            this.$navigateTo(AddContact);
        },
        handleButton2() { // Méthode pour naviguer vers le composant de modification de contact
            this.$navigateTo(ModifierContact);
        },
        goToDeleteContact() { // Méthode pour naviguer vers le composant de suppression de contact
            this.$navigateTo(DeleteContact);
        },
        handleButton4() { // Méthode pour naviguer vers le composant de liste des contacts
            console.log("Afficher button clicked"); // Log pour indiquer que le bouton afficher a été cliqué
            this.$navigateTo(ContactsList);
        },
        handleButton5() { // Méthode pour naviguer vers le composant de déconnexion
            this.$navigateTo(Logout);
        },
    },
};
</script>
