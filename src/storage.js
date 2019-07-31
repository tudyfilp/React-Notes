import { nodeInternals } from "stack-utils";

class Storage {
    static async getUserNotes(username){
        return await JSON.parse(localStorage.getItem(username)) || [];
    }

    static async addNote(username, note) {
        let usersNotes = await Storage.getUserNotes(username);
        usersNotes.push(note);
        localStorage.setItem(username, JSON.stringify(usersNotes));
    }

    static async deleteNote(username, noteId) {
        let usersNotes = await Storage.getUserNotes(username);

        let noteIndex = usersNotes.findIndex(note => note.id == noteId);
        usersNotes.splice(noteIndex, 1);
        localStorage.setItem(username, JSON.stringify(usersNotes));
    }

    static async updateNote(username, note) {
        const noteId = note.id;
        let usersNotes = await Storage.getUserNotes(username);
        let oldNote = usersNotes.find(nt => nt.id === noteId);

        Object.assign(oldNote, note);

        Storage.saveNotes(username, usersNotes);
    }

    static saveNotes(username, notes) {
        localStorage.setItem(username, JSON.stringify(notes));
    }

    static updateActiveUser(username) {
        localStorage.setItem('activeUser', JSON.stringify(username));
    }

    static async getActiveUser(username) {
        return await JSON.parse(localStorage.getItem('activeUser'));
    }
}

export default Storage;