import React from 'react';
import './App.css';
import Cart from './component/cart/cart'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PriceGuide from './component/priceGuide/priceGuide';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Cart} />
          <Route path="/pricingList" component={PriceGuide} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;