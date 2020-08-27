import React from "react";
import {Link} from "react-router-dom";

const Table_student_rowComponent = props => {

    return (
        <tr className="text-center">
            <td>

            </td>
            <td>
                {props.id}
            </td>

            <td>
               {props.firstname}
            </td>

            <td>
                {props.lastname}
            </td>
            <td>
                <Link to={"/student/" + props.id}>
                    <button className="btn btn-primary">Edit</button>
                </Link>
            </td>
            <td>
                <button className="btn btn-danger">Remove</button>
            </td>
        </tr>
    );

}

export default Table_student_rowComponent;