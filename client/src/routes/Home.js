import React, { Fragment } from "react";
import AddRestaurant from "../components/AddRestaurant";
import GoogleMaps from "../components/GoogleMaps";
import Header from "../components/Header";
import RestaurantsList from "../components/RestaurantsList";

const Home = () => {
  return (
    <Fragment>
      <div>
        <Header />
        <GoogleMaps/>
        <AddRestaurant />
        <RestaurantsList />
      </div>
    </Fragment>
  );
};

export default Home;