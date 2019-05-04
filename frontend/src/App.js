import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import Blog from './pages/Blog.jsx';
import Product from './pages/Product';
import BlogItem from './pages/BlogItem';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import BuyScreen from './pages/BuyScreen';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/" exact={true} component={MainPage} />
          <Route path="/Blog" exact={true}component={Blog} />
          <Route path="/Blog/:id" exact={true} component={BlogItem} />
          <Route path="/Product" exact={true} component={Product} />
          <Route path="/Product/:category" exact={true} component={Category} />
          <Route path="/Product/:category/:productId" exact={true} component={ProductDetail}/>
          <Route path="/Product/:category/Buy/:productId" component={BuyScreen} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
