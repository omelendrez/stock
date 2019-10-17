import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import ToolBar from './components/ToolBar';
import Home from './components/Home'
import Companies from './components/Companies'
import Categories from './components/Categories'
import Customers from './components/Customers'
import Products from './components/Products'
import Stores from './components/Stores'
import Suppliers from './components/Suppliers'
import Users from './components/Users'

function App() {
  return (
    <div className="App">
      <Router>
        <ToolBar />
        <Route exact path="/" component={Home} />
        <Route path="/companies" component={Companies} />
        <Route path="/categories" component={Categories} />
        <Route path="/customers" component={Customers} />
        <Route path="/products" component={Products} />
        <Route path="/stores" component={Stores} />
        <Route path="/suppliers" component={Suppliers} />
        <Route path="/users" component={Users} />
      </Router>
    </div>
  );
}

export default App;
