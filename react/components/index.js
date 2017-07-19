import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import Home from './home';
import Account from './account';
import Events from './events';
import News from './news';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading : true
        };
    }

    componentDidMount(){
        this.setState({
            loading : false
        });
    }
    componentDidUpdate(){
        console.log(this.props);
    }

    render(){
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
                        <a href="/auth/google" className="item">
                            <i className="google icon"/> Sign In
                        </a>
                    </div>
                </div>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/events" component={Events}/>
                    <Route path="/news" component={News}/>
                    <Route path="/account" component={Account}/>
                </Switch>

            </div>
        );
    }
}

module.exports = Index;