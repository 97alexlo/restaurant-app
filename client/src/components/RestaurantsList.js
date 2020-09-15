import React, {Fragment, useState, useEffect} from 'react';
import './components.css';
import UpdateRestaurant from './UpdateRestaurant';
import StarRating from './StarRating';
import ReviewModal from './ReviewModal';

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [nameSearch, setNameSearch] = useState("");

  // delete restaurant
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure?")) {
      try {
        const res = await fetch(`/restaurants/${id}`, {
          method: "DELETE"
        });
        setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
      } 
      catch (err) {
        console.error(err.message);
      }
    }
  }

  const renderRating = (restaurant) => {
    if(!restaurant.count) {
      return <span className="text-warning">0 Reviews</span>
    }
    return (
        <Fragment>
          <StarRating rating={restaurant.avg_rating}/>
          <span className="text-warning ml-1">
            ({restaurant.count})
          </span>
        </Fragment>
    );
  };

  const getRestaurants = async () => {
    try {
      const res = await fetch("/restaurants");
      const restaurantsArray = await res.json();
      setRestaurants(restaurantsArray.data.restaurants);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const handleSearch = async(e) => {
    e.preventDefault(); //prevent page from reloading
    try {
      const response = await fetch(`/search/?name=${nameSearch}`);
      const parseResponse = await response.json();
      setRestaurants(parseResponse);
    }
    catch(err) {
      console.error(err.message);
    }
  }

  const resetTable = async(e) => {
    e.preventDefault(); //prevent page from reloading
    try {
      const response = await fetch(`/search/?name= `);
      const parseResponse = await response.json();
      setRestaurants(parseResponse);
      setNameSearch("");
    }
    catch(err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
    <h3 className="font-weight-light">Find a restaurant</h3>
    <form onSubmit={handleSearch}>
        <div className="form-row mb-3">
          <div className="col">
            <input 
              value={nameSearch} 
              onChange={e => setNameSearch(e.target.value)} 
              type="text" 
              className="form-control"
              placeholder="Search for a restaurant in the table"
              />
          </div>
          <button 
          onClick={(e) => resetTable(e)} 
          type="submit" 
          className="btn btn-primary mr-1"
          >
            Reset
          </button>
          <button 
          onClick={e => handleSearch(e)} 
          type="submit" 
          className="btn btn-primary"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
    </form>
      <div className="list-group">
        <table className="table table-hover table-dark mx-auto">
        <thead>
        <tr className="bg-primary">
          <th scope="col">Restaurant</th>
          <th scope="col">Location</th>
          <th scope="col">Price Range</th>
          <th scope="col">Rating</th>
          <th scope="col">Reviews</th>
          <th scope="col">Update</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
      {restaurants && restaurants.map(restaurant => {
        return (
          <tr key={restaurant.id}>
            <td>{restaurant.name}</td>
            <td>{restaurant.location}</td>
            <td>{"$".repeat(restaurant.price_range)}</td>
            <td>{renderRating(restaurant)}</td>
            <td>
                <ReviewModal restaurant={restaurant}/>
            </td>
            <td>{
              <UpdateRestaurant restaurant={restaurant}/>
            }
            </td>
            <td>{
              <button 
                onClick={() => handleDelete(restaurant.id)} 
                restaurant={restaurant.id}
                className="btn btn-danger"
              >
                Delete
              </button>
            }
            </td>
          </tr>
        )
      })}
    </tbody>
      </table>
    </div>
  </Fragment>

  )
}
export default RestaurantsList;