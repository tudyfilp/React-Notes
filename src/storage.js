import { nodeInternals } from "stack-utils";
import FirebaseDb from './db/db';
class Storage {
    static getUserNotes(username){
        return JSON.parse(localStorage.getItem(username)) || [];
    }

    static addNote(username, note) {
        let usersNotes = Storage.getUserNotes(username);
        usersNotes.push(note);
        localStorage.setItem(username, JSON.stringify(usersNotes));
        FirebaseDb.addNote(username, note);
    }

    static deleteNote(username, noteId) {
        let usersNotes = Storage.getUserNotes(username);

        let noteIndex = usersNotes.findIndex(note => note.id == noteId);
        usersNotes.splice(noteIndex, 1);
        localStorage.setItem(username, JSON.stringify(usersNotes));
        FirebaseDb.deleteUserNote(username, noteId);
    }

    static updateNote(username, note) {
        const noteId = note.id;
        let usersNotes = Storage.getUserNotes(username);
        let oldNote = usersNotes.find(nt => nt.id === noteId);

        Object.assign(oldNote, note);

        Storage.saveNotes(username, usersNotes);
        FirebaseDb.updateNote(username, note);
    }

    static saveNotes(username, notes) {
        localStorage.setItem(username, JSON.stringify(notes));
        FirebaseDb.saveNotes(username, notes);
    }

    static updateActiveUser(username) {
        localStorage.setItem('activeUser', JSON.stringify(username));
    }

    static getActiveUser(username) {
        return JSON.parse(localStorage.getItem('activeUser'));
    }
}

export default Storage;