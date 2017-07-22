import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import Home from './home';
import Account from './account';
import Events from './events';
import News from './news';
import Login from './login';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading : false
        };
        console.log(user);
    }

    componentDidMount(){
        $('#account-dropdown').dropdown({
            on : 'hover',
            direction : 'downward'
        });
    }
    componentDidUpdate(){
        console.log(this.props);
    }

    render(){
        if(!this.state.loading){
            return (
                <div>
                    <div id="nav" className="ui huge large top attached menu">
                        <Link to="/" className={(this.props.location.pathname === '/' ? 'active ' : "") + 'item'}>
                            ACM
                        </Link>
                        <Link to="/events" className={(this.props.location.pathname === '/events' ? 'active ' : "") + 'item'}>
                            Events
                        </Link>
                        <Link to="/news" className={(this.props.location.pathname === '/news' ? 'active ' : "") + 'item'}>
                            News
                        </Link>

                        <div className="right menu">
                            {
                                user ?
                                    <div className="ui item dropdown" id="account-dropdown">
                                        <img className="ui avatar image" src={user.google.photos[0].value} alt="oops :p"/> <span>{user.google.displayName}</span> <i className="dropdown icon"/>
                                        <div className="menu">
                                            <Link to="/account/profile" className="item">Profile</Link>
                                            <Link to="/account/qr" className="item">QR</Link>
                                            <Link to="/account/dashboard" className="item">Dashboard</Link>
                                            <a href="/auth/logout" className="item">Logout</a>
                                        </div>
                                    </div>
                                    :
                                    <Link to="/login" className="item">
                                        <i className="google icon"/> Sign In
                                    </Link>
                            }

                        </div>
                    </div>

                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/events" component={Events}/>
                        <Route path="/news" component={News}/>
                        <Route path="/account" render={routeProps=><Account {...routeProps}/>}/>
                        <Route exact path="/login" component={Login}/>
                    </Switch>
                </div>
            );
        }
        return (
            <div className="">Loading</div>
        );
    }
}

module.exports = Index;