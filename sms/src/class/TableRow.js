import React from 'react';

const TableClassRowComponent = (props) => {
  return (
    <tr className='text-center'>
      <td></td>
      <td>{props.id}</td>

      <td>{props.name}</td>

      <td>{props.startDate}</td>

      <td>{props.endDate}</td>

      <td>
        <button className='btn btn-primary' onClick={props.clickEdit}>
          Edit
        </button>
      </td>
      <td>
        <button className='btn btn-danger' onClick={props.clickRemove}>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default TableClassRowComponent;
