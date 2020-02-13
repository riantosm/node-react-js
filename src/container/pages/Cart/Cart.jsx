// Library
import React, {Component, Fragment} from 'react';
import Axios from 'axios';
import CartProduct from './CartProduct';

// pages

// Style
import './Cart.css';
import CartProductOrder from './CartProductOrder';

const URL_STRING_PRODUCT = 'http://192.168.100.11:3001/api/v1/product';
const URL_STRING_CATEGORY = 'http://192.168.100.11:3001/api/v1/category';
const URL_STRING_CART = 'http://192.168.100.11:3001/api/v1/cart';

class Cart extends Component {
  state = {
    product:[],
    total_price_order: 0,
    formCart:{
      name_customer: '',
      total_price_cart: 0,
      ppn: 0
    },
    cart: []
  }

  // API{
  getCategory = () => {
    Axios.get(URL_STRING_CATEGORY, {
      headers: {
        token: localStorage.getItem('Token')
      }
    })
    .then(response => {
      this.setState({
        category: response.data.result
      })
    })
  }
  getProduct = () => {
    Axios.get(URL_STRING_PRODUCT, {
      headers: {
        token: localStorage.getItem('Token')
      }  
    })
    .then((response) => {
      this.setState({
        product: response.data.result,
      })
    })
  }
  addCart = () => {
    // console.log(this.state.name_customer);
    // console.log(this.state.cart.length);
    // for(let x = 0; x < this.state.cart.length; x++){
    //   console.log(this.state.cart[x])
    // }
    Axios.post(URL_STRING_CART, this.state.formCart, {
      headers: {
        token: localStorage.getItem('Token')
      }  
    }).then((res) => {
      console.log(res);
      let id_cart = res.data.result.insertId
      this.addCartDetail(id_cart);
    }, (err) => {
      console.log('error: ', err);
    })
  }
  addCartDetail = async (id) => {
    // 
    for(let x = 0; x < this.state.cart.length; x++){
      await Axios.post(`${URL_STRING_CART}/${id}`, this.state.cart[x], {
        headers: {
          token: localStorage.getItem('Token')
        }  
      }).then((res) => {
        // 
        // 
      }, (err) => {
        console.log('error: ', err);
      })
    }
    // 
    await Axios.get(`${URL_STRING_CART}/${id}`, {
      headers: {
        token: localStorage.getItem('Token')
      }  
    }).then((res) => {
      // 
      this.setState({
        formCart: res.data
      })
      // 
    }, (err) => {
      console.log('error: ', err);
    })
  }
  // }API

  componentDidMount(){
    this.getProduct();
  }

  handleFormChange = (event) => {
    let formCarts = {...this.state.formCart};
    formCarts[event.target.name] = event.target.value;

    this.setState({
      formCart: formCarts
    })
  }
  handleAddFunc = (data) => {
    var id_ = 'detail_cekout_'+data.id_product;
    var id_s = 'stock_'+data.id_product;
    // console.log(data.stock_product);
    document.getElementById(id_).setAttribute('class','d-block');
    const cartNew = [...this.state.cart, data];
    for(let x = 0; x < this.state.cart.length; x++){
      if(this.state.cart.length > 0){
        if(data.id_product === this.state.cart[x].id_product){
          if(this.state.cart[x].qty + 1 > data.stock_product){
            return false;
          }
          this.state.cart[x].qty = this.state.cart[x].qty + 1
          // console.log(this.state.cart[x].qty);
          document.getElementById(id_s).value = this.state.cart[x].qty;
          return false;
        }
      }
    }
    this.setState({
      cart: cartNew
    })
  }
  handleReducFunc = (data) => {
    var id_ = 'detail_cekout_'+data.id_product;
    var id_s = 'stock_'+data.id_product;
    // console.log(id_);
    document.getElementById(id_).setAttribute('class','d-block');
    const cartNew = [...this.state.cart, data];
    for(let x = 0; x < this.state.cart.length; x++){
      if(this.state.cart.length > 0){
        if(data.id_product === this.state.cart[x].id_product){
          if(this.state.cart[x].qty - 1 < 1){
            document.getElementById(id_).setAttribute('class','d-none');
          }
          this.state.cart[x].qty = this.state.cart[x].qty - 1
          console.log(this.state.cart[x].qty);
          document.getElementById(id_s).value = this.state.cart[x].qty;
          return false;
        }
      }
    }
    this.setState({
      cart: cartNew
    })
  }
  checkout = () => {
    if(this.state.formCart.name_customer !== ''){
      this.addCart();
    }else{
      // alert('Name customer');
    }
    console.log(this.state.formCart);
    console.log(this.state.cart);
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
                  <h1 className="m-0 text-dark">Add items</h1>
                  <br/>
                  {/* SEARCH FORM */}
                  {/* <form className="form-inline">
                    <div className="input-group input-group-sm">
                      <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" onChange={this.search} />
                    </div>
                  </form> */}
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                {/* <div className="col-12">
                  <div class="btn-group w-100 mb-2">
                    <div class="btn btn-info active" data-filter="all"> All items </div>
                    <div class="btn btn-info" data-filter="1"> Category 1 (Food) </div>
                    <div class="btn btn-info" data-filter="2"> Category 2 (Drink) </div>
                  </div>
                </div> */}
                <div className="col-12 mt-3">
                  <div className="container">
                    <div className="row">
                      {
                        this.state.product.map(product => {
                          return (
                            <CartProduct {...product} addFunc={this.handleAddFunc} />
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
          <aside className="control-sidebar control-sidebar-dark aside">
            {/* Control sidebar content goes here */}
            <div className="p-3">
              <h5>Cart</h5>
              <p className="mb-0">Name Customer</p>
              <input type="text" className="customer w-100 mb-2" placeholder="Input Name Customer" name="name_customer" value={this.state.formCart.name_customer} onChange={this.handleFormChange} />
              <p className="mt-2 mb-1">Detail cart</p>
              
              {
                this.state.product.map(product => {
                  return (
                    <CartProductOrder {...product} addFunc={this.handleAddFunc} reduceFunc={this.handleReducFunc} />
                  )
                })
              }

              {/* <div className="price">
                Total Price : Rp {this.state.total_price_order}
              </div> */}
              <div className="btn btn-primary mt-3 w-100 cursor" data-toggle="modal" data-target="#staticBackdrop" onClick={this.checkout}>
                Cheackout
              </div>
            </div>
          </aside>
        </div>
        {/* Checkout */}
        <div className="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title" id="staticBackdropLabel">
                  <h5>Checkout</h5>
                  <sup>Cashier : Admin</sup>
                </div>
                <span aria-hidden="true">
                  Order Name : {this.state.formCart.name_customer}
                </span>
              </div>
              <div className="modal-body">
                <table className="table table-striped">
                <tbody>
                  {
                    this.state.cart.map(cart => {
                      return (
                        <tr>
                          <td>{cart.name_product} ({cart.qty}x)</td>
                          <td width="150">Rp {cart.price_product*cart.qty}</td>
                        </tr>
                      )
                    })
                  }

                  <tr>
                    <td>Ppn 10%</td>
                    <td width="150">Rp {this.state.formCart.ppn}</td>
                  </tr>
                  <tr>
                    <td className="text-right">Total :</td>
                    <td width="150">Rp {this.state.formCart.total_price_cart + this.state.formCart.ppn}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="m-3">
                <a href="/cart">
                  <button type="button" className="btn btn-secondary w-100">Print</button>
                </a>
                <p className="font-weight-bold text-center mt-2">
                  or
                </p>
                <a href="/cart">
                  <button type="button" className="btn btn-primary w-100">Send Email</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Cart;