import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";

export default class ResetPassword extends Component {


    constructor(props) {
        super(props);
        this.state = {};
    }
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
            <h2 className="fs-title">Change password</h2>
            <input type="text" id="login" name="login" placeholder="Your login" />
            <input type="password" id="password" name="password" placeholder="Password" />
            <input type="submit" id="submit" name="password" placeholder="Submit" />
            <input type="submit" name="next" className="next action-button" value="Next" />
        </fieldset>
    </form>
                        </div>
                    </div> </div>


        )
    }


}