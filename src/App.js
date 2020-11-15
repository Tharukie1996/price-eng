import React from 'react';
import './App.css';
import Cart from './component/cart'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Cart} />
          {/* <Route path="/hotels" component={HotelView} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;