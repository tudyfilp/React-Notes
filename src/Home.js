import React from 'react';
import './Home.css';
import {Route} from 'react-router-dom';
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {username: ''}
    }

    handleUsernameChange = (ev) => {
        this.setState({
            username: ev.target.value
        });
    }

    isUsernameValid = () => {
        const usernameLength = this.state.username.trim().length;
        if(usernameLength > 0)
            return true;
        else alert('username field cannot be empty or whitespaced');
        return false;
    }

    render() {

        const Button = () => (
            <Route render={({ history}) => (
              <button
                type='button'
                className="continueButton"
                onClick={() => {
                    if(this.isUsernameValid()){
                        this.props.saveUsername(this.state.username);
                        history.push('/myNotes')
                    }
                         }} 
              >
                Continue
              </button>
            )} />
          )

        return (
            <div className="loginWrapper">
                <h3 className="mt-5">Authenticate</h3>
                <input className="username" onChange={this.handleUsernameChange} type="text" placeholder="Your username"/>
               <Button></Button>
            </div>
        )
    }
}

export default Home;