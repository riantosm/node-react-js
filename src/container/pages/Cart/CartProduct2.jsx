import React from 'react';

// var i = 0;
const CartProduct2 = ({id_product, image, name_product, price_product, stock_product, addFunc}) => {
  // let id_added = 'added_' + id_product;
  // let id_add = 'add_' + id_product;
  // if(id_product === 1){
  //   console.log('ada');
  // }
  return (
    <div className="col-xl-3 col-lg-4 col-sm-6 p-0">
      <div className="card-cart p-0">
      <center>
        <div className="m-3 cart-conten">
          <div className="added d-none" onClick={() => addFunc({id_product, stock_product, qty: 1, name_product, price_product})}>
            <i className="far fa-check-circle"></i>
          </div>
          <div className="add" onClick={() => addFunc({id_product, stock_product, qty: 1, name_product, price_product})}>
            <i className="fas fa-cart-plus"></i>
          </div>
          {/* <center>
            <div width="240px" className="cart-conten"> */}
              <img src={image} width="240" height="150" alt=""/>
              <div className="mt-2 text-left">
                <span className="font-weight-bold">{name_product}</span>
                <br/>
                <span className="font-weight-light">Rp {price_product}</span>
              </div>
            {/* </div>
          </center> */}
        </div></center>
      </div>
    </div>
  )
}

export default CartProduct2;