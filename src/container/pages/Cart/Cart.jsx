// Library
import React, {Component, Fragment} from 'react';
import Axios from 'axios';
import CartProduct from './CartProduct';
import CartProductOrder from './CartProductOrder';
import { connect } from "react-redux";
import { getSearchProduct } from "../../../redux/actions/product";

// pages

// Style
import './Cart.css';
import CartProduct2 from './CartProduct2';

const URL_STRING_PRODUCT = `${process.env.REACT_APP_URL_STRING}/product`;
const URL_STRING_CATEGORY = `${process.env.REACT_APP_URL_STRING}/category`;
const URL_STRING_CART = `${process.env.REACT_APP_URL_STRING}/cart`;

var timeInMs = Date.now();
class Cart extends Component {
  state = {
    product:[],
    products:[],
    product_search:[],
    total_price_order: 0,
    formCart:{
      name_customer: timeInMs,
      total_price_cart: 0,
      ppn: 0,
      name_user: ''
    },
    cart: [],
    score: 0,
    search: ''
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
  // getProductNsearch = async (params) => {
  //   let param = '';
  //   if(params === '0' || params === ''){
  //     param = '0'
  //   }else{
  //     param = params;
  //   }
  //   await this.props.dispatch(getSearchProduct(param))
  //   this.setState({
  //     product_search: this.props.product.product_search
  //   });
  //   console.log(this.props.product);
  //   if(this.props.product.product_search.length === 0){
  //     document.getElementById('product-empty').setAttribute('class', 'd-block');
  //   }else{
  //     document.getElementById('product-empty').setAttribute('class', 'd-none');
  //   }
  // };
  getProductNsearch = (params) => {
    let param = '';
    if(params === '0' || params === ''){
      param = '0'
    }else{
      param = params;
    }
    Axios.get(`${URL_STRING_PRODUCT}/${param}/search`, {
      headers: {
        token: localStorage.getItem('Token')
      }  
    })
    .then((response) => {
      // console.log(response.data.result.length);
      if(response.data.result.length === 0){
        document.getElementById('product-empty').setAttribute('class', 'd-block');
      }else{
        document.getElementById('product-empty').setAttribute('class', 'd-none');
      }
      this.setState({
        product_search: response.data.result,
      })
    })
  }
  getProducts = (param) => {
    Axios.get(`${URL_STRING_PRODUCT}/${param}/search`, {
      headers: {
        token: localStorage.getItem('Token')
      }  
    })
    .then((response) => {
      // console.log(response.data.result.length);
      if(response.data.result.length === 0){
        document.getElementById('product-empty').setAttribute('class', 'd-block');
      }else{
        document.getElementById('product-empty').setAttribute('class', 'd-none');
      }
      this.setState({
        products: response.data.result,
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
      this.setState({
        formCart: res.data.result[0]
      })
      let id_cart = res.data.result[0].id_cart;
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
      console.log(res.data);
      this.setState({
        formCart: res.data
      })
      this.getProductNsearch('0');
      this.getProduct();
      // 
    }, (err) => {
      console.log('error: ', err);
    })
  }
  // searchProduct = () => {
  //   Axios.get(`${URL_STRING_PRODUCT}/${this.state.search}/search`, {
  //     headers: {
  //       token: localStorage.getItem('Token')
  //     }  
  //   }).then((res) => {
  //     this.setState({
  //       product_search: res.data,
  //     })
  //   }, (err) => {
  //     console.log('error: ', err);
  //   })
  // }
  // }API

  componentDidMount(){
    this.getProductNsearch('0');
    this.getProduct();
    this.getProducts('0');
  }
  // componentDidUpdate(){
  //   if(this.state.search!==''){
  //     // this.searchProduct();
  //     // console.log('s');
  //   }else{
  //     this.getProduct();
  //   }
  // }

  handleFormChange = (event) => {
    let formCarts = {...this.state.formCart};
    formCarts[event.target.name] = event.target.value;

    this.setState({
      formCart: formCarts
    })
  }
  handleSearch = (event) => {
    let searchNow = {...this.state.search};
    searchNow = event.target.value;
    
    console.log(searchNow);
    if(searchNow !== ''){
      document.getElementById('product_search').setAttribute('class','col-12');
      document.getElementById('product_list').setAttribute('class','col-12 d-none');
    }else{
      document.getElementById('product_search').setAttribute('class','col-12 d-none');
      document.getElementById('product_list').setAttribute('class','col-12');
    }

    this.setState({
      search: searchNow
    })
    this.getProductNsearch(searchNow);
  }
  handleAddFunc = (data) => {
    this.getProductNsearch('0');
    var id_ = 'detail_cekout_'+data.id_product;
    var id_stock = 'stock_'+data.id_product;
    var id_price = 'price_'+data.id_product;
    let id_checkout = 'checkout_'+data.id_product;
    let id_added = 'added_' + data.id_product;
    let id_add = 'add_' + data.id_product;
    setTimeout(() => {
      
      // console.log(data.stock_product);
      document.getElementById(id_add).setAttribute('class','add d-none');
      document.getElementById(id_added).setAttribute('class','added');

      document.getElementById(id_).setAttribute('class','d-block');
      document.getElementById('btn-checkout').setAttribute('class', 'd-block');
      document.getElementById('cart-empty').setAttribute('class', 'd-none');
      document.getElementById('product_search').setAttribute('class','col-12 d-none');
      document.getElementById('product_list').setAttribute('class','col-12');
    }, 100)
    const cartNew = [...this.state.cart, data];
    for(let x = 0; x < this.state.cart.length; x++){
      if(this.state.cart.length > 0){
        if(data.id_product === this.state.cart[x].id_product){
          if(this.state.cart[x].qty + 1 > data.stock_product){
            // this.state.score -= 1;
            return false;
          }
          // this.state.total_price_order += 1;
          this.setState({
            total_price_order: this.state.total_price_order + this.state.cart[x].price_product
          })
    
          this.setState({
            score: this.state.score + 1
          })
          cartNew[x].qty += 1
          document.getElementById(id_stock).value = this.state.cart[x].qty;
          document.getElementById(id_price).innerHTML = 'Rp '+(this.state.cart[x].price_product * this.state.cart[x].qty);
          document.getElementById(id_checkout).setAttribute('class','row');
          return false;
        }
      }
    }
    document.getElementById(id_price).innerHTML = 'Rp '+data.price_product;
    // this.state.total_price_order += 1;
    // this.state.total_price_order += data.price_product;
    this.setState({
      cart: cartNew,
      total_price_order: this.state.total_price_order + data.price_product,
      score: this.state.score + 1,
      search: ''
    })
  }
  handleReducFunc = (data, no) => {
    var id_ = 'detail_cekout_'+data.id_product;
    var id_stock = 'stock_'+data.id_product;
    var id_price = 'price_'+data.id_product;
    let id_checkout = 'checkout_'+data.id_product;
    let id_added = 'added_' + data.id_product;
    let id_add = 'add_' + data.id_product;
    // console.log(id_);
    document.getElementById(id_).setAttribute('class','d-block');
    const cartNew = [...this.state.cart, data];
    // console.log(this.state.score);
    const scoreNew = this.state.score - 1;
    this.setState({
      score: this.state.score - 1
    })
    for(let x = 0; x < this.state.cart.length; x++){
      if(this.state.cart.length > 0){
        if(scoreNew === 0){
          document.getElementById('btn-checkout').setAttribute('class', 'd-none');
          document.getElementById('cart-empty').setAttribute('class', 'd-block');
        }
        if(data.id_product === this.state.cart[x].id_product){
          if(this.state.cart[x].qty - 1 < 1){
            document.getElementById(id_).setAttribute('class','d-none');
            document.getElementById(id_checkout).setAttribute('class','row d-none');
            if(document.getElementById(id_add) && document.getElementById(id_added)){
              document.getElementById(id_add).setAttribute('class','add');
              document.getElementById(id_added).setAttribute('class','added d-none');
            }
          }
          if(no === 1){
            cartNew[x].qty = 0;
            document.getElementById(id_).setAttribute('class','d-none');
            document.getElementById(id_checkout).setAttribute('class','row d-none');
            if(document.getElementById(id_add) && document.getElementById(id_added)){
              document.getElementById(id_add).setAttribute('class','add');
              document.getElementById(id_added).setAttribute('class','added d-none');
            }
          }else{
            cartNew[x].qty -= 1;
            this.setState({
              total_price_order: this.state.total_price_order - this.state.cart[x].price_product
            })
          }
          document.getElementById(id_stock).value = this.state.cart[x].qty;
          document.getElementById(id_price).innerHTML = 'Rp '+(this.state.cart[x].price_product * this.state.cart[x].qty);
          return false;
        }
      }
    }
    this.setState({
      cart: cartNew,
      total_price_order: this.state.total_price_order - data.price_product
    })
  }
  checkout = () => {
    if(this.state.formCart.name_customer !== ''){
      this.addCart();
    }else{
      // alert('Name customer');
    }
  }
  cancel = () => {
    this.getProductNsearch('');
    this.setState({
      search: ''
    })
    for(let x = 0; x < this.state.cart.length; x++){
      this.handleReducFunc(this.state.cart[x], 1);
    }
    this.setState({
      total_price_order: 0,
      score: 0
    })
    document.getElementById('btn-checkout').setAttribute('class', 'd-none');
    document.getElementById('cart-empty').setAttribute('class', 'd-block');
  }

  render (){
    return (
      <Fragment>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  {/* <h1 className="m-0 text-dark">Add items</h1> */}
                  {/* SEARCH FORM */}
                  <form method="post">
                    <input type="text" className="search" placeholder="Search item .." value={this.state.search} onChange={this.handleSearch} />
                  </form>
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
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-12">
                      <div id="product-empty" className="d-none">
                        <center>
                          <img src="assets/dist/img/food-and-restaurant.png" alt=""/>
                          <p className="empty-md">Your cart is empty</p>
                          <p className="empty-sm">Please add some items from the menu</p>
                        </center>
                      </div>
                    </div>
                    <div className="col-12" id="product_list">
                      <div className="row">
                        {
                          this.state.products.map(product => {
                            return (
                              <CartProduct {...product} addFunc={this.handleAddFunc} />
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className="col-12 d-none" id="product_search">
                      <div className="row">
                        {
                          this.state.product_search.map(product_search => {
                            return (
                              <CartProduct2 {...product_search} addFunc={this.handleAddFunc} />
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/* /.row */}
            </div>{/* /.container-fluid */}
          </div>
          {/* /.content */}
          <aside className="control-sidebar control-sidebar-light aside shadow cart">
            {/* Control sidebar content goes here */}
            <div className="p-3">
              <h5 className="text-center">Cart</h5>
              <div className="sm-total-cart btn-primary">
                {this.state.score}
              </div>
              <div className="d-none">
                <p className="mb-0">Invoice</p>
                <input type="text" className="customer w-100 mb-2" placeholder="Input Name Customer" name="name_customer" value={this.state.formCart.name_customer} onChange={this.handleFormChange} />
              </div>
              <p className="mt-2 mb-1">&nbsp;</p>
              <div>
                {
                  this.state.product.map(product => {
                    return (
                      <CartProductOrder {...product} addFunc={this.handleAddFunc} reduceFunc={this.handleReducFunc} />
                    )
                  })
                }
              </div>
              <div id="btn-checkout" className="d-none">
                <div className="mt-3 row">
                  <div className="col-6">Total :</div>
                  <div className="col-6 text-right">Rp {this.state.total_price_order}*</div>
                  <div className="col-12">
                    <sup>*Belum termasuk ppn</sup>
                  </div>
                </div>
                <div className="btn btn-primary w-100 cursor mt-2" data-toggle="modal" data-target="#modalVerify">
                  Cheackout
                </div>
                <div className="btn btn-danger mt-3 w-100 cursor" onClick={this.cancel}>
                  Cancel
                </div>
              </div>
              <div id="cart-empty" className="d-block">
                <center>
                  <img src="assets/dist/img/food-and-restaurant.png" alt=""/>
                  <p className="empty-md">Your cart is empty</p>
                  <p className="empty-sm">Please add some items from the menu</p>
                </center>
              </div>
            </div>
          </aside>
        </div>
        {/* delete */}
        <div className="modal fade" id="modalVerify" data-backdrop="static" role="dialog" aria-labelledby="modalVerifyLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalVerifyLabel">Delete data</h5>
              </div>
              <div className="modal-body">
                Are you sure want delete this data?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" data-target="#checkout" data-toggle="modal" onClick={this.checkout}>Oke</button>
              </div>
            </div>
          </div>
        </div>
        {/* Checkout */}
        <div className="modal fade" id="checkout" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="checkoutLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title" id="checkoutLabel">
                  <h5>Checkout</h5>
                  <sup>Cashier : {this.state.formCart.name_user}</sup>
                </div>
                <span aria-hidden="true">
                  Invoice : {this.state.formCart.name_customer}
                </span>
              </div>
              <div className="modal-body row">
              <div className="col-12">
                {
                  this.state.cart.map(cart => {
                    let id = 'checkout_'+cart.id_product;
                    return (
                      <div id={id} className="row">
                        <div className="col-8">
                          {cart.name_product} ({cart.qty}x)
                        </div>
                        <div className="col-4">
                          Rp {cart.price_product*cart.qty}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="col-8">
                Ppn 10%
              </div>
              <div className="col-4">
                Rp {this.state.formCart.ppn}
              </div>
              <div className="col-8 text-right">
                Total :
              </div>
              <div className="col-4">
                Rp {this.state.formCart.total_price_cart + this.state.formCart.ppn}
              </div>
              <div className="col-12">
                Payment: Cash
              </div>
              </div>
              <div className="m-3">
                <button type="button" className="btn btn-danger w-100" data-dismiss="modal" onClick={this.cancel}>Print</button>
              <p className="font-weight-bold text-center mt-2">
                or
              </p>
                <button type="button" className="btn btn-primary w-100" data-dismiss="modal" onClick={this.cancel}>Send Email</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ product }) => {
  return {
    product // product: product
  };
};

export default connect(mapStateToProps)(Cart);