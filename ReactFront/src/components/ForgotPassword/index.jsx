import React, { Component } from 'react';



export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        }

    }

    render() {
        return (
            <div>
				<form method="POST">
						<input type="submit" value="reset password" name="resetPassword"/>	
				</form>

			</div>
        )

    }


}