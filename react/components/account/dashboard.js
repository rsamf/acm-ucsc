import React from 'react';
import eventsNetworking from '../../networking/events';
import newsNetworking from '../../networking/news';


class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            newEvent : {},
            newArticle : {}
        }

    }

    componentDidMount(){
        $('.ui.accordion').accordion();
    }

    refreshAccordion(){
        $('.ui.accordion').accordion('refresh');
    }

    render(){
        let self = this;
        return (
            <div>
                {renderPosts()}
                <div className="ui segment">
                    <div className="fluid ui button">Begin ACM Meeting Sign In</div>
                </div>
            </div>
        );
        function articleChange(){
            let article = self.state.newArticle;
            article[property] = evt.currentTarget.value;
            self.setState({
                newArticle : article
            });
            console.log(self.state.newArticle);
        }
        function eventChange(property, evt){
            let event = self.state.newEvent;
            event[property] = evt.currentTarget.value;
            self.setState({
                newEvent : event
            });
            console.log(self.state.newEvent);
        }
        function submitEvent(){
            eventsNetworking.postEvent(self.state.newEvent, data=>{
                console.log(data);
            });
        }
        function submitArticle(){
            newsNetworking.postEvent(self.state.newEvent, data=>{
                console.log(data);
            });
        }
        function renderPosts(){
            return (
                <div className="ui accordion">
                    <h1 className="title">
                        <i className="dropdown icon"/>
                        Post an Event
                    </h1>
                    <div className="content">
                        <div className="ui dividing header">
                            Event
                        </div>
                        <div className="ui form">
                            <div className="two fields">
                                <div className="required field">
                                    <label htmlFor="event-title">Title</label>
                                    <input type="text" id="event-title" onChange={evt=>eventChange("title", evt)}/>
                                </div>
                                <div className="required field">
                                    <label htmlFor="event-date">Date</label>
                                    <input type="date" id="event-date" onChange={evt=>eventChange("date", evt)}/>
                                </div>
                            </div>
                            <div className="required field">
                                <label htmlFor="event-location">Location</label>
                                <input type="text" id="event-location" onChange={evt=>eventChange("location", evt)}/>
                            </div>
                            <div className="required field">
                                <label htmlFor="event-description">Short Description (You can add an article about this to explain further details)</label>
                                <input type="text" id="event-description" onChange={evt=>eventChange("description", evt)}/>
                            </div>
                            <div className="field">
                                <label htmlFor="event-facebook">Link to the Facebook event</label>
                                <input type="text" id="event-facebook" onChange={evt=>eventChange("facebook", evt)} placeholder="(optional)"/>
                            </div>
                            <button className="button ui primary basic" onClick={submitEvent}>Submit</button>
                        </div>
                        <div className="ui divider"/>
                    </div>
                    <h1 className="title">
                        <i className="dropdown icon"/>
                        Post an Article
                    </h1>
                    <div className="content">
                        <div className="ui form">
                            <div className="required field">
                                <label htmlFor="article-title">Title</label>
                                <input type="text" id="article-title" onChange={evt=>articleChange("title", evt)}/>
                            </div>
                            <div className="required field">
                                <label htmlFor="article-content">Content</label>
                                <textarea id="article-content" onChange={evt=>articleChange("content", evt)}/>
                            </div>
                            <div className="field">
                                <label htmlFor="article-event">Link an Event</label>
                                <input type="text" id="article-event" onChange={evt=>articleChange("event", evt)} placeholder="(optional)"/>
                            </div>
                            <button className="button ui primary basic" onClick={submitArticle}>Submit</button>
                        </div>

                        <div className="ui divider"/>
                    </div>
                </div>
            );
        }
    }
}

module.exports = Dashboard;
