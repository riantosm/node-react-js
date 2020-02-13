// Library
import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Axios from 'axios';

// pages

// Style
import './History.css';

const URL_STRING_HISTORY = 'http://192.168.100.11:3001/api/v1/history';
const URL_STRING_CART = 'http://192.168.100.11:3001/api/v1/cart';

class History extends Component {
  constructor(props){
    super(props);
    this.state={
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
    fetch(URL_STRING_CART, {
      headers: {
        token: localStorage.getItem('Token')
      }
    },{
      method: "GET"
    }).then(response => response.json()).then(cart => {
      this.setState({cart: cart.result})
    })
  }
  // }API
  
  componentDidMount(){
    this.getHistory();
    this.getCart();
  }

  render (){
    const columns = [
      {
        Header: 'ID',
        accessor: 'id_cart',
        style:{
          textAlign: "center"
        },
        width: 50,
        minWidth: 50,
        maxWidth: 50
      },
      {
        Header: 'Name Customer',
        accessor: 'name_customer',
        style:{
          textAlign: "left"
        }
      },
      {
        Header: 'Total order',
        accessor: 'total_price_cart',
        style:{
          textAlign: "left"
        }
      },
      {
        Header: 'Action',
        Cell: props => {
          return(
            <div>
              <button className="btn btn-primary btn-sm cursor" onClick={() => this.handleDetail(props.original)} data-toggle="modal" data-target="#modalAddUpdate">Detail</button>
            </div>
          )
        },
        sortable: false,
        filterable: false,
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        style:{
          textAlign: "center"
        }
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
                  <h1 className="m-0 text-dark">History</h1>
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <div className="content">
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
                    <a className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
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
                    <a className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
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
                    <a className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="card">
                    <div class="card-header border-0">
                      <div class="d-flex justify-content-between">
                        <h3 class="card-title">Online Store Visitors</h3>
                        <a href="javascript:void(0);">View Report</a>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="d-flex">
                        <p class="d-flex flex-column">
                          <span class="text-bold text-lg">820</span>
                          <span>Visitors Over Time</span>
                        </p>
                        <p class="ml-auto d-flex flex-column text-right">
                          <span class="text-success">
                            <i class="fas fa-arrow-up"></i> 12.5%
                          </span>
                          <span class="text-muted">Since last week</span>
                        </p>
                      </div>

                      <div class="position-relative mb-4">
                        <canvas id="visitors-chart" height="200"></canvas>
                      </div>

                      <div class="d-flex flex-row justify-content-end">
                        <span class="mr-2">
                          <i class="fas fa-square text-primary"></i> This Week
                        </span>

                        <span>
                          <i class="fas fa-square text-gray"></i> Last Week
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="card">
                    <div class="card-header border-0">
                      <div class="d-flex justify-content-between">
                        <h3 class="card-title">Sales</h3>
                        <a href="javascript:void(0);">View Report</a>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="d-flex">
                        <p class="d-flex flex-column">
                          <span class="text-bold text-lg">$18,230.00</span>
                          <span>Sales Over Time</span>
                        </p>
                        <p class="ml-auto d-flex flex-column text-right">
                          <span class="text-success">
                            <i class="fas fa-arrow-up"></i> 33.1%
                          </span>
                          <span class="text-muted">Since last month</span>
                        </p>
                      </div>

                      <div class="position-relative mb-4">
                        <canvas id="sales-chart" height="200"></canvas>
                      </div>

                      <div class="d-flex flex-row justify-content-end">
                        <span class="mr-2">
                          <i class="fas fa-square text-primary"></i> This year
                        </span>

                        <span>
                          <i class="fas fa-square text-gray"></i> Last year
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <ReactTable
                    columns={columns}
                    data={this.state.cart}
                    filterable
                    defaultPageSize={5}
                    noDataText={'Please Wait .. '}
                    showPageSizeOptions={false}
                  />
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