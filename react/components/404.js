import React from 'react';

class NotFound extends React.Component {
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div className="ui container center aligned">
                <h1 className="ui icon header">
                    <i className="frown icon"/>
                    <div className="content">
                        404
                        <div className="sub header">Sorry, but I couldn't find the page you were looking for</div>
                    </div>
                </h1>
            </div>
        )
    }
}

module.exports = NotFound;