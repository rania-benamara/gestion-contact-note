import Vue from 'nativescript-vue'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register.vue';
import TaskList from './components/TaskList.vue';
import AddContact from './components/AddContact.vue';
import DeleteContact from './components/DeleteContact.vue';
import ModifierContact from './components/ModifierContact.vue';
import ContactsList from './components/ContactsList.vue';

import List from './components/List.vue';
import AddNote from './components/AddNote.vue';
import DeleteNote from './components/DeleteNote.vue';
import ModifierNote from './components/ModifierNote.vue';
import NotesList from './components/NotesList.vue';
import Logout from './components/Logout.vue';

new Vue({
  render: (h) => h('frame', [h(Register)]),
}).$start()
