import React, { Component } from 'react';

export default class ResetPassOneClick extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clicked: false
        }
    }
    render() {

        return (

            <div>
					<form action="" method="POST">
						<input type="submit" name="reset" value="Reset pass"/>
					</form>
			</div>

        )

    }

}