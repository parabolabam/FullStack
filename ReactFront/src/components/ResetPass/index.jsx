import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './css/style.css';


export default class ResetPass extends Component {


    constructor(props) {

        super(props);
        this.state = {};
    }



    render() {



        return (


            <div className = "header mx-auto jumbotron header" >
    <div id ="nameBtnID">
                       <div>              <h1 className="mx-auto display3">
                                <div>Welcome to Tomato!</div>
                            </h1>
                       </div>
                        <div className="mx-auto">
                            <form id="msform" method="POST">
        <fieldset>
            <h2 className="fs-title">Reset password</h2>
            <input type="text" id="email" name="email" placeholder="Email you pointed when registred" />
            <input type="submit" name="next" className="next action-button sizeble" value="reset password" onClick={()=>{
                window.location.href='/';
            }} />

        </fieldset>
    </form>
                        </div>
                    </div> </div>






        )
    }


}