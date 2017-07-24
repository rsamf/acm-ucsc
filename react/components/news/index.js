import React from 'react';
import networking from '../../networking/news';

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
                <h1 className="unique">News</h1>
                <div className="one column grid">
                    {this.state.news.map(eachArticle)}
                </div>
            </div>
        );
        function eachArticle(article, i){
            return (
                <div key={i} className="ui segment news-block">
                    <h3 className="title">{article.title}</h3>
                    <p className="content">{article.content}</p>
                    <div className="footer">
                        <span className="ui image label">
                            <img src={article.author.google.photos[0].value}/> {article.author.google.displayName}
                        </span>
                        <span className="ui label">
                            {new Date(article.createdAt).toDateString()}
                        </span>
                    </div>
                </div>
            );
        }
    }
}

module.exports = Index;