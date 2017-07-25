import React from 'react';
import networking from '../../networking/news';
import globals from '../../globals';
import { Link } from 'react-router-dom';
class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            news: []
        };
        this.getNews();
    }

    getNews(){
        let self = this;
        networking.getNews(data=>{
            console.log(data);
            self.setState({
                news : data
            });
        });
    }

    render(){
        return (
            <div className="ui text container">
                <h1 className="unique">News and Announcements</h1>
                <div className="one column grid">
                    {this.state.news.map(eachArticle)}
                </div>
            </div>
        );
        function eachArticle(article, i){
            let image = article.images[0];
            let authorColor = globals.getUserColor(article.author);
            return (
                <div key={i} className="ui segment news-block">
                    <h3 className="title">{article.title}</h3>
                    {image && <img src={`/images/${image}`} alt="Article Image" className="ui left floated small image"/>}
                    <p className="content">
                        {article.content}
                    </p>
                    <div className="footer">
                        <span className={`ui image ${authorColor} label`}>
                            <img src={article.author.google.photos[0].value}/> <span className="white">{article.author.google.displayName}</span>
                        </span>
                        <span className="ui label">
                            {new Date(article.createdAt).toDateString()}
                        </span>
                        {
                            article.event &&
                            <Link to="/events" className="ui blue label right aligned">
                                <span>See Event</span> <i className="chevron right icon"/>
                            </Link>
                        }
                    </div>
                </div>
            );
        }
    }
}

module.exports = Index;