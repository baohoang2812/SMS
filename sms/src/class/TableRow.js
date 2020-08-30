import React from 'react';
import moment from 'moment';

const TableClassRowComponent = (props) => {
  return (
    <tr className='text-center'>
      <td></td>
      <td>{props.id}</td>

      <td>{props.name}</td>

      <td>{moment(props.startDate).format('DD-MM-YYYY')}</td>

      <td>{moment(props.endDate).format('DD-MM-YYYY')}</td>

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
