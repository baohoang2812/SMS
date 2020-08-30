import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import moment from 'moment';

export default class Table_student_rowComponent extends Component {

    constructor(props) {
        super(props);
        this.requestRemove = this.requestRemove.bind(this);
    }

    requestRemove() {
        axios.delete("http://localhost:59677/api/students/" + this.props.id, {
            headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`}
        }).then(res => {
            window.location.reload(false);
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
                    {this.props.id}
                </td>

                <td>
                    {this.props.firstName}
                </td>

                <td>
                    {this.props.lastName}
                </td>
                <td>
                    {moment(this.props.doB).format('DD-MM-YYYY')}
                </td>
                <td>
                    <Link to={"/student/" + this.props.id}>
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