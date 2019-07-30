import React from 'react';

class NotesList extends React.Component {
    constructor(props) {
        super(props);
    }
    getFormattedDate(date) {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let suffix = ['st', 'nd', 'rd'];
        let day = date.getDay();
        if(day > suffix.length) {
            day += 'th';
        } else {
            day += suffix[day-1];
        }
        return months[date.getMonth()] + ' ' + day + ' ' + date.getFullYear(); 
    }

    
    getNotes = () => {
        return this.props.notes.map(note =>
         <li key={note.id} onClick={() => this.props.openNote(note)}>
             <div className="d-flex justify-content-between">
                 <h6>{note.title}</h6>
                 <h6 className="date">{this.getFormattedDate(note.timeStamp)}</h6>
             </div>
            
        </li>).reverse();
    }

    render(){
        return (
        <div className="notesList">
            <div className="notesListHeader d-flex flex-row-reverse mt-2">
                <button className="btn btn-info" onClick={this.props.addNote}>New Note</button>
            </div>
            <ul className="notes">{this.getNotes()}</ul>
        </div>
        )
    }
}

export default NotesList;