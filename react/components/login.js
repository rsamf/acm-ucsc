import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);

    }

    render(){
        if(this.props.user){
            return (
                <h1 className="ui header">
                    You are already logged in
                </h1>
            );
        }
        return (
            <h1 className="ui header">
                Please make sure to login with your UCSC email!
                <a href="/auth/google" className="ui primary button">Login</a>
            </h1>
        );
    }
}

module.exports = Login;