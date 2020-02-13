// Library
import React, {Component, Fragment} from 'react';
import CartProduct2 from './CartProduct2';

// pages

// Style
//import './Cart2.css';

const product = [
  {
    id: 1,
    name_product: 'Apple',
    desc_product: 'asd',
    image: '',
    price_product: 1
  },
  {
    id: 2,
    name_product: 'Apple2',
    desc_product: 'asd',
    image: '',
    price_product: 1
  },
  {
    id: 3,
    name_product: 'Apple3',
    desc_product: 'asd',
    image: '',
    price_product: 1
  },
  {
    id: 4,
    name_product: 'Apple4',
    desc_product: 'asd',
    image: '',
    price_product: 1
  },
]

class Cart2 extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      cart: [
        {
          id: 4,
          name_product: 'Apple4',
          desc_product: 'asd',
          image: '',
          price_product: 1,
          qty: 1
        }
      ]
    }
  }

  handleAddFunc(product){
    
    // const existingProduct = this.state.cart.map(p => {
    //   if(p.id === product.id){
    //     return p
    //   }
    // });
    // console.log('existingProduct: ' ,existingProduct[0]);
    // if(existingProduct[0] != undefined){
    //   const withoutExistingProduct = this.state.cart.map(p => {
    //     if(p.id !== product.id){
    //       return p
    //     }else{
    //       return false
    //     }
    //   });
    //   const updatedQty = {
    //     ...existingProduct[0],
    //     qty: existingProduct[0].qty + product.qty
    //   }
    //   console.log(existingProduct[0]);
    //   console.log(updatedQty);
    //   this.setState({
    //     cart: [...withoutExistingProduct, updatedQty]
    //   })
    // }else{
    //   console.log('to');
    // }
  }

  render (){
    return (
      <Fragment>
        <div className="content-wrapper pb-5">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">Product list</h1>
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="container">
                    <div className="row">
                      <ul>
                        {
                          this.state.cart.map(c => {
                            return(
                              <li>
                                {c.name_product} | {c.qty} pcs
                              </li>
                            )
                          })
                        }
                      </ul>
                     {
                        product.map(p => {
                          return (
                            <CartProduct2 key={p.id} {...p} addFunc={this.handleAddFunc.bind(this)} />
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            {/* /.row */}
            </div>{/* /.container-fluid */}
          </div>
          {/* /.content */}
        </div>
      </Fragment>
    )
  }
}

export default Cart2;