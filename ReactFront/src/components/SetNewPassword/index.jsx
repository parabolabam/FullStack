import React, { Component } from 'react';

export default class extends Component {




    constructor(props) {
        super(props);
        this.state = {}
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
            <h2 className="fs-title">Set new Password</h2>
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