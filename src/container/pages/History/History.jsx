// Library
import React, {Component, Fragment} from 'react';
// import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Axios from 'axios';
import { Link } from "react-router-dom";

// pages

// Style
import './History.css';

const URL_STRING_HISTORY = 'http://192.168.100.11:3001/api/v1/history';
const URL_STRING_CART = 'http://192.168.100.11:3001/api/v1/cart';

class History extends Component {
  constructor(props){
    super(props);
    this.state={
      cart_detail:[],
      cart: [],
      today: '',
      week: '',
      year: '',
      todays: '',
      weeks: '',
      years: ''
    }
  }

  // API{
  getHistory = () => {
    Axios.get(`${URL_STRING_HISTORY}`, {
      headers: {
        token: localStorage.getItem('Token')
      }  
    })
    .then(response => {
      let today, week, year, todays, weeks, years;
      if(response.data.TodaysIncome === null){
        today = 0;
      }else{
        today = response.data.TodaysIncome;
      }
      if(response.data.OrdersWeek === null){
        week = 0;
      }else{
        week = response.data.OrdersWeek;
      }
      if(response.data.YearsIncome === null){
        year = 0;
      }else{
        year = response.data.YearsIncome;
      }
      if(response.data.yesterdayIncomes === null){
        todays = 0;
      }else{
        todays = response.data.yesterdayIncomes;
      }
      if(response.data.OrdersWeeks === null){
        weeks = 0;
      }else{
        weeks = response.data.OrdersWeeks;
      }
      if(response.data.YearsIncomes === null){
        years = 0;
      }else{
        years = response.data.YearsIncomes;
      }
      this.setState({
        today,
        week,
        year,
        todays,
        weeks,
        years
      })
    })
  }
  getCart = () => {
    // console.log(URL_STRING_CART);
    Axios.get(URL_STRING_CART, {
      headers: {
        token: localStorage.getItem('Token')
      }  
    })
    .then(response => {
      this.setState({
        cart: response.data.result
      })
      // for(let x = response.data.result.length; x > 0; x--){
      //   if(x < 10){  
      //     this.getDetailCart(x)
      //   }
      // }
    })
  }
  // getDetailCart = (params) => {
  //   // console.log(URL_STRING_CART);
  //   Axios.get(`${URL_STRING_CART}/${params}`, {
  //     headers: {
  //       token: localStorage.getItem('Token')
  //     }  
  //   })
  //   .then(response => {
  //     console.log(response.data.cart);
  //     // this.setState({
  //     //   cart_detail: response.data
  //     // })
  //   })
  // }
  // }API
  
  componentDidMount(){
    this.getHistory();
    this.getCart();
  }

  render (){
    return (
      <Fragment>
        <div className="content-wrapper pb-5">
          {/* Content Header (Page header) */}
          {/* /.content-header */}
          {/* Main content */}
          <div className="content mt-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4">
                  <div className="small-box bg-today">
                    <div className="inner">
                      <h3>{this.state.today}</h3>
                      <p>Today's Income</p>
                      <sup>{this.state.todays}</sup>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars"></i>
                    </div>
                    <Link to="/#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="small-box bg-week">
                    <div className="inner">
                      <h3>{this.state.week}</h3>
                      <p>Orders</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag"></i>
                    </div>
                    <Link to="/#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="small-box bg-year">
                    <div className="inner">
                      <h3>{this.state.year}</h3>
                      <p>This Year's Income</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars"></i>
                    </div>
                    <Link to="/#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header border-0">
                      <div className="d-flex justify-content-between">
                        <h3 className="card-title">Online Store Visitors</h3>
                        <Link to="/#" className="text-primary">View Report</Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex">
                        <p className="d-flex flex-column">
                          <span className="text-bold text-lg">820</span>
                          <span>Visitors Over Time</span>
                        </p>
                        <p className="ml-auto d-flex flex-column text-right">
                          <span className="text-success">
                            <i className="fas fa-arrow-up"></i> 12.5%
                          </span>
                          <span className="text-muted">Since last week</span>
                        </p>
                      </div>

                      <div className="position-relative mb-4">
                        <canvas id="visitors-chart" height="200"></canvas>
                      </div>

                      <div className="d-flex flex-row justify-content-end">
                        <span className="mr-2">
                          <i className="fas fa-square text-primary"></i> This Week
                        </span>

                        <span>
                          <i className="fas fa-square text-gray"></i> Last Week
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header border-0">
                      <div className="d-flex justify-content-between">
                        <h3 className="card-title">Saless</h3>
                        <Link to="/#" className="text-primary">View Report</Link>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex">
                        <p className="d-flex flex-column">
                          <span className="text-bold text-lg">$18,230.00</span>
                          <span>Sales Over Time</span>
                        </p>
                        <p className="ml-auto d-flex flex-column text-right">
                          <span className="text-success">
                            <i className="fas fa-arrow-up"></i> 33.1%
                          </span>
                          <span className="text-muted">Since last month</span>
                        </p>
                      </div>

                      <div className="position-relative mb-4">
                        <canvas id="sales-chart" height="200"></canvas>
                      </div>

                      <div className="d-flex flex-row justify-content-end">
                        <span className="mr-2">
                          <i className="fas fa-square text-primary"></i> This year
                        </span>

                        <span>
                          <i className="fas fa-square text-gray"></i> Last year
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <h3 className="my-2 text-dark">History</h3>
                </div>
                <div className="col-12">
                  <div className="card">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>
                            #
                          </th>
                          <th>
                            Invoices
                          </th>
                          <th>
                            Cashier
                          </th>
                          <th>
                            Date
                          </th>
                          {/* <th>
                            Orders
                          </th> */}
                          <th>
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.cart.map((cart, i) => {
                            if(i<10){
                              // this.getDetailCart(i);
                              // console.log(this.state.cart_detail)
                              // console.log('-');
                              return (
                                <tr key={cart.id_cart}>
                                  <td>
                                    {i+1}
                                  </td>
                                  <td>
                                    {cart.name_customer}
                                  </td>
                                  <td>
                                    {cart.name_user}
                                  </td>
                                  <td>
                                    {cart.created_at}
                                  </td>
                                  {/* <td>
                                    {
                                      // this.getDetailCart(cart.id_cart)
                                      // this.state.cart.map((cart_detail, i) => {
                                      // })
                                    }
                                  </td> */}
                                  <td>
                                    Rp {cart.total_price_cart}
                                  </td>
                                </tr>
                              )
                            }else{
                              return false;
                            }
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            {/* /.row */}
            </div>{/* /.container-fluid */}
          </div>
          {/* /.content */}
        </div>
      </Fragment>
    )
  }
}

export default History;