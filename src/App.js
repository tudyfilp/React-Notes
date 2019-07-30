import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NotesBoard from './NotesBoard';
import Home from './Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  handleUsernameChange = (ev) => {
    this.setState({
      username: ev.target.value
    });
    //validate username
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" render={(props) => 
          <Home {...props} handleUsernameChange={this.handleUsernameChange}/>} />
          <Route exact path="/myNotes" component={NotesBoard}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
