import React, { PureComponent } from "react";
import ArticleList from "../ArticleList/index.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "./css/style.css";
import Carousel from '../Carousel/Carousel.jsx';
import articles from "../Articles/Articles.jsx";
import Logoutbtn from '../LogoutBtn/LogoutBtn.jsx';
import Button from '../Button/Button.jsx';


class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            reverted: false
        };
        // this.revert = revert.bind(this);
    }




    render() {
        function revert() {
            console.log("Called revert()");
            this.setState({
                reverted: !this.state.reverted
            });
        }
        return (
            <div className="mx-auto container">
                <div className="header mx-auto jumbotron header">
                   <div id ="nameBtnID">
                       <div>
                            <h1 className="mx-auto display3">
                                <div>Welcome to Tomato!</div>
                            </h1>
                       </div>
                        <div id="LogoutMagicContainer">
                            <Logoutbtn/>
                        </div>
                    </div>
                </div>
                <div>
                    <Carousel/>
                </div>
                <div className="articles-list">
                <ArticleList articles={this.state.reverted ? articles.slice().reverse() : articles}/>
                </div>
                </div>

        );
    }
}

export default App;