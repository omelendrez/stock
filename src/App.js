import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import ToolBar from './components/ToolBar';
import Home from './components/Home'
import Categories from './components/Categories'
import Companies from './components/Companies'

function App() {
  return (
    <div className="App">
      <Router>
        <ToolBar />
        <Route exact path="/" component={Home} />
        <Route path="/categories" component={Categories} />
        <Route path="/companies" component={Companies} />
      </Router>
    </div>
  );
}

export default App;
