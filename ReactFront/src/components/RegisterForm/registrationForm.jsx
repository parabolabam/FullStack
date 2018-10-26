import React, { Component } from "react";
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.css";

export default class registerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            response: ''

        }
    }

    // componentDidMount() {

 //     this.callApi().then((res) => {

 //         this.setState({ responce: res })
 //     }).catch((err) => console.log(err + ""));

 // }

 // callApi = () => {
 //     const response = fetch('/');
 //     const body = JSON.stringify(response);
 //     return new Promise((resolve, reject) => {
 //         // if (response.status !== 200) reject(body.message);
 //         resolve(body)
 //     });
 // }

    render() {

        return (
            <div className = "header mx-auto jumbotron header" >
            <div id ="nameBtnID">
                       <div>
                            <h1 className="mx-auto display3">
                                <div>Welcome to Tomato!</div>
                            </h1>
                       </div>
                        <div className="mx-auto">
                            <form id="msform" method="POST">
        <fieldset>
            <h2 className="fs-title">Create your account</h2>
            <input type="text" id="login" name="login" placeholder="Your login" />
            <input type="text" id="email" name="email" placeholder="Email" />
            <input type="password" id="password" name="password" placeholder="Password" />
            <input type="password" id="confirm" name="confirm" placeholder="Confirm Password" />
            <input type="submit" name="next" className="next action-button" value="Next" />
        </fieldset>
    </form>
                        </div>
                    </div> </div>




        )


    }


}