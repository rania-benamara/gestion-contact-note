<template>
    <Page>
        <ActionBar title="Note" /> <!-- Titre de la page -->
        <StackLayout>
            <Button text="Ajouter" @tap="goToAddNote" /> <!-- Bouton pour ajouter une note -->
            <Button text="Modifier" @tap="handleButton2" /> <!-- Bouton pour modifier une note -->
            <Button text="Supprimer" @tap="goToDeleteNote" /> <!-- Bouton pour supprimer une note -->
            <Button text="Afficher" @tap="handleButton4" /> <!-- Bouton pour afficher la liste des notes -->
            <Button text="Logout" @tap="handleButton5" /> <!-- Bouton pour se déconnecter -->
        </StackLayout>
    </Page>
</template>

<script>
import AddNote from './AddNote.vue'; // Importation du composant pour ajouter une note
import DeleteNote from './DeleteNote.vue'; // Importation du composant pour supprimer une note
import ModifierNote from './ModifierNote.vue'; // Importation du composant pour modifier une note
import NotesList from './NotesList.vue'; // Importation du composant pour afficher la liste des notes
import Logout from './Logout.vue'; // Importation du composant pour se déconnecter

export default {
    methods: {
        goToAddNote() { // Méthode pour naviguer vers le composant d'ajout de note
            this.$navigateTo(AddNote);
        },
        handleButton2() { // Méthode pour naviguer vers le composant de modification de note
            this.$navigateTo(ModifierNote);
        },
        goToDeleteNote() { // Méthode pour naviguer vers le composant de suppression de note
            this.$navigateTo(DeleteNote);
        },
        handleButton4() { // Méthode pour naviguer vers le composant d'affichage des notes
            console.log("Afficher button clicked"); // Log pour indiquer que le bouton afficher a été cliqué
            this.$navigateTo(NotesList);
        },
        handleButton5() { // Méthode pour naviguer vers le composant de déconnexion
            this.$navigateTo(Logout);
        },
    },
};
</script>
