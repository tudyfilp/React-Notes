var {firebase} = require('./firebase');
var database = firebase.database();

class FirebaseDb {
    static getUserNotes(username){
        return new Promise((resolve, reject) => {
            database.ref('/notes/' + username).once('value', snapshot => {
                if(!snapshot.exists())
                    resolve([]);
                else
                    resolve(snapshot.val());
            });
        });
    }

    static deleteUserNote(username, noteId) {
        FirebaseDb.getUserNotes(username).then(notes => {
            let noteIndex = notes.findIndex(note => note.id === noteId);
            if(noteIndex === -1)
                return;
            notes.splice(noteIndex, 1);
            FirebaseDb.saveNotes(username, notes);
        });
    }

    static saveNotes(username, notes) {
        database.ref('/notes/' + username).set(notes);
    }

    static updateNote(username, note) {
        FirebaseDb.getUserNotes(username).then(notes => {
            var noteIndex = notes.findIndex(nt => nt.id === note.id);
            notes[noteIndex] = note;

            FirebaseDb.saveNotes(username, notes);
        })
    }

    static addNote(username, note) {
        FirebaseDb.getUserNotes(username).then(notes => {
            notes.push(note);
            FirebaseDb.saveNotes(username, notes);
        });
    }
}


export default FirebaseDb;
