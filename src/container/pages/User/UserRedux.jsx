// Library
import React, {Component, Fragment} from 'react';
import { connect } from "react-redux";
import { getAllUser, postNewUser } from "../../../redux/actions/user";

// pages

// Style
//import './ser.css';

class UserRedux extends Component {
  state = {
    userData: [],
    userName: "",
    formUser: {
      id_user:'',
      name_user: '',
      username: '',
      password:''
    },
    number: 0
  };
  getUser = async () => {
    await this.props.dispatch(getAllUser())
    this.setState({
      userData: this.props.user.userData
    });
  };
  postUser = name => {
    this.props.dispatch(postNewUser(name));
    setTimeout(this.getUser, 100);
  };

  componentDidMount = () => {
    setTimeout(this.getUser, 2000);
  };
  
  handleSubmit = () => {
    if(this.state.formUser.name_user === ''){
      alert('Form belum diisi semua ..');
    }else{ 
      this.postUser(this.state.formUser); 
    }
  }
  handleFormChange = (event) => {
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
                <div className="col-lg-8">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div className="btn btn-primary mt-5 mb-3 cursor" data-toggle="modal" data-target="#modalAddUpdate">
                          Tambah
                        </div>
                        <div className="alert alert-success alert-dismissible fade show d-none" id="alert" role="alert">
                          <span id="text-alert"></span>
                          <button type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <br/>
                        {!this.props.user.isPending ? (
                          <ol>
                            {this.state.userData.map(user => {
                              return <li key={user.id_user}>{user.username}</li>;
                            })}
                          </ol>
                        ) : (
                          <img alt="loading-gif" />
                        )}
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
                    <td>Name User : </td>
                    <td><input type="text" value={this.state.formUser.name_user} name="name_user" onChange={this.handleFormChange} /></td>
                  </tr>
                  <tr>
                    <td>Username : </td>
                    <td><input type="text" value={this.state.formUser.username} name="username" onChange={this.handleFormChange} /></td>
                  </tr>
                  <tr>
                    <td>password : </td>
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

export default connect(mapStateToProps)(UserRedux);