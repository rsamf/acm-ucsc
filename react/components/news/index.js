import React from 'react';
import networking from '../../networking/news';
import globals from '../../globals';
import { Link } from 'react-router-dom';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            news: [],
            loadings : []
        };
        this.getNews();
        $(window).off('resize');
    }

    getNews(){
        let self = this;
        networking.getNews(data=>{
            self.setState({
                news : data,
                loadings : data.map(()=>false)
            });
            console.log(self.state.loadings);
            if(user && user.role !== "Member"){
                $('.ui.segment.news-block').popup({
                    hoverable : true,
                    position : 'right center',
                    inline : true
                });
            }

        });
    }

    render(){
        let self = this;
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
                <div key={i} >
                    <div className="ui segment news-block">
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
                    {
                        user && user.role !== "Member" &&
                        <div className="ui special popup" id={`popup-${article._id}`}>
                            <div className="title">Controls</div>
                            <div className="content">
                                <div className="ui icon buttons">
                                <span className="ui icon orange button disabled">
                                    <i className="edit icon"/>
                                </span>
                                    <span className="ui icon red button" onClick={deleteArticle}>
                                    <i className="trash outline icon"/>
                                </span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            );
            function deleteArticle(){
                let loadings = self.state.loadings;
                let news = self.state.news;
                loadings[i] = true;
                self.setState({
                    loadings : loadings
                });
                networking.deleteArticle(article._id, ()=>{
                    loadings.splice(i, 1);
                    news.splice(i, 1);
                    self.setState({
                        loadings : loadings,
                        news : news,
                    });
                });
            }
        }
    }
}

module.exports = Index;