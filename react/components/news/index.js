import React from 'react';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            news: [1, 2, 3, 4, 5, 6]
        };
    }


    render(){
        return (
            <div className="ui container">
                <h1 className="unique">News</h1>
                <div className="one column grid">
                    {this.state.news.map(eachArticle)}
                </div>
            </div>
        );
        function eachArticle(article, i){
            return (
                <div key={i} className="ui segment news-block">
                    <h3 className="title">Title</h3>
                    <p className="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error magni omnis perferendis qui quo recusandae tenetur ut? Adipisci alias autem ducimus laboriosam numquam officiis soluta tempora tenetur voluptatem voluptates! Quidem!</p>
                    <div className="footer"><span className="author">Richard Franklin</span> <span className="date">18 August 2017</span></div>
                </div>
            );
        }
    }
}

module.exports = Index;