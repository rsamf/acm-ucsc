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
        <div className="ui container center aligned">
            <h1 className="ui icon header">
                <i className="teal sign in icon"/>
                <div className="content">
                    Welcome
                    <div className="sub header">Please make sure to login with your UCSC email!</div>
                </div>
            </h1>
            <div className="">
                <a href="/auth/google" className="ui right teal labeled icon button">
                    <i className="right arrow icon"/>Login
                </a>
            </div>

        </div>
        );
    }
}

module.exports = Login;