import React from "react";

const Table_class_rowComponent = props => {

    return (
        <tr className="text-center">
            <td>

            </td>
            <td>
                {props.id}
            </td>

            <td>
                {props.name}
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

export default Table_class_rowComponent;