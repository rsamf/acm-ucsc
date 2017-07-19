import React from 'react';

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
                            <button className="ui teal basic right labeled icon button">
                                Get Involved <i className="right chevron icon"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

module.exports = Index;