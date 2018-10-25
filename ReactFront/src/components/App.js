import React, {PureComponent} from "react";
import ArticleList from "./ArticleList/index.js";
import "bootstrap/dist/css/bootstrap.css";
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
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display3">
                        Tomato
                        <button className="btn" onClick={this.revert}>
                            Revert
                        </button>
                    </h1>
                </div>
                <ArticleList
                    articles={this.state.reverted ? articles.slice().reverse() : articles}
                />
            </div>
        );
    }
}

function revert() {
    this.setState({
        reverted: !this.state.reverted
    });
}

export default App;
