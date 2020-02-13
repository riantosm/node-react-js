// Library
import React, {Component} from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'

// pages

// Style
//import './Login.css';

const URL_STRING_LOGOUT = 'http://192.168.100.41:3001/api/v1/logout';

class Logout extends Component {
  state = {
    redirect: false
  }

  // API{
  logout = () => {
    Axios.post(URL_STRING_LOGOUT).then(response => {
      console.log('logout');
      return <Redirect to='/login' />
    })
  }
  // }API

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  } 
  componentDidMount = () => {
    localStorage.removeItem('Token');
    this.logout();
    // localStorage.removeItem('status'); 
    // this.this.setRedirect();
  }
  render (){
    return (
      <div>
        logout
      </div>
    )
  }
}

export default Logout;