import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";



export default class extends Component {

    constructor(props) {
        super(props);
        console.log("Constructor called, its props is ", props);
        this.state = {}
    }


    render() {



        return (
            <button className="btn btn-primary btn-lg btnClass">
                            Sort magic
            </button>

        )

    };






}