import React from 'react';
import './NotesBoard.css'
import NotesList from './NotesList';
import ActiveNote from './ActiveNote';
import Storage from './storage';

class NotesBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        notesList: [],
                        activeNote: {},
                        username: ''
                    }
    }

    componentDidMount() {
        const username = Storage.getActiveUser();
        const notes = Storage.getUserNotes(username);
        this.setState({
            notesList: notes,
            username: username,
            activeNote: notes[notes.length-1]
        })
        console.log(username);
    }

    populateNotesList = () => {
        let notes = [];

        for(let i=0; i<5; i++)
            notes.push(this.getRandomNote(notes));
        
        this.setState({
            notesList: notes,
            activeNote: notes[0]
        });
        
    }
    
    getRandomNote = (notes) => {
        let noteId = Math.max(0, ...notes.map(note => note.id)) + 1;
        let note = {
            title: 'Note title' + notes.length,
            description: 'note description' + notes.length,
            id: noteId,
            timeStamp: new Date()
        }
        return note;
    }

    addNewNote = () => {
        let notes = [].concat(this.state.notesList);
        let newNote = this.getEmptyNote(notes);
        notes.push(newNote);
        Storage.addNote(this.state.username, newNote);

        this.setState({
            notesList: notes,
            activeNote: notes[notes.length-1]
        })
    }

    deleteNote = () => {
        let id = this.state.activeNote.id;
        let noteIndex = this.state.notesList.findIndex(note => note.id === id);
        let notes = this.state.notesList;
        
        notes.splice(noteIndex, 1);
    
        noteIndex = noteIndex > 0 ? noteIndex - 1 : 0;

        this.setState({
            notesList: notes,
            activeNote: this.state.notesList[noteIndex]
        }); 

        Storage.deleteNote(this.state.username, id);
    
    }
    
    getEmptyNote = (notes) => {
        let noteId = Math.max(0, ...notes.map(note => note.id)) + 1;
        let note = {
            title: 'No Title',
            description: 'no description',
            id: noteId,
            timeStamp: new Date()
        }
        return note;
    }

    openNote = (note) => {
        this.setState({
            activeNote: note
        })
    }
    handleDescriptionChange = (e) => {
        let activeNote = this.state.activeNote;
        activeNote.description = e.target.value;
        this.setState({
            activeNote
        });
    }

    handleTitleChange = (e) => {
        let activeNote = this.state.activeNote;
        activeNote.title = e.target.value;
        this.setState({
            activeNote
        });
    }

    updateNote = () => {
        Storage.updateNote(this.state.username, this.state.activeNote);
    }

    render() {
        return (
            <div className="boardWrapper">
                <NotesList notes={this.state.notesList}
                openNote={this.openNote}
                addNote={this.addNewNote}
                ></NotesList>
                <ActiveNote 
                activeNote={this.state.activeNote}
                updateNote={this.updateNote}
                handleDescriptionChange={
                    this.handleDescriptionChange
                }
                handleTitleChange={
                    this.handleTitleChange
                }
                deleteNote={
                    this.deleteNote
                }
                notesList={
                    this.state.notesList
                }></ActiveNote>
            </div>
        )
    }
}


export default NotesBoard;