// Library
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// pages
// import Product from '../pages/Product/Product';
import ProductAdd from "../pages/Product/ProductAdd";
// import Category from '../pages/Category/Category';
import Login from "../pages/Login/Login";
// import Header from '../Header/Header';
import Logout from "../pages/Logout/Logout";
import Cart from "../pages/Cart/Cart";
import Category2 from "../pages/Category/Category2";
import Product2 from "../pages/Product/Product2";
import Cart2 from "../pages/Cart/Cart2";
import History from "../pages/History/History";
import User from "../pages/User/User";
// import UserRedux from "../pages/User/UserRedux";

// Style
import "./Home.css";

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
              {/* login */}
              <Route path="/" component={Login} />
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
                  <Link to="/#" className="nav-link cursor" data-widget="pushmenu"><i className="fas fa-bars"></i></Link>
                </li>
                {/* <li className="nav-item d-none d-sm-inline-block">
                  <a className="nav-link">Home</a>
                </li> */}
              </ul>
              {/* Right navbar links */}
              <ul className="navbar-nav ml-auto">
                {/* Messages Dropdown Menu */}
                <li className="nav-item">
                  <Link className="nav-link cursor" data-widget="control-sidebar" data-slide="true">
                    <i className="fas fa-shopping-cart"></i>
                  </Link>
                </li>
              </ul>
            </nav>
            {/* /.navbar */}
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-light-primary elevation-4">
              {/* Brand Logo */}
              <Link to="/" className="brand-link">
                <img src="assets/dist/img/logo.png" alt="Logo" className="brand-image img-circle elevation-3"  />
                <span className="brand-text font-weight">Ar-Cafe</span>
              </Link>
              {/* Sidebar */}
              <div className="sidebar">
                {/* Sidebar Menu */}
                <nav className="mt-2">
                  <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* Add icons to the links using the .nav-icon className
                        with font-awesome or any other icon font library */}
                    <li className="nav-item has-treeview">
                      <Link to="/#" className="nav-link cursor">
                        {/* <i className="nav-icon fas fa-tachometer-alt"></i> */}
                        <img src="assets/dist/img/clipboard.png" alt="Logo" className="nav-icon mr-2"/>
                        <p>
                          Dashboard
                          <i className="right fas fa-angle-left"></i>
                        </p>
                      </Link>
                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          <Link to="/" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>History</p>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item has-treeview ">
                      <Link to="/#" className="nav-link cursor">
                        <img src="assets/dist/img/fork.png" alt="Logo" className="nav-icon mr-2"/>
                        <p>
                          Data
                          <i className="right fas fa-angle-left"></i>
                        </p>
                      </Link>
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
                    <li className="nav-item has-treeview">
                      <Link to="/#" className="nav-link cursor">
                        <img src="assets/dist/img/add.png" alt="Logo" className="nav-icon mr-2"/>
                        <p>
                          Cart
                          <i className="right fas fa-angle-left"></i>
                        </p>
                      </Link>
                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          <Link to="/cart" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Add Cart</p>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item has-treeview">
                      <Link to="/logout" className="nav-link cursor" href="/logout">
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        <p>
                          Logout
                        </p>
                      </Link>
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
