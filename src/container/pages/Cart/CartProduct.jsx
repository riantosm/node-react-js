import React from 'react';

// var i = 0;
const CartProduct = ({id_product, image, name_product, price_product, stock_product, addFunc}) => {
  let id_added = 'added_' + id_product;
  let id_add = 'add_' + id_product;
  // if(id_product === 1){
  //   console.log('ada');
  // }
  return (
    <div className="col-lg-4 col-md-6" id={id_product}>
      <div className="card cursor" onClick={() => addFunc({id_product, stock_product, qty: 1, name_product, price_product})}>
        <div className="added d-none" id={id_added}>
          <i className="far fa-check-circle"></i>
        </div>
        <div className="add" id={id_add}>
          <i className="fas fa-cart-plus"></i>
        </div>
        <center className="m-3">
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