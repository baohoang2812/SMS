import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default class Table_student_rowComponent extends Component {

    constructor(props) {
        super(props);
        this.requestRemove = this.requestRemove.bind(this);
        this.state = {
            id: props.id,
            firstName: props.firstName,
            lasName: props.lastName,
            doB: props.doB
        }
    }

    requestRemove() {
        axios.delete("http://localhost:59677/api/students/" + this.state.id, {
            headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`}
        }).then(res => {
            window.alert("Student removed!");
        }).catch(error => {
            this.setState({isError: true});
        });
    }

    render() {
        return (
            <tr className="text-center">
                <td>

                </td>
                <td>
                    {this.state.id}
                </td>

                <td>
                    {this.state.firstName}
                </td>

                <td>
                    {this.state.lastName}
                </td>
                <td>
                    {this.state.doB}
                </td>
                <td>
                    <Link to={"/student/" + this.state.id}>
                        <button className="btn btn-primary">Edit</button>
                    </Link>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.requestRemove}>Remove</button>
                </td>
            </tr>
        );
    }
}