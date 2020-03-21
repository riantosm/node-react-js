// Library
import React, { Component } from 'react';
import Axios from 'axios';

// pages

// Style
import './Login.css';

const URL_STRING_USER = "https://3.88.112.145:4001/api/v1/login";

class Login extends Component {
  state = {
    formUser: {
      id_user: '',
      username: '',
      password: ''
    },
    // login: true,
  }

  // API{
  loginUser = () => {
    Axios.post(URL_STRING_USER, this.state.formUser).then(response => {
      if (!response.data.token) {
        console.log('link: ', URL_STRING_USER);
        console.log('res: ', response);
        console.log('state: ', this.state.formUser);
        // this.setState({ msg: response.data.msg });
        document.getElementById('alert').setAttribute('class', 'alert alert-danger alert-dismissible fade show d-block')
      } else {
        localStorage.setItem('Token', response.data.token)
        // this.setState({ login:false })
        // console.log(localStorage.getItem('Token'));
        return document.location = "/"
      }
    })
  }
  // }API

  componentDidMount = () => {
    // console.log(localStorage.status);
  }

  handleFormChange = (event) => {
    let formCategoryNew = { ...this.state.formUser };
    formCategoryNew[event.target.name] = event.target.value;

    this.setState({
      formUser: formCategoryNew
    })
  }
  handleSubmit = () => {
    this.loginUser();
  }
  close = () => {
    document.getElementById('alert').setAttribute('class', 'alert alert-danger alert-dismissible fade show d-none')
  }
  render() {
    return (
      <div>
        <div className="abs">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <center>
                  <img src="assets/dist/img/logo.png" alt="" className="img-login mr-2" />
                </center>
              </div>
            </div>
          </div>
        </div>
        <div className="login-page">
          <div className="login-box">
            <div className="login-logo">
              <b>Arcademy </b>Cafe
            </div>
            <div className="card">
              <div className="card-body login-card-body mb-2">
                <p className="login-box-msg">Sign in</p>

                <div className="alert alert-danger alert-dismissible fade show d-none" id="alert" role="alert">
                  <small id="text-alert">incorrect username / password</small>
                  <button type="button" className="close" aria-label="Close" onClick={this.close}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Username" value={this.state.formUser.username} onChange={this.handleFormChange} name="username" />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="password" className="form-control" placeholder="Password" value={this.state.formUser.password} onChange={this.handleFormChange} name="password" />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Sign In</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;