import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Profile from './profile';
import QR from './qr';
import Dashboard from './dashboard';
import NotFound from '../404';

class Index extends React.Component {
    constructor(props){
        super(props);
        $(window).off('resize');
    }

    render(){
        return (
            <div className="ui container">
                <div className="ui secondary pointing menu">
                    <Link to="/account/profile" className={(this.props.location.pathname === '/account/profile' ? 'active ' : "") + 'item'}>
                        Profile
                    </Link>
                    <Link to="/account/qr" className={(this.props.location.pathname === '/account/qr' ? 'active ' : "") + 'item'}>
                        QR
                    </Link>
                    {
                        user.role !== "Member" &&
                        <Link to="/account/dashboard" className={(this.props.location.pathname === '/account/dashboard' ? 'active ' : "") + 'item'}>
                            Dashboard
                        </Link>
                    }

                </div>
                <div className="ui segment">
                    <Switch>
                        <Route exact path="/account" component={Profile}/>
                        <Route path="/account/profile" component={Profile}/>
                        <Route path="/account/qr" component={QR}/>
                        {
                            user.role !== "Member" &&
                            <Route path="/account/dashboard" component={Dashboard}/>
                        }
                        <Route path="/account/*" component={NotFound}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

module.exports = Index;