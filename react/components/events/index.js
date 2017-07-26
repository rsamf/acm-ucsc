import React from 'react';
import networking from '../../networking/events';
import { Link } from 'react-router-dom';
const SMALL_THRESHOLD = 750;

/*
    Events
 */

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            screenWidth : $(window).width() <= SMALL_THRESHOLD ? "SMALL" : "LARGE",
            events : [],
            loadings : []
        };
        this.getEvents();
        console.log("in ", this.props);
    }
    componentDidMount(){
        let self = this;
        $(window).resize(()=>{
            console.log(self.props.location.pathname);
            if(self.props.location.pathname === "/events") {
                if($(window).width() <= SMALL_THRESHOLD){
                    self.setState({
                        screenWidth : "SMALL"
                    });
                } else {
                    self.setState({
                        screenWidth : "LARGE"
                    });
                }
            }
        });
    }

    getEvents(){
        let self = this;
        networking.getEvents(data=>{
            self.setState({
                events : data,
                loadings : data.map(()=>false)
            });
            if(user && user.role !== "Member"){
                $('.ui.segment.event').popup({
                    hoverable : true,
                    position : 'right center',
                    inline : true
                });
            }
        });
    }

    render(){
        let self = this;
        let upcomings = this.state.events.filter((event)=>{
            return new Date(Date.now()) <= new Date(event.date);
        }).sort((a, b)=>{
            return (new Date(a.date) - new Date(b.date));
        });
        let pastEvents = this.state.events.filter((event)=>{
            return new Date(Date.now()) > new Date(event.date);
        });
        return (
            <div className="ui container">
                <h1 className="unique">Events</h1>
                <h3>Upcoming</h3>
                <div className="ui stackable two column grid">
                    <div className="column">
                        <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=800&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=rsamfranklin%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FLos_Angeles"
                                id="calendar" width="400" height="400" frameBorder="0" scrolling="no"
                        />
                    </div>
                    {/* First two upcomings besides calendar on right*/}
                    <div className="column">
                        {upcomings.slice(0, 2).map(renderEvent)}
                    </div>
                </div>
                {/* Display rest right below */}
                <div className="ui stackable two column grid">
                    {upcomings.slice(2, upcomings.length).map((event, i)=>{
                        return (
                            <div key={i} className="column">
                                {renderEvent(event, i)}
                            </div>
                        );
                    })}
                </div>
                <h3>Past</h3>
                {(
                    this.state.screenWidth === "LARGE" &&
                    <div className="ui two column grid">
                        <div className="column">
                            {pastEvents.map((event,i)=>{
                                if(i % 2 === 0) {
                                    return renderEvent(event, i);
                                }
                            })}
                        </div>
                        <div className="column">
                            {pastEvents.map((event,i)=>{
                                if(i % 2 === 1) {
                                    return renderEvent(event, i);
                                }
                            })}
                        </div>
                    </div>
                    ) || (
                    this.state.screenWidth === "SMALL" &&
                    <div className="ui one column grid">
                        <div className="column">
                            {pastEvents.map(renderEvent)}
                        </div>
                    </div>
                )}

            </div>
        );
        function renderEvent(event, i){
            let image = event.images[0];
            return (
                <div key={i}>
                    <div  className="ui segment event" id={event._id}>
                        {
                            self.state.loadings[i] &&
                            <div className="ui active inverted dimmer">
                                <div className="ui text loader">
                                    Loading...
                                </div>
                            </div>
                        }
                        <h2 className="ui header">
                            <span className="title">{event.title}</span>
                            <div className="sub header">
                                <div className="ui two column grid">
                                    <div className="left aligned column">
                                        <span className="date"><i className="blue calendar icon"/> {new Date(event.date).toDateString()}</span>
                                    </div>
                                    <div className="right aligned column">
                                        <span className="location"><i className="red marker icon"/> {event.location} </span>
                                    </div>
                                </div>
                            </div>
                        </h2>
                        <div className="description">
                            {image && <img src={`/images/${image}`} alt="Event Image" className="ui small left floated image"/>}
                            {event.description}
                        </div>
                        {
                            event.article &&
                            <Link to="/news" className="ui blue label">
                                <span>See Announcement</span> <i className="chevron right icon"/>
                            </Link>
                        }
                    </div>
                    {
                        user && user.role !== "Member" &&
                        <div className="ui special popup" id={`popup-${event._id}`}>
                            <div className="title">Controls</div>
                            <div className="content">
                                <div className="ui icon buttons">
                                <span className="ui icon orange button disabled">
                                    <i className="edit icon"/>
                                </span>
                                    <span className="ui icon red button" onClick={deleteEvent}>
                                    <i className="trash outline icon"/>
                                </span>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            );
            function deleteEvent(){
                let loadings = self.state.loadings;
                loadings[i] = true;
                self.setState({
                    loadings : loadings
                });
                console.log("Deleting event with id", event._id);
                console.log("Hello?");
                networking.deleteEvent(event._id, ()=>{
                    loadings.splice(i, 1);
                    let idToDelete = event._id;
                    self.setState({
                        loadings : loadings,
                        events : self.state.events.filter((event)=>{
                            return (event._id !== idToDelete);
                        }),
                    });
                });
            }
        }
    }
}

module.exports = Index;