// Library
import React, {Component} from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';

// pages

// Style
//import './Login.css';

const URL_STRING_LOGOUT = 'http://192.168.100.41:3001/api/v1/logout';

class Logout extends Component {
  // API{
  logout = () => {
    Axios.post(URL_STRING_LOGOUT).then(response => {
      console.log('logout');
      return (<Redirect to='/' />);
    })
  }
  // }API

  componentDidMount = () => {
    localStorage.removeItem('Token');
    this.logout();
  }
  render (){
    return document.location = "/"
  }
}

export default Logout;