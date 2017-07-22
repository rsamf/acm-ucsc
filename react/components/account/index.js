import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './profile';
import QR from './qr';
import Dashboard from './dashboard';

class Index extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props);
        return (
            <div className="ui container">
                <div className="ui secondary pointing menu">
                    <Link to="/account/profile" className={(this.props.location.pathname === '/account/profile' ? 'active ' : "") + 'item'}>
                        Profile
                    </Link>
                    <Link to="/account/qr" className={(this.props.location.pathname === '/account/qr' ? 'active ' : "") + 'item'}>
                        QR
                    </Link>
                    <Link to="/account/dashboard" className={(this.props.location.pathname === '/account/dashboard' ? 'active ' : "") + 'item'}>
                        Dashboard
                    </Link>
                </div>
                <div className="ui segment">
                    <Switch>
                        <Route exact path="/account" component={Profile}/>
                        <Route path="/account/profile" component={Profile}/>
                        <Route path="/account/qr" component={QR}/>
                        <Route path="/account/dashboard" component={Dashboard}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

module.exports = Index;