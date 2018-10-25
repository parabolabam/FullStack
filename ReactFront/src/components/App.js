import React, { PureComponent } from "react";
import ArticleList from "./ArticleList/index.js";
import "bootstrap/dist/css/bootstrap.css";
import "./css/style.css";
import Carousel from './Carousel.js';

import './css/style.css';
import articles from "./Articles.js";

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            reverted: false
        };
        this.revert = revert.bind(this);
    }


    render() {
        return (
            <div className="mx-auto container">
                <div className="mx-auto jumbotron header">
                    <div className="mx-auto">
                        <h1 className=" mx-auto display3">
                            Welcome to Tomato!
                        </h1>
                    </div>
                    <button className="btn btn-primary btn-lg float-right btnClass" onClick={this.revert}>
                        MakeLastArticleBeTheFirstArticle magic
                    </button>
                </div>
                <div>
                    <Carousel/>
                </div>
                <div className="articles-list"><ArticleList articles={this.state.reverted ? articles.slice().reverse() : articles}/></div></div>

        );
    }
}

function revert() {
    this.setState({
        reverted: !this.state.reverted
    });
}

export default App;