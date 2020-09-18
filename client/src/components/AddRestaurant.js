import React, { Fragment, useState, useContext } from 'react'
import { RestaurantsContext }  from '../context/contextAPI.js';
const AddRestaurant = () => {

  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  
  // when the "Add" button is clicked, trigger the post method
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page from reloading
    try {
      const response = await fetch("/restaurants", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {
          name: name,
          location: location,
          price_range: priceRange
        })
      })
      const parsePost = await response.json();
      addRestaurants(parsePost.data.restaurant);
    }
    catch(err) {
      console.error(err.message);
    }
    // clear input fields after submitting
    setName("");
    setLocation("");
    setPriceRange("");
  };

  return (
    <Fragment>
      <div className="mt-6 mb-2">
      <h3 className="mt-5 font-weight-light">Add a restaurant</h3>
        <form>
        <div className="form-row">
          <div className="col">
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              type="text" 
              className="form-control"
              placeholder="Name"
              />
          </div>
          <div className="col">
            <input 
            value={location} 
            onChange={e => setLocation(e.target.value)} 
            type="text" 
            className="form-control"
            placeholder="Location"
            />
          </div>
          <div className="col">
            <select 
              value={priceRange} 
              onChange={e => setPriceRange(e.target.value)} 
              className="custom-select">
              <option disabled value="" hidden>Price Range ($)</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button 
            onClick={handleSubmit} 
            type="submit" 
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
      </div>
    </Fragment>
  )
}

export default AddRestaurant;