'use strict'

import React, { PureComponent } from 'react'
import Article from '../Article/Article.jsx'
import './style.css'


export default class ArticlesList extends PureComponent {


    constructor(props) {

        super(props);
        this.state = {
            openArticleId: null,

        }
    }


    render() {
        const articlesElements = this.props.articles.map((article) =>
            <li key={article.id} className="article-list">
         <Article article={article} 
         isOpen={this.state.openArticleId === article.id}
         onButtonClick = {this.handleClick.bind(this, article.id)} />
         </li>);

        return (
            <ul>
            {articlesElements}
        </ul>

        )
    }

    handleClick = (openArticleId) => {
        this.setState({
            openArticleId: this.state.openArticleId === openArticleId ? null : openArticleId,

        })
    }

}