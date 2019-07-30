import React from 'react';
import './NotesBoard.css'
import NotesList from './NotesList';
import ActiveNote from './ActiveNote';

class NotesBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        notesList: [],
                        activeNote: {}
                    }
    }

    componentDidMount() {
        this.populateNotesList();
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
        notes.push(this.getEmptyNote(notes));

        this.setState({
            notesList: notes,
            activeNote: notes[notes.length-1]
        })
    }

    deleteNote = (id) => {
        let noteIndex = this.state.notesList.findIndex(note => note.id === id);
        let notes = this.state.notesList;
        
        notes.splice(noteIndex, 1);
        
        noteIndex = noteIndex > 0 ? noteIndex - 1 : 0;

        this.setState({
            notesList: notes,
            activeNote: this.state.notesList[noteIndex]
        }); 
    
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