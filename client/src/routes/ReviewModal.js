import React, {Fragment, useContext, useEffect} from 'react'
import StarRating from '../components/StarRating'
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/contextAPI";
import '../components/components.css'
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';

const ReviewModal = ({ reviews }) => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  const getRestaurants = async () => {
    try {
      const res = await fetch(`/restaurants/${id}`);
      const restaurantsArray = await res.json();
      setSelectedRestaurant(restaurantsArray.data);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <Fragment>
    <div className="container">
      {selectedRestaurant && (
        <Fragment>
          <h1 className="text-center font-weight-light display-3">
            {selectedRestaurant.restaurant.name}
          </h1>
          <h5 className="font-weight-light text-muted  text-center">
          {selectedRestaurant.restaurant.location}
          </h5>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.avg_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant.count
                ? `(${selectedRestaurant.restaurant.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </Fragment>
      )}
    </div>
    </Fragment>
  )
}

export default ReviewModal
