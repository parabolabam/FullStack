import React, { Component } from "react";


export default class LogoutBtn extends Component {



    render() {
        // const logOut = () => {
        //     window.location.href = '/logout';
        // }
        return (

            <form method="POST">
            	<input type="submit" className="btn btn-primary btn-lg btnClass" value="Log out"/>
			</form>
        )

    }

}