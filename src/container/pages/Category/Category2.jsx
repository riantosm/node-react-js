// Library
import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Axios from 'axios';
import { connect } from "react-redux";
import { postNewCategory, patchNewCategory, deleteNewCategory } from "../../../redux/actions/category";

// pages

// Style
//import './Product2.css';

const URL_STRING_CATEGORY = 'http://192.168.100.11:3001/api/v1/category';

class Category2 extends Component {
  constructor(props){
    super(props);
    this.state={
      categorys: [],
      formCategory: {
        id_category:'',
        name_category: ''
      },
      isUpdate: false,
      modalTitle: 'Add Product',
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
  // addCategory = () => {
  //   Axios.post(URL_STRING_CATEGORY, this.state.formCategory, {
  //     headers: {
  //       token: localStorage.getItem('Token')
  //     }  
  //   }).then((res) => {
  //     this.getCategory();
  //     this.openAlert(this.state.formCategory.name_category, 'added');
  //     this.handleCancel();
  //   }, (err) => {
  //     console.log('error: ', err);
  //   })
  // }
  postCategory = form => {
    this.props.dispatch(postNewCategory(form));
    setTimeout(this.getCategory, 100);
    this.openAlert(this.state.formCategory.name_category, 'added');
    this.handleCancel();
  };
  // updateCategory = () => {
  //   Axios.patch(`${URL_STRING_CATEGORY}/${this.state.formCategory.id_category}`, this.state.formCategory, {
  //     headers: {
  //       token: localStorage.getItem('Token')
  //     }  
  //   }).then((res) => {
  //     this.getCategory();
  //     this.openAlert(this.state.formCategory.name_category, 'updated');
  //     this.handleCancel();
  //     var attClass = 'alert alert-success alert-dismissible fade show';
  //     document.getElementById('alert').setAttribute('class', attClass);
  //   }, (err) => {
  //     console.log('error: ', err);
  //   })
  // }
  patchCategory = form => {
    this.props.dispatch(patchNewCategory(form));
    setTimeout(this.getCategory, 100);
    this.openAlert(this.state.formCategory.name_category, 'updated');
    this.handleCancel();
    var attClass = 'alert alert-success alert-dismissible fade show';
    document.getElementById('alert').setAttribute('class', attClass);
    this.handleCancel();
  };
  // deleteCategory = (data) => {
  //   Axios.delete(`${URL_STRING_CATEGORY}/${data}`, {
  //     headers: {
  //       token: localStorage.getItem('Token')
  //     }  
  //   }).then((res) => {
  //     this.getCategory();
  //     this.openAlert(this.state.formCategory.name_category, 'deleted');
  //     this.handleCancel();
  //   }, (err) => {
  //     console.log('error: ', err);
  //   })
  // }
  deleteCategory = form => {
    this.props.dispatch(deleteNewCategory(form));
    setTimeout(this.getCategory, 100);
    this.openAlert(this.state.formCategory.name_category, 'deleted');
    this.handleCancel();
    var attClass = 'alert alert-success alert-dismissible fade show';
    document.getElementById('alert').setAttribute('class', attClass);
    this.handleCancel();
  };

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
    this.getCategory();
  }

  handleFormChange = (event) => {
    let formCategoryNew = {...this.state.formCategory};
    formCategoryNew[event.target.name] = event.target.value;
    // validation{
    let patt = /[a-zA-Z0-9 ]+$/;
    let res_name = formCategoryNew.name_category.match(patt);
    if(res_name == null){
      return false;
    }
    document.getElementById('save').setAttribute('class', 'btn btn-primary');
    document.getElementById('save').setAttribute('data-dismiss', 'modal');
    // }validation
    this.setState({
      formCategory: formCategoryNew
    })
  }
  handleSubmit = () => {
    if(this.state.formCategory.name_category === ''){
      alert('Form belum diisi semua ..');
    }else{
      if(this.state.isUpdate){
        // this.updateCategory();
        this.patchCategory(this.state.formCategory)
      }else{
        // this.addCategory();
        this.postCategory(this.state.formCategory)
      }
    }
  }
  handleCancel = () => {
    this.setState({
      isUpdate: false,
      formCategory: {
        id_category:'',
        name_category: ''
      },
      modalTitle: 'Add Product'
    })
    document.getElementById('save').setAttribute('class', 'btn btn-secondary');
  }
  handleUpdate = (data) => {
    this.setState({
      formCategory: data,
      isUpdate: true,
      modalTitle: 'Update Product'
    })
    console.log(this.state.formCategory);
    console.log(data);
  }
  handleDelete(data){
    this.setState({
      formCategory: data
    })
  }
  deleteIt = () => {
    this.deleteCategory(this.state.formCategory);
  }

  render (){
    const columns = [
      {
        Header: 'ID',
        accessor: 'id_category',
        style:{
          textAlign: "center"
        },
        width: 50,
        minWidth: 50,
        maxWidth: 50
      },
      {
        Header: 'Category Name',
        accessor: 'name_category',
        style:{
          textAlign: "left"
        }
      },
      {
        Header: 'Action',
        Cell: props => {
          return(
            <div>
              <button className="btn btn-primary btn-sm cursor" onClick={() => this.handleUpdate(props.original)} data-toggle="modal" data-target="#modalAddUpdate">Edit</button>
              <button className="btn btn-danger btn-sm cursor ml-3" data-toggle="modal" data-target="#modalDelete" onClick={() => {
                this.handleDelete(props.original)
              }}>Delete</button>
            </div>
          )
        },
        sortable: false,
        filterable: false,
        width: 150,
        minWidth: 150,
        maxWidth: 150
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
                  <h1 className="m-0 text-dark">Category list</h1>
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
                        <div className="alert alert-success alert-dismissible fade show d-none" id="alert" role="alert">
                          <span id="text-alert"></span>
                          <button type="button" className="close" onClick={this.closeAlert} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <ReactTable
                          columns={columns}
                          data={this.state.categorys}
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
              <center>
                Name Category : <input type="text" value={this.state.formCategory.name_category} name="name_category" onChange={this.handleFormChange} />
              </center>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleCancel}>Close</button>
                <button type="button" className="btn btn-secondary" id="save" onClick={this.handleSubmit}>Save changes</button>
                {/* onClick={this.handleSubmit} data-dismiss="modal" */}
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

const mapStateToProps = ({ category }) => {
  return {
    category // category: category
  };
};

export default connect(mapStateToProps)(Category2);