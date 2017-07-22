import React from 'react';
import { Link } from 'react-router-dom';

class Index extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="banner">
                <div id="social-media">
                    <a className="item" href="https://www.facebook.com/groups/103164379724503" target="_blank">
                        <i className="facebook huge square icon"/>
                    </a>
                    <div className="item" href="#" target="_blank">
                        <i className="mail huge square icon"/>
                    </div>
                    {/*
                                .
                                .
                                .
                        Tag any other social media items here
                    */}
                </div>
                <div className="content ui middle aligned grid">
                    <div className="row">
                        <div className="column center aligned">
                            <h1>Association for Computing Machinery at UCSC</h1>
                            <Link to="/login" className="ui teal basic right labeled icon button">
                                Get Involved <i className="right chevron icon"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

module.exports = Index;