import React from 'react';

var i = 0;
const ProductData = (props) => {
  if(i>=props.number){
    i=0;
  }
  i = i + 1;
  return (
    <tr>
      <td>
        {props.data.rank}
      </td>
      <td>
        {props.data.name_product}
      </td>
      <td>
        {props.data.desc_product}
      </td>
      <td>
        <div className="btn btn-primary btn-sm cursor" onClick={() => props.detail(props.data)} data-toggle="modal" data-target="#modalDetail">Detail</div> &nbsp;
        <div className="btn btn-info btn-sm cursor" onClick={() => props.update(props.data)} data-toggle="modal" data-target="#modalAddUpdate">Edit</div> &nbsp;
        <div className="btn btn-danger btn-sm cursor" onClick={() => props.delete(props.data)} data-toggle="modal" data-target="#modalDelete">Delete</div>
      </td>
    </tr>
  )
}

export default ProductData;