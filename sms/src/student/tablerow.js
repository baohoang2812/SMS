import React from "react";

const TableRow = props => {

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
                <button className="btn btn-primary">Edit</button>
            </td>
            <td>
                <button className="btn btn-danger">Remove</button>
            </td>
        </tr>
    );

}

export default TableRow;