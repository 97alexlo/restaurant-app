import React, {Fragment, useState} from 'react'

const UpdateRestaurant = ({restaurant}) => {
  const [name, setName] = useState(restaurant.name);
  const [location, setLocation] = useState(restaurant.location);
  const [priceRange, setPriceRange] = useState(restaurant.price_range);

  // update 
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/restaurants/${restaurant.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {
          name: name,
          location: location,
          price_range: priceRange
        })
      });
      window.location = "/";
    }
    catch (err) {
      console.error(err.message)
    }
  }

  // reset to original values if update is cancelled
  const resetUpdate = () => {
    setName(restaurant.name);
    setLocation(restaurant.location);
    setPriceRange(restaurant.priceRange);
  }

  return (
    <Fragment>
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${restaurant.id}`}>Update</button>

      <div id={`id${restaurant.id}`} className="modal fade" role="dialog" >
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
            <h4 className="modal-title font-weight-light text-dark">
            Update Restaurant Information
            </h4>
              <button 
                type="button" 
                className="close" 
                onClick={() => resetUpdate()}
                data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
              <label className="font-weight-light text-dark">Name</label>
                <input 
                  value={name} 
                  onChange={e => setName(e.target.value)} 

                  className="form-control" 
                  type="text"
                />
              </div>
              <div className="form-group">
                <label className="font-weight-light text-dark">Location</label>
                  <input 
                    value={location} 
                    onChange={e => setLocation(e.target.value)} 
                    className="form-control" 
                    type="text"
                  />
              </div>
              <div className="form-group">
              <label className="font-weight-light text-dark">Price Range ($)</label>
              <div>
                <select 
                  style={{width: '200px'}}
                  value={priceRange} 
                  onChange={e => setPriceRange(e.target.value)} 
                  className="custom-select">
                  <option disabled value="" hidden>Select</option>
                  <option value="1">$</option>
                  <option value="2">$$</option>
                  <option value="3">$$$</option>
                  <option value="4">$$$$</option>
                  <option value="5">$$$$$</option>
                </select>
              </div>
            </div>
            </div>
            <div className="modal-footer">
              <button 
              onClick={() => resetUpdate()}
              type="button" 
              className="btn btn-primary" data-dismiss="modal"
              >
                Close
              </button>
              <button 
                onClick={(e) => handleUpdate(e)}
                type="button" 
                className="btn btn-warning" data-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>

        </div>
      </div>
    </Fragment>
  )
}

export default UpdateRestaurant; 
