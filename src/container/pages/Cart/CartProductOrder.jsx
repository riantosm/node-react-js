import React from 'react';

// var i = 0;
const CartProductOrder = ({id_product, image, name_product, price_product, stock_product, addFunc, reduceFunc}) => {
  let idnya = 'detail_cekout_'+id_product;
  let idnyaStock = 'stock_'+id_product;
  let idnyaPrice = 'price_'+id_product;
  return (
    <div className="d-none" id={idnya}>
      <div className="media">
        <img src={image} width="100px" height="100px" alt=""/>
        <div className="qty">
          <p className="mt-0 text-truncate pl-2">
            <b>{name_product}</b>
            <br/>
            <sup>Stock Available : {stock_product}</sup>
          </p>
          <div className="m-2">
            <div className="btn btn-green cursor" onClick={() => reduceFunc({id_product}, 0)}>-</div>
            <input type="number" defaultValue="1" id={idnyaStock} min="1" max="5" readOnly/>
            <div className="btn btn-green cursor" onClick={() => addFunc({id_product, stock_product, name_product, price_product})}>+</div>
            <span className="float-right mt-1 text-sm">
              <b id={idnyaPrice}>Rp</b>
            </span>
          </div>
        </div>
      </div>
      {/* <hr className="hr-cus"/> */}
    </div>
  )
}

export default CartProductOrder;