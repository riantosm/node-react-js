import React from 'react';

// var i = 0;
const CartProduct2 = ({id_product, image, name_product, price_product, stock_product, addFunc}) => {
  // let id_added = 'added_' + id_product;
  // let id_add = 'add_' + id_product;
  // if(id_product === 1){
  //   console.log('ada');
  // }
  return (
    <div className="col-md-6 p-0">
      <div className="card-cart p-0">
        <div className="m-3 cart-conte-n media cursor" onClick={() => addFunc({id_product, stock_product, qty: 1, name_product, price_product})}>
          {/* <div className="added d-none" onClick={() => addFunc({id_product, stock_product, qty: 1, name_product, price_product})}>
            <i className="far fa-check-circle"></i>
          </div>
          <div className="add" onClick={() => addFunc({id_product, stock_product, qty: 1, name_product, price_product})}>
            <i className="fas fa-cart-plus"></i>
          </div> */}
          <img src={image} width="100" height="70" alt=""/>
          <div class="media-body ml-3">
            <span className="font-weight-bold">
              {name_product}
            </span>
            <br/>
            <span className="font-weight-light">
              Rp {price_product}
            </span>
            <br/>
            <span className="text-secondary">
              Stock : {stock_product  }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartProduct2;