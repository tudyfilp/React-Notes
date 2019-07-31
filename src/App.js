import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NotesBoard from './NotesBoard';
import Home from './Home';
import Storage from './storage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  saveUsername = (newUsername) => {
    this.setState({
      username: newUsername
    });

    Storage.updateActiveUser(newUsername);
  }
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" render={(props) => 
          <Home {...props} saveUsername={this.saveUsername}/>} />
          <Route exact path="/myNotes" component={NotesBoard} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
