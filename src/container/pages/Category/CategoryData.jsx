import React, { Fragment } from 'react';

var i = 0;
const CategoryData = (props) => {
  if(i>=props.number){
    i=0;
  }
  i = i + 1;
  return (
    <Fragment>
      <tr>
        <td>
          {i}
        </td>
        <td>
          {props.data.id_category}
        </td>
        <td>
          {props.data.name_category}
        </td>
        <td>
          <div className="btn btn-primary btn-sm cursor" onClick={() => props.update(props.data)} data-toggle="modal" data-target="#modalAddUpdate">Edit</div> &nbsp;
          <div className="btn btn-danger btn-sm cursor" onClick={() => props.delete(props.data)} data-toggle="modal" data-target="#modalDelete">Delete</div>
        </td>
      </tr>
    </Fragment>
  )
}

export default CategoryData;