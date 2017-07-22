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
            <div className="ui container">
                <h1 className="ui header">
                    Please make sure to login with your UCSC email!
                </h1>
                <a href="/auth/google" className="ui right labeled icon button">
                    <i className="right arrow icon"/>Login
                </a>
            </div>
        );
    }
}

module.exports = Login;