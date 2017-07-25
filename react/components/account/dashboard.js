import React from 'react';
import eventsNetworking from '../../networking/events';
import newsNetworking from '../../networking/news';
import globals from '../../globals';

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
                $('#'+event._id).attr('data-value', event._id);
            });
        });
        newsNetworking.getNews((data)=>{
            self.setState({
                articles : data
            });
            self.state.articles.forEach((article)=>{
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
                    <div className="fluid ui disabled button">Begin ACM Meeting Sign In</div>
                </div>
            </div>
        );
        function articleChange(property, evt){
            let article = self.state.newArticle;
            if(property === "photo"){
                let file = evt.currentTarget.files[0];
                if(globals.validFileType(file)){
                    $("#article-image-preview").attr('src', window.URL.createObjectURL(file));
                    article.photo = file;
                }
            } else {
                article[property] = evt.currentTarget.value;
            }
            self.setState({
                newArticle : article
            });
        }
        function eventChange(property, evt){
            let event = self.state.newEvent;
            if(property === "photo"){
                let file = evt.currentTarget.files[0];
                if(globals.validFileType(file)){
                    event.photo = file;
                    $("#event-image-preview").attr('src', window.URL.createObjectURL(file));
                }
            } else {
                event[property] = evt.currentTarget.value;
            }
            self.setState({
                newEvent : event
            });
        }
        function submitEvent(){
            self.setState({
                eventLoading : true
            });
            // Create FormData object to send through and append all data to it
            let newEvent = new FormData();
            Object.keys(self.state.newEvent).forEach(key=>{
                newEvent.append(key, self.state.newEvent[key]);
            });
            // Also add event article if there is one
            newEvent.append("article", $('#event-article').val());
            eventsNetworking.postEvent(newEvent, data=>{
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
            // Create FormData object to send through and append all data to it
            let newArticle = new FormData();
            Object.keys(self.state.newArticle).forEach(key=>{
                newArticle.append(key, self.state.newArticle[key]);

            });
            // Also add article event if there is one
            newArticle.append("event", $('#article-event').val());
            newsNetworking.postArticle(newArticle, data=>{
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
                                <label htmlFor="event-description">Description</label>
                                <input type="text" id="event-description" onChange={evt=>eventChange("description", evt)}/>
                            </div>
                            <div className="field">
                                <label htmlFor="event-image">Photo</label>
                                <input type="file" id="event-image" accept="image/*" onChange={evt=>eventChange("photo", evt)}/>
                                <img className="ui small image" id="event-image-preview"/>
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
                                <label htmlFor="article-image">Photo</label>
                                <input type="file" id="article-image" accept="image/*" onChange={evt=>articleChange("photo", evt)}/>
                                <img className="ui small image" id="article-image-preview"/>
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
