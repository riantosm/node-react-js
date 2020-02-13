import React from 'react';

// var i = 0;
const CartProduct = ({id_product, image, name_product, price_product, stock_product, addFunc}) => {
  return (
    <div className="col-lg-4 col-md-6" id={id_product}>
      <div className="card p-3 cursor" onClick={() => addFunc({id_product, stock_product, qty: 1, name_product, price_product})}>
        <center>
          <img src={image} width="250" height="150" alt=""/>
          <div className="mt-2">
            <span className="font-weight-bold">{name_product}</span>
            <br/>
            <span className="font-weight-light">Rp {price_product}</span>
          </div>
        </center>
      </div>
    </div>
  )
}

export default CartProduct;