import React from 'react';
import './Home.css';
class Home extends React.Component {
    render() {
        return (
            <div className="loginWrapper">
                <h3 className="mt-5">Authenticate</h3>
                <input onChange={this.props.handleUsernameChange} type="text" placeholder="Your username"/>
                <button onClick={() =>{}}>Continue</button>
            </div>
        )
    }
}

export default Home;