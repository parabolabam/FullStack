import React, { Component } from "react";
import Button from '../Button/Button.jsx';


export default class LogoutBtn extends Component {



    render() {



        return (


            <button type="submit" className="btn btn-primary btn-lg btnClass" method="POST" name="LogOut">Log out</button>


        )

    }

}