import React, {Fragment} from 'react';
import './App.css';
import AddRestaurant from './components/AddRestaurant';
import GoogleMaps from './components/GoogleMaps';
import Header from './components/Header';
import RestaurantsList from './components/RestaurantsList';

function App() {
  return (
    <Fragment>
      <div className="container">
        <Header/>
        <GoogleMaps/>
        <AddRestaurant/>
        <RestaurantsList/>
      </div>
    </Fragment>
  );
}

export default App;
