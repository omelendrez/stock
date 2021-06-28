import React from 'react'
import Header from './common/Header'

const Home = props => (
  <React.Fragment>
    <Header />
    <div className="jumbotron jumbotron-fluid text-center">
      <div className="container">
        <h1 className="display-4">Stock</h1>
        <p className="lead">Stock Management System</p>
      </div>
    </div>
  </React.Fragment>
)

export default Home