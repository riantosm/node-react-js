// Library
import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Axios from 'axios';

// pages

// Style
//import './Product2.css';

const URL_STRING_PRODUCT = 'http://192.168.100.11:3001/api/v1/product';
const URL_STRING_CATEGORY = 'http://192.168.100.11:3001/api/v1/category';
let name_product, desc_product, image;

class Product2 extends Component {
  constructor(props){
    super(props);
    this.state={
      categorys:[],
      products:[],
      formProduct: {
        id_product:'',
        name_product: '',
        desc_product: '',
        stock_product: '',
        price_product: 1000,
        image:null,
        id_category:1
      },
      formStock: {
        stock: 1
      },
      isUpdate: false,
      modalTitle: 'Add Product',
      number: 0,
      selectedCa: true
    }
  }
  // API{
  getCategory = () => {
    fetch(URL_STRING_CATEGORY, {
      headers: {
        token: localStorage.getItem('Token')
      }
    },{
      method: "GET"
    }).then(response => response.json()).then(categorys => {
      this.setState({categorys: categorys.result})
    })
  }
  getProduct = () => {
    fetch(URL_STRING_PRODUCT, {
      headers: {
        token: localStorage.getItem('Token')
      }
    },{
      method: "GET"
    }).then(response => response.json()).then(products => {
      this.setState({products: products.result})
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
  addStock = (id) => {
    Axios.patch(`${URL_STRING_PRODUCT}/${id}/stock`, this.state.formStock, {
      headers: {
        token: localStorage.getItem('Token')
      }  
    }).then((res) => {
      this.getProduct();
      this.openAlert(this.state.formProduct.name_product, 'stock added');
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
  handleStockChange = (event) => {
    let formStockNew = {...this.state.formStock};
    formStockNew[event.target.name] = event.target.value;
    this.setState({
      formStock: formStockNew
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
  addIt = () => {
    // console.log(this.state.formProduct.id_product);
    this.addStock(this.state.formProduct.id_product);
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
      formStock: {
        stock: 1
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
    const columns = [
      {
        Header: 'ID',
        accessor: 'id_product',
        style:{
          textAlign: "center"
        },
        width: 50,
        minWidth: 50,
        maxWidth: 50
      },
      {
        Header: 'Product Name',
        accessor: 'name_product',
        style:{
          textAlign: "left"
        },
        width: 200,
        minWidth: 200,
        maxWidth: 200
      },
      {
        Header: 'Price',
        accessor: 'price_product',
        style:{
          textAlign: "left"
        },
        width: 200,
        minWidth: 200,
        maxWidth: 200
      },
      {
        Header: 'Category',
        accessor: 'name_category',
        style:{
          textAlign: "left"
        },
        width: 200,
        minWidth: 200,
        maxWidth: 200
      },
      {
        Header: 'Action',
        Cell: props => {
          return(
            <div>
              <button className="btn btn-primary btn-sm cursor" onClick={() => this.handleDetail(props.original)} data-toggle="modal" data-target="#modalDetail">Detail</button>
              <button className="btn btn-info btn-sm cursor ml-3" onClick={() => this.handleUpdate(props.original)} data-toggle="modal" data-target="#modalAddUpdate">Edit</button>
              <button className="btn btn-danger btn-sm cursor ml-3" data-toggle="modal" data-target="#modalDelete" onClick={() => {
                this.handleDelete(props.original)
              }}>Delete</button>
            </div>
          )
        },
        sortable: false,
        filterable: false,
        width: 200,
        minWidth: 200,
        maxWidth: 200
      }
    ]
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
                <div className="col-lg-10">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div className="btn btn-primary mt-5 mb-3 cursor" data-toggle="modal" data-target="#modalAddUpdate">
                          Tambah
                        </div>
                        <div className="alert alert-success alert-dismissible fade show d-none" id="alert" role="alert">
                          <span id="text-alert"></span>
                          <button type="button" className="close" onClick={this.closeAlert} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <ReactTable
                          columns={columns}
                          data={this.state.products}
                          filterable
                          defaultPageSize={5}
                          noDataText={'Please Wait .. '}
                          showPageSizeOptions={false}
                        />
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
                        this.state.categorys.map(category => {
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
                      <td>Stock</td>
                      <td>{this.state.formProduct.stock_product}</td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>{this.state.formProduct.price_product}</td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td>
                        {
                          this.state.categorys.map(category => {
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
                <button type="button" className="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#addStock">Add Stock</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleCancel}>Close</button>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div class="modal fade" id="addStock" tabindex="-1" role="dialog" aria-labelledby="addStockLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addStockLabel">Add Stock ({this.state.formProduct.name_product})</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <table>
                  <tr>
                    <td>Stock</td>
                    <td>
                      <input type="number" min="1" max="1000" name="stock" value={this.state.formStock.stock} onChange={this.handleStockChange} />
                    </td>
                  </tr>
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleCancel}>Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.addIt}>Add</button>
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

export default Product2;