import React from 'react';

class Profile extends React.Component {

    constructor(props){
        super(props);

    }

    render(){
        console.log(user);
        let imageURL = user.google.photos[0].value.replace(/\?sz=\d+/g, '');
        return (
            <div className="ui stackable grid">
                <div className="two column row">
                    <div className="column">
                        <div className="ui centered raised card">
                            <div className="image">
                                <img src={imageURL}/>
                            </div>
                            <div className="content">
                                <a className="header">{user.google.displayName}</a>
                                <div className="meta">
                                    <span className="date">{user.role}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="center aligned column">
                        <div className="ui statistic">
                            <div className="value">
                                {user.checkIns || 0}
                            </div>
                            <div className="label">
                                Check-Ins
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Profile;