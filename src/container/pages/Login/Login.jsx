// Library
import React, {Component} from 'react';
import Axios from 'axios';

// pages

// Style
import './Login.css';

const URL_STRING_USER = 'http://192.168.1.237:3001/api/v1/login';

class Login extends Component {
  state = {
    formUser: {
      id_user:'',
      username: '',
      password: ''
    },
    // login: true,
  }

  // API{
  loginUser = () => {
    Axios.post(URL_STRING_USER, this.state.formUser).then(response => {
      if(!response.data.token){
        console.log(response.data.msg);
        // this.setState({ msg: response.data.msg });
      }else{
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
    let formCategoryNew = {...this.state.formUser};
    formCategoryNew[event.target.name] = event.target.value;
    
    this.setState({
      formUser: formCategoryNew
    })
  }
  handleSubmit = () => {
    this.loginUser();
  }
  render (){
    return (
      <div>
        <div className="abs">
          <div className="container">
            <div className="row">
              <div className="col-12">
              <center>
              <img src="assets/dist/img/segi6_gray.png" alt="" className="img-login mr-2"/>
              </center>
              </div>
            </div>
          </div>
        </div>
        <div class="login-page">
          <div class="login-box">
            <div class="login-logo">   
            <b>Tosm</b>Cafe
            </div>
            <div class="card">
              <div class="card-body login-card-body mb-2">
                <p class="login-box-msg">Sign in</p>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Username" value={this.state.formUser.username} onChange={this.handleFormChange} name="username" />
                    <div class="input-group-append">
                      <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                      </div>
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <input type="password" class="form-control" placeholder="Password" value={this.state.formUser.password} onChange={this.handleFormChange} name="password" />
                    <div class="input-group-append">
                      <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <button class="btn btn-primary btn-block" onClick={this.handleSubmit}>Sign In</button>
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