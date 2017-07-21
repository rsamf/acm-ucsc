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
                                    <Link to="/account" className="item">
                                        {user.google.displayName}
                                    </Link>
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
                        <Route path="/account" component={Account}/>
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