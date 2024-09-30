<template>
    <Page>
        <ActionBar title="Menu" /> <!-- Titre de la page -->
        <StackLayout>
            <Button text="Contact" @tap="goToContacts" /> <!-- Bouton pour accéder à la liste des contacts -->
            <Button text="Note" @tap="goToNotes" /> <!-- Bouton pour accéder à la liste des notes -->
        </StackLayout>
    </Page>
</template>

<script>
import TaskList from './TaskList.vue'; // Importation du composant pour la liste des contacts
import NoteList from './NoteList.vue'; // Importation du composant pour la liste des notes

export default {
    methods: {
        goToContacts() { // Méthode pour naviguer vers la liste des contacts
            this.$navigateTo(TaskList); // Navigation vers le composant TaskList
        },
        goToNotes() { // Méthode pour naviguer vers la liste des notes
            this.$navigateTo(NoteList); // Navigation vers le composant NoteList
        },
    },
};
</script>
