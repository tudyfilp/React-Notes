import React from 'react';
import Storage from './storage';
class NotesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }

    async componentDidMount() {
        const user = await Storage.getActiveUser();

        this.setState({
            user: user
        });
    }
 
    getFormattedDate(date) {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let suffix = ['st', 'nd', 'rd'];

        date = new Date(date);

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
             <div className="">
                 <h6 className="noteTitle">{this.getFormattedTitle(note.title)}</h6>
                 <h6 className="date">{this.getFormattedDate(note.timeStamp)}</h6>
                 <h6 className="description">{this.getFormattedDescription(note.description)}</h6>
             </div>
            
        </li>).reverse();
    }

    getFormattedTitle = (title) => {
        if(title.length > 20)
            return title.slice(0, 20) + "...";
        else
            return title;
    }

    getFormattedDescription = (description) => {
        if(description.length > 40)
            return description.slice(0, 40) + "...";
        else
            return description;
    }

    render(){
        return (
        <div className="notesList">
            <div className="notesListHeader d-flex flex-row mt-2">
                <h6 className="mr-5">Hi, {this.state.user}</h6>
                <button className="btn options createNew btn-info ml-4" onClick={this.props.addNote}>New Note</button>
            </div>
            <ul className="notes">{this.getNotes()}</ul>
        </div>
        )
    }
}

export default NotesList;