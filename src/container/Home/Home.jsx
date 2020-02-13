// Library
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Blank from '../pages/Blank';

// pages
// import Product from '../pages/Product/Product';
import ProductAdd from '../pages/Product/ProductAdd';
// import Category from '../pages/Category/Category';
import Login from '../pages/Login/Login';
// import Header from '../Header/Header';
import Logout from '../pages/Logout/Logout';
import Cart from '../pages/Cart/Cart';
import Category2 from '../pages/Category/Category2';
import Product2 from '../pages/Product/Product2';
import Cart2 from '../pages/Cart/Cart2';
import History from '../pages/History/History';

// Style
import './Home.css';
import User from '../pages/User/User';

class Home extends Component {
  render (){
    var token = localStorage.getItem('Token');
    if(!token){
      // return <Redirect to='/' />
      return (
        <Router>
          {/* <Header /> */}
          <div>
            <Switch>
              <Route path="/" component={Blank} exact />
              {/* login */}
              <Route path="/login" component={Login} exact />
            </Switch>
          </div>
        </Router>
      )
    }else{
      return (
        <Router>
          {/* <Header /> */}
          <div className="wrapper">
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
              {/* Left navbar links */}
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link cursor" data-widget="pushmenu"><i className="fas fa-bars"></i></a>
                </li>
                {/* <li className="nav-item d-none d-sm-inline-block">
                  <a className="nav-link">Home</a>
                </li> */}
              </ul>
              {/* Right navbar links */}
              <ul className="navbar-nav ml-auto">
                {/* Messages Dropdown Menu */}
                <li className="nav-item">
                  <a className="nav-link cursor" data-widget="control-sidebar" data-slide="true">
                    <i className="fas fa-shopping-cart"></i>
                  </a>
                </li>
              </ul>
            </nav>
            {/* /.navbar */}
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
              {/* Brand Logo */}
              <Link to="/" className="brand-link">
                <img src="assets/dist/img/segi6_white.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"  />
                <span className="brand-text font-weight-normal">Tosm Cafe</span>
              </Link>
              {/* Sidebar */}
              <div className="sidebar">
                {/* Sidebar Menu */}
                <nav className="mt-2">
                  <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* Add icons to the links using the .nav-icon className
                        with font-awesome or any other icon font library */}
                    <li class="nav-item has-treeview">
                      <a class="nav-link cursor">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                          Dashboard
                          <i class="right fas fa-angle-left"></i>
                        </p>
                      </a>
                      <ul class="nav nav-treeview">
                        <li class="nav-item">
                          <Link to="/" class="nav-link">
                            <i class="far fa-circle nav-icon"></i>
                            <p>History</p>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item has-treeview ">
                      <a className="nav-link cursor">
                      <i className="nav-icon fas fa-edit"></i>
                        <p>
                          Data
                          <i className="right fas fa-angle-left"></i>
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          <Link to="/product" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Product</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/category" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Category</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/user" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>User</p>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li class="nav-item has-treeview">
                      <a class="nav-link cursor">
                        <i class="nav-icon far fa-plus-square"></i>
                        <p>
                          Cart
                          <i class="right fas fa-angle-left"></i>
                        </p>
                      </a>
                      <ul class="nav nav-treeview">
                        <li class="nav-item">
                          <Link to="/cart" class="nav-link">
                            <i class="far fa-circle nav-icon"></i>
                            <p>Add Cart</p>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li class="nav-item has-treeview">
                      <a class="nav-link cursor" href="/logout">
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        <p>
                          Logout
                        </p>
                      </a>
                    </li>
                  </ul>
                </nav>
                {/* /.sidebar-menu */}
              </div>
              {/* /.sidebar */}
            </aside>
            {/* <div>
              <nav>
                <br/><br/><br/>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/product">Product</Link>
                  </li>
                  <li>
                    <Link to="/category">Category</Link>
                  </li>
                  <li>
                    <Link to="/cart">Cart</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </ul>
              </nav>
            </div> */}
            {/* Content Wrapper. Contains page content */}
            <Switch>
              <Route path="/" component={History} exact />
              {/* logout */}
              <Route path="/logout" component={Logout} exact />
              {/* user */}
              <Route path="/user" component={User} exact />
              {/* category */}
              <Route path="/category" component={Category2} exact />
              <Route path="/category2" component={Category2} exact />
              {/* product */}
              <Route path="/product" component={Product2} exact />
              <Route path="/product2" component={Product2} exact />
              {/* cart */}
              <Route path="/cart" component={Cart} exact />
              <Route path="/cart2" component={Cart2} exact />
              <Route path="/product/add" component={ProductAdd} />
            </Switch>
            {/* /.content-wrapper */}
            {/* Control Sidebar */}
            {/* /.control-sidebar */}
            <footer className="main-footer">
            {/* Default to the left */}
              Developed by <strong>Rian Tosm</strong>.
            </footer>
          </div>
        </Router>
      )
    }
  }
}

export default Home;