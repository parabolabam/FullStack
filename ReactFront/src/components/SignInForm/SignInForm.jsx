import React, { Component } from "react";
import ForgotPassword from '../ForgotPassword';
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.css";


export default class SignInForm extends Component {


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
            <h2 className="fs-title">Sign in</h2>
            <input type="text" id="login" name="login" placeholder="Your login" />
            <input type="password" id="password" name="password" placeholder="Password" />
            <input type="submit" name="next" className="next action-button" value="Next" />
            <ForgotPassword clicked={false}/>
        </fieldset>
    </form>
                        </div>
                    </div> </div>



            //         <div className = "header mx-auto jumbotron header" >
            //         <div id ="nameBtnID">
            //                    <div>
            //                         <h1 className="mx-auto display3">
            //                             <div>Welcome to Tomato!</div>
            //                         </h1>
            //                    </div>
            //                     <div className="mx-auto">
            //                         <form id="msform" method="POST">
            //     <fieldset>
            //         <h2 className="fs-title">Sign in</h2>
            //         <input type="text" id="login" name="login" placeholder="Your login"></input>
            //         <input type="password" id="password" name="password" placeholder="Password" /></input>
            //         <input type="submit" name="Sign in" id="signin" class="next action-button" value="Sign in" /></input>
            //         <input type="button" onclick="window.location.href='/'" value="Sign up"></input>
            //     </fieldset>
            // </form>
            //                     </div>
            //                 </div> </div>


            //             <div>
            //             <form id="msform" method="POST">
            //         <fieldset>
            //             <h2 class="fs-title">Sign in</h2>
            //             <input type="text" id="login" name="login" placeholder="Your login" />
            //             <input type="password" id="password" name="password" placeholder="Password" />
            //             <input type="submit" name="Sign in" id="signin" class="next action-button" value="Sign in" />
            //             <input type="button" onclick="window.location.href='/'" value="Sign up">
            //             <div id="vk_auth"></div>
            //         </fieldset>
            //     </form>

            // </div>

        )


    }


}