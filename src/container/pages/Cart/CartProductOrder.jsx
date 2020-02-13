import React from 'react';

// var i = 0;
const CartProductOrder = ({id_product, image, name_product, price_product, stock_product, addFunc, reduceFunc}) => {
  let idnya = 'detail_cekout_'+id_product;
  let idnyaS = 'stock_'+id_product;
  return (
    <div className="d-none" id={idnya}>
      <div className="media">
        <img src={image} width="70px" height="50px" alt=""/>
        <p className="mt-0 text-truncate pl-2">
          {name_product}
          <br/>
          Rp {price_product}
        </p>
      </div>
      <div className="qty w-100 text-center">
        <sub>Stock Available : {stock_product}</sub>
        <br/>
        <div className="btn btn-primary cursor mt-1" onClick={() => reduceFunc({id_product})}>-</div>
        <input type="number" defaultValue="1" id={idnyaS} min="1" max="5" readOnly/>
        <div className="btn btn-primary cursor" onClick={() => addFunc({id_product, stock_product, name_product, price_product})}>+</div>
      </div>
      <hr className="hr-cus"/>
    </div>
  )
}

export default CartProductOrder;