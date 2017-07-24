import React from 'react';
import eventsNetworking from '../../networking/events';
import newsNetworking from '../../networking/news';


class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            newEvent : {},
            newArticle : {},
            events : [],
            articles : [],
            eventLoading : false,
            articleLoading : false,
            message : {}
        };
        this.getExistingNewsAndEvents();
    }

    getExistingNewsAndEvents(){
        let self = this;
        eventsNetworking.getEvents((data)=>{
            self.setState({
                events : data
            });
            self.state.events.forEach((event)=>{
                console.log("changing data-value of " + event._id);
                $('#'+event._id).attr('data-value', event._id);
            });
        });
        newsNetworking.getNews((data)=>{
            self.setState({
                articles : data
            });
            self.state.articles.forEach((article)=>{
                console.log("changing data-value of " + article._id);
                $('#'+article._id).attr('data-value', article._id);
            });
        })

    }

    componentDidMount(){
        $('.ui.accordion').accordion();
        $('.dropdown').dropdown();
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
        function articleChange(property, evt){
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
            self.setState({
                eventLoading : true
            });
            let newEvent = self.state.newEvent;
            newEvent.event = $('#event-article').val();
            console.log("Sending off:", newEvent);
            eventsNetworking.postEvent(newEvent, data=>{
                console.log(data);
                self.setState({
                    eventLoading : false,
                    message : {
                        type : "event",
                        status : data.error ? "BAD" : "OK",
                        content : data.error ? data.error : "Successfully posted an event about " + data.title
                    }
                });
            });
        }
        function submitArticle(){
            self.setState({
                articleLoading : true
            });
            let newArticle = self.state.newArticle;
            newArticle.event = $('#article-event').val();
            console.log("Sending off:", newArticle);
            newsNetworking.postArticle(self.state.newArticle, data=>{
                console.log(data);
                self.setState({
                    articleLoading : false,
                    message : {
                        type : "article",
                        status : data.error ? "BAD" : "OK",
                        content : data.error ? data.error : "Successfully posted an article about " + data.title
                    }
                });
            });
        }
        function renderPosts(){
            let message = self.state.message;
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
                        <div className={"ui form" + (self.state.eventLoading ? " loading" : "")}>
                            {
                                message.type === "event" &&
                                <div className="ui icon message">
                                    {
                                        (message.status === "OK" && <i className="green check icon large"/>) ||
                                        (message.status === "BAD" && <i className="red cancel icon large"/>)
                                    }
                                    <div className="content">
                                        <div className="header">
                                            {
                                                (message.status === "OK" && <span>Success</span>) ||
                                                (message.status === "BAD" && <span>Error</span>)
                                            }
                                        </div>
                                        <p>{message.content}</p>
                                    </div>
                                </div>
                            }
                            <div className="two fields">
                                <div className="required field">
                                    <label htmlFor="event-title">Title</label>
                                    <input type="text" id="event-title" onChange={evt=>eventChange("title", evt)}/>
                                </div>
                                <div className="required field">
                                    <label htmlFor="event-date">Date</label>
                                    <input type="datetime-local" id="event-date" onChange={evt=>eventChange("date", evt)}/>
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
                            <div className="fields">
                                <div className="field">
                                    <label htmlFor="event-facebook">Link to the Facebook event</label>
                                    <input type="text" id="event-facebook" onChange={evt=>eventChange("facebook", evt)} placeholder="(optional)"/>
                                </div>
                                <div className="field">
                                    <label htmlFor="event-article">Link an Article</label>
                                    <div className="ui selection dropdown">
                                        <input type="hidden" id="event-article"/>
                                        <i className="dropdown icon"/>
                                        <div className="default text">Choose an Article (optional)</div>
                                        <div className="menu">
                                            {self.state.articles.map((article, i)=>{
                                                return (
                                                    <div key={i} className="item" id={article._id}>{article.title}</div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
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
                        <div className={"ui form" + (self.state.articleLoading ? " loading" : "")}>
                            {
                                message.type === "article" &&
                                <div className="ui icon message">
                                    {
                                        (message.status === "OK" && <i className="green check icon large"/>) ||
                                        (message.status === "BAD" && <i className="red cancel icon large"/>)
                                    }
                                    <div className="content">
                                        <div className="header">
                                            {
                                                (message.status === "OK" && <span>Success</span>) ||
                                                (message.status === "BAD" && <span>Error</span>)
                                            }
                                        </div>
                                        <p>{message.content}</p>
                                    </div>
                                </div>
                            }


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
                                <div className="ui selection dropdown">
                                    <input type="hidden" id="article-event"/>
                                    <i className="dropdown icon"/>
                                    <div className="default text">Choose an Event (optional)</div>
                                    <div className="menu">
                                        {self.state.events.map((event, i)=>{
                                            return (
                                                <div key={i} className="item" id={event._id}>{event.title}</div>
                                            );
                                        })}
                                    </div>
                                </div>
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
