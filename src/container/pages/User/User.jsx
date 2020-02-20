// Library
import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
// import Axios from 'axios';
import { connect } from "react-redux";
import { postNewUser, getAllUser } from "../../../redux/actions/user";

// pages

// Style
//import './User.css';

const URL_STRING_USER = `${process.env.REACT_APP_URL_STRING}/user`;

class User extends Component {
  constructor(props){
    super(props);
    this.state={
      userData: [],
      users: [],
      formUser: {
        id_user:'',
        name_user: '',
        username: '',
        password:''
      },
      isUpdate: false,
      modalTitle: 'Add Product',
    }
  }
  // API{
  getUser = () => {
    fetch(URL_STRING_USER, {
      headers: {
        token: localStorage.getItem('Token')
      }
    },{
      method: "GET"
    }).then(response => response.json()).then(users => {
      // console.log(response);
      this.setState({users: users.result})
    })
  }
  getUsers = async () => {
    await this.props.dispatch(getAllUser())
    this.setState({
      userData: this.props.user.userData
    });
  };
  // addUser = () => {
  //   Axios.post(URL_STRING_USER, this.state.formUser, {
  //     headers: {
  //       token: localStorage.getItem('Token')
  //     }  
  //   }).then((res) => {
  //     this.getUser();
  //     this.openAlert(this.state.formUser.name_user, 'added');
  //     this.handleCancel();
  //   }, (err) => {
  //     console.log('error: ', err);
  //   })
  // }
  postUser = form => {
    this.props.dispatch(postNewUser(form));
    setTimeout(this.getUser, 100);
    this.openAlert(this.state.formUser.name_user, 'added');
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
    this.getUser();
    this.getUsers();
  }
  
  handleFormChangeName = (event) => {
    let formUserNew = {...this.state.formUser};
    formUserNew[event.target.name] = event.target.value;
    // validation{
    let patt = /[a-zA-Z0-9 ]+$/;
    let res_name = formUserNew.name_user.match(patt);
    if(res_name == null){
      return false;
    }
    document.getElementById('save').setAttribute('class', 'btn btn-primary');
    document.getElementById('save').setAttribute('data-dismiss', 'modal');
    // }validation
    this.setState({
      formUser: formUserNew
    })
  }
  handleFormChange = (event) => {
    let formUserNew = {...this.state.formUser};
    formUserNew[event.target.name] = event.target.value;
    // validation{
    let patt = /[a-z0-9]+$/;
    let res_name = formUserNew.username.match(patt);
    if(res_name == null){
      return false;
    }
    document.getElementById('save').setAttribute('class', 'btn btn-primary');
    document.getElementById('save').setAttribute('data-dismiss', 'modal');
    // }validation
    this.setState({
      formUser: formUserNew
    })
  }
  handleSubmit = () => {
    if(this.state.formUser.name_user === ''){
      // alert('Form belum diisi semua ..');
    }else{ 
      // this.addUser(); 
      this.postUser(this.state.formUser); 
    }
  }
  handleCancel = () => {
    this.setState({
      isUpdate: false,
      formUser: {
        id_user:'',
        name_user: '',
        username: '',
        password:''
      },
      modalTitle: 'Add Product'
    })
    document.getElementById('save').setAttribute('class', 'btn btn-secondary');
  }

  render (){
    const columns = [
      {
        Header: 'ID',
        accessor: 'id_user',
        style:{
          textAlign: "center"
        },
        width: 50,
        minWidth: 50,
        maxWidth: 50
      },
      {
        Header: 'Full Name',
        accessor: 'name_user',
        style:{
          textAlign: "left"
        }
      },
      {
        Header: 'Username',
        accessor: 'username',
        style:{
          textAlign: "left"
        }
      },
      {
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
                  <h1 className="m-0 text-dark">User list</h1>
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-10">
                  <div className="container">
                    <div className="row">
                      <div className="col-10">
                        <div className="btn btn-primary mb-3 cursor" data-toggle="modal" data-target="#modalAddUpdate">
                          Add
                        </div>
                        <div className="alert alert-success alert-dismissible fade show d-none" id="alert" role="alert">
                          <span id="text-alert"></span>
                          <button type="button" className="close" onClick={this.closeAlert} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <ReactTable
                          columns={columns}
                          data={this.state.users}
                          filterable
                          defaultPageSize={5}
                          noDataText={'Please Login as ADMIN .. '}
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
                <table>
                  <tr>
                    <td>Full Name : </td>
                    <td><input type="text" value={this.state.formUser.name_user} name="name_user" onChange={this.handleFormChangeName} /></td>
                  </tr>
                  <tr>
                    <td>Username : </td>
                    <td><input type="text" value={this.state.formUser.username} name="username" onChange={this.handleFormChange} /></td>
                  </tr>
                  <tr>
                    <td>Password : </td>
                    <td><input type="password" value={this.state.formUser.password} name="password" onChange={this.handleFormChange} /></td>
                  </tr>
                </table>
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
      </Fragment>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user // user: user
  };
};

export default connect(mapStateToProps)(User);