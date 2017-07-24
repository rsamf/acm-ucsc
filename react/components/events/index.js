import React from 'react';
import networking from '../../networking/events';
const SMALL_THRESHOLD = 750;

/*
    Events
 */

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            screenWidth : $(window).width() <= SMALL_THRESHOLD ? "SMALL" : "LARGE",
            events : []
        };
        this.getEvents();
    }
    componentDidMount(){
        console.log(this.state.screenWidth);
        let self = this;
        $(window).resize(()=>{
            console.log(self.state.screenWidth, $(window).width());
            if($(window).width() <= SMALL_THRESHOLD){
                self.setState({
                    screenWidth : "SMALL"
                });
            } else {
                self.setState({
                    screenWidth : "LARGE"
                });
            }
        });
    }

    getEvents(){
        let self = this;
        console.log("getting events");
        networking.getEvents(data=>{
            console.log("EVENTS:", data);
            self.setState({
                events : data
            });
        });
    }

    render(){
        let upcomings = this.state.events.filter((event)=>{
            return new Date(Date.now()) <= new Date(event.date);
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
                    <div className="column">
                        {upcomings.map(renderEvent)}
                    </div>
                </div>
                <h3>Past</h3>
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
            </div>
        );
        function renderEvent(event, i){
            console.log(event);
            return (
                <div key={i} className="ui segment event">
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
                        {event.description}
                    </div>
                </div>
            );
        }
    }
}

module.exports = Index;