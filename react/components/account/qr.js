import React from 'react';

class QR extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="ui grid">
                <div className="two column centered row">
                    <div className="column">
                        <div className="ui fluid image">
                            <div className="ui red ribbon label">
                                <i className="qrcode white icon"/>
                                {user._id}
                            </div>
                            <img src="/qr" alt="" id="qrcode"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = QR;