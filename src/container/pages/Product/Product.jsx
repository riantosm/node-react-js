// Library
import React, {Component, Fragment} from 'react';
import Axios from 'axios';
import ProductData from './ProductData';

// pages

// Style
//import './Product.css';

const URL_STRING_PRODUCT = 'http://192.168.100.11:3001/api/v1/product';
const URL_STRING_CATEGORY = 'http://192.168.100.11:3001/api/v1/category';

let name_product, desc_product, image;

class Product extends Component {
  // constructor(props){
  //   super(props);

  //   this.state = {
  //     products: []
  //   }
  // }

  state = {
    category:[],
    product:[],
    formProduct: {
      id_product:'',
      name_product: '',
      desc_product: '',
      price_product: 1000,
      image:null,
      id_category:1
    },
    isUpdate: false,
    modalTitle: 'Add Product',
    number: 0,
    selectedCa: true
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
        products: response.data.result,
        number: response.data.result.length
      })
    })
  }
  addProduct = () => {
    const data = new FormData();
    data.append('image', this.state.formProduct.image);
    data.set('name_product', this.state.formProduct.name_product);
    data.set('desc_product', this.state.formProduct.desc_product);
    data.set('price_product', this.state.formProduct.price_product);
    data.set('id_category', this.state.formProduct.id_category);
    Axios.post(`${URL_STRING_PRODUCT}`, data, {
      headers: {
        token: localStorage.getItem('Token')
      }  
    }).then((res) => {
      this.getProduct();
      this.openAlert(this.state.formProduct.name_product, 'added');
      this.handleCancel();
    }, (err) => {
      console.log('error: ', err);
    })
  }
  updateProduct = () => {
    const data = new FormData();
    data.append('image', this.state.formProduct.image);
    data.set('name_product', this.state.formProduct.name_product);
    data.set('desc_product', this.state.formProduct.desc_product);
    data.set('price_product', this.state.formProduct.price_product);
    data.set('id_category', this.state.formProduct.id_category);
    Axios.patch(`${URL_STRING_PRODUCT}/${this.state.formProduct.id_product}`, data, {
      headers: {
        token: localStorage.getItem('Token')
      }  
    }).then((res) => {
      this.getProduct();
      this.openAlert(this.state.formProduct.name_product, 'updated');
      this.handleCancel();
      var attClass = 'alert alert-success alert-dismissible fade show';
      document.getElementById('alert').setAttribute('class', attClass);
    }, (err) => {
      console.log('error: ', err);
    })
  }
  deleteProduct = (data) => {
    Axios.delete(`${URL_STRING_PRODUCT}/${data}`, {
      headers: {
        token: localStorage.getItem('Token')
      }  
    }).then((res) => {
      this.getProduct();
      this.openAlert(this.state.formProduct.name_product, 'deleted');
      this.handleCancel();
    }, (err) => {
      console.log('error: ', err);
    })
  }
  // }API

  openAlert = (name, status) => {
    var attClass = 'alert alert-success alert-dismissible fade show';
    var text = `<strong id="status">Success!</strong> Data <strong>${name}</strong> successfully ${status}.`;
    document.getElementById('alert').setAttribute('class', attClass);
    document.getElementById('text-alert').innerHTML = text;
  }
  closeAlert = () => {
    var attClass = 'alert alert-success alert-dismissible fade show d-none';
    document.getElementById('alert').setAttribute('class', attClass);
  }
  
  componentDidMount(){
    this.getProduct();
    this.getCategory();
  }
  
  handleFormChange = (event) => {
    let formProductNew = {...this.state.formProduct};
    // validation{
    let patt = /[a-zA-Z0-9(),.+#%@^" -]+$/;
    let res = event.target.value.match(patt);

    if(event.target.name === 'name_product'){
      name_product = event.target.value;
    }
    if(event.target.name === 'desc_product'){
      desc_product = event.target.value;
    }
    if(event.target.name === 'price_product'){
      if(event.target.value >= 1000000){
        res = null;
      }
    }
    if(event.target.name === 'image'){
      if(event.target.value.search('.jpg') > 0){
        image = event.target.files[0];
      }else if(event.target.value.search('.jpeg') > 0){
        image = event.target.files[0];
      }else if(event.target.value.search('.png') > 0){
        image = event.target.files[0];
      }else{
        image = null;
      }
      formProductNew[event.target.name] = image;
    }else{
      formProductNew[event.target.name] = event.target.value;
    }
    if(name_product != null && desc_product != null  && image != null){
      document.getElementById('save').setAttribute('class', 'btn btn-primary');
      document.getElementById('save').setAttribute('data-dismiss', 'modal');
    }
    if(res == null){
      return false;
    }
    // }validation
    this.setState({
      formProduct: formProductNew
    })
  }
  handleUpdate = (data) => {
    this.setState({
      formProduct: data,
      isUpdate: true,
      modalTitle: 'Update Product'
    })
    document.getElementById('save').setAttribute('class', 'btn btn-primary');
    document.getElementById('save').setAttribute('data-dismiss', 'modal');
  }
  handleDetail = (data) => {
    this.setState({
      formProduct: data,
      isUpdate: true,
      modalTitle: 'Detail Product'
    })
  }
  handleDelete = (data) => {
    this.setState({
      formProduct: data
    })
  }
  deleteIt = () => {
    this.deleteProduct(this.state.formProduct.id_product);
  }
  handleSubmit = () => {
    if(this.state.formProduct.name_product === '' || this.state.formProduct.desc_product === '' || this.state.formProduct.image === null){
      alert('Form belum diisi semua ..');
    }else{
      if(this.state.isUpdate){
        this.updateProduct();
      }else{
        this.addProduct();
      }
    }
  }
  handleCancel = () => {
    this.setState({
      isUpdate: false,
      formProduct: {
        id_product:'',
        name_product: '',
        desc_product: '',
        price_product: 1000,
        image:null,
        id_category:1
      },
      modalTitle: 'Add Product'
    });
    name_product = null;
    desc_product = null;
    image = null;
    document.getElementById('save').setAttribute('class', 'btn btn-secondary');
    document.getElementById('save').setAttribute('data-dismiss', '');
  }
  render (){
    return (
      <Fragment>
        <div className="content-wrapper">
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
                <div className="col-lg-8">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div className="btn btn-primary mt-5 mb-3 cursor" data-toggle="modal" data-target="#modalAddUpdate">
                          Tambah
                        </div>
                        <div className="btn btn-primary ml-5 mt-5 mb-3 cursor">
                          Sort by name
                        </div>
                        <div className="alert alert-success alert-dismissible fade show d-none" id="alert" role="alert">
                          <span id="text-alert"></span>
                          <button type="button" className="close" onClick={this.closeAlert} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Name</th>
                              <th scope="col">Desc</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.product.map(product => {
                                return <ProductData key={product.id_product} number={this.state.number} data={product} update={this.handleUpdate} delete={this.handleDelete} detail={this.handleDetail} />
                              })
                            }
                          </tbody>
                        </table>
                        <div class="card">
            <div class="card-header">
              <h3 class="card-title">DataTable with minimal features & hover style</h3>
            </div>
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>Rendering engine</th>
                  <th>Browser</th>
                  <th>Platform(s)</th>
                  <th>Engine version</th>
                  <th>CSS grade</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Trident</td>
                  <td>Internet
                    Explorer 4.0
                  </td>
                  <td>Win 95+</td>
                  <td> 4</td>
                  <td>X</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <th>Rendering engine</th>
                  <th>Browser</th>
                  <th>Platform(s)</th>
                  <th>Engine version</th>
                  <th>CSS grade</th>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/* /.row */}
            </div>{/* /.container-fluid */}
          </div>
          {/* /.content */}
        </div>
        {/* add & update */}
        <div className="modal fade" id="modalAddUpdate" data-backdrop="static" role="dialog" aria-labelledby="modalAddUpdateTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalAddUpdateTitle">{this.state.modalTitle}</h5>
              </div>
              <div className="modal-body">
                <form encType="multipart/form-data">
                  <div className="form-group">
                    <label htmlFor="name_product">Name Product</label>
                    <input type="text" className="form-control" id="name_product" name="name_product" placeholder="Example input placeholder" value={this.state.formProduct.name_product} onChange={this.handleFormChange} require="true" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="desc_product">Description</label>
                    <textarea className="form-control" id="desc_product" name="desc_product" placeholder="Example input placeholder" value={this.state.formProduct.desc_product} onChange={this.handleFormChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price_product">Price</label>
                    <input type="number" className="form-control" id="price_product" name="price_product" placeholder="Example input placeholder" min="1000" max="10000000" value={this.state.formProduct.price_product} onChange={this.handleFormChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="productName">Category</label>
                    <select className="custom-select" name="id_category" onChange={this.handleFormChange}>
                      {
                        this.state.category.map(category => {
                          if(this.state.formProduct.id_category === category.id_category){
                            return (
                              <option key={category.id_category} value={category.id_category} selected> {category.name_category}</option>
                            )
                          }else{
                            return (
                              <option key={category.id_category} value={category.id_category}>{category.name_category}</option>
                            )
                          }
                        })
                      }
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="image" name="image" onChange={this.handleFormChange} />
                      <label className="custom-file-label" htmlFor="image">Choose file</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleCancel}>Close</button>
                <button type="button" className="btn btn-secondary" id="save" onClick={this.handleSubmit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* detail */}
        <div className="modal fade" id="modalDetail" data-backdrop="static" role="dialog" aria-labelledby="modalDetailTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalDetailTitle">{this.state.modalTitle}</h5>
              </div>
              <div className="modal-body">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td colSpan="2">
                      <img src={this.state.formProduct.image} alt="" width="100%"/>
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>{this.state.formProduct.name_product}</td>
                    </tr>
                    <tr>
                      <td>Desc</td>
                      <td>{this.state.formProduct.desc_product}</td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>{this.state.formProduct.price_product}</td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td>
                        {
                          this.state.category.map(category => {
                            if(this.state.formProduct.id_category === category.id_category){
                              return (
                                category.name_category
                              )
                            }
                          })
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleCancel}>Close</button>
              </div>
            </div>
          </div>
        </div>
        {/* delete */}
        <div className="modal fade" id="modalDelete" data-backdrop="static" role="dialog" aria-labelledby="modalDeleteLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalDeleteLabel">Delete data</h5>
              </div>
              <div className="modal-body">
                Are you sure want delete this data?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.handleCancel} data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger" onClick={this.deleteIt} data-dismiss="modal">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Product;