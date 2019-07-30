import React from 'react';
class ActiveNote extends React.Component {

    render(){
        if(this.props.notesList.length > 0)
            return(
            <div className="activeNoteWrapper container p-0">
            <div className="row activeNoteHeader mt-2">
                    <input type="text" className="col-6" placeholder="Note Title"
                    onChange={(e) => this.props.handleTitleChange(e)}
                    value={this.props.activeNote.title || ''}
                    />
                    <button className="btn btn-success saveNoteButton col-2 offset-sm-1"
                    onClick={() => this.props.updateNote()}>Save</button>
                    <button className="btn btn-danger deleteNote col-2 ml-4"
                    onClick={() => this.props.deleteNote(this.props.activeNote.id)}>Delete</button>
                </div>
                <textarea className="activeNote" placeholder="Your note description"
                onChange={(e) => this.props.handleDescriptionChange(e)}
                value={this.props.activeNote.description || ''}></textarea>
            </div>)
        else
            return <React.Fragment></React.Fragment>
    }
}

export default ActiveNote;