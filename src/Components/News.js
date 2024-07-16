import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }

    async componentDidMount() {
        this.fetchArticles();
    }

    fetchArticles = async () => {
        const { page } = this.state;
        const pageSize = 5;  // You can adjust this value based on your preference
        let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&page=${page}&pageSize=${pageSize}&apiKey=c929ae357d2c42f3b9273ad48e832f8c`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({ articles: parsedata.articles, loading: false });
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 }, this.fetchArticles);
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 }, this.fetchArticles);
    }

    render() {
        return (
            <div className="container my-3">
                <h3>NewsApp - Top Headlines</h3>
                {this.state.loading && <h4>Loading...</h4>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4 mb-3" key={element.url}>
                                <NewsItem 
                                    title={element.title ? element.title.slice(0, 45) : ""} 
                                    desc={element.description ? element.description.slice(0, 88) : ""} 
                                    imageurl={element.urlToImage} 
                                    newsurl={element.url} 
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" onClick={this.handlePrevClick} disabled={this.state.page <= 1}>&larr; Previous</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>  
            </div>
        );
    }
}

export default News;
