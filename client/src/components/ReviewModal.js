import React, {Fragment, useState, useEffect} from 'react'
import StarRating from './StarRating'
import './components.css';

const ReviewModal = ({restaurant}) => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const getReviews = async (id) => {
      try {
        const res = await fetch(`/restaurants/${restaurant.id}`);
        const reviewsArray = await res.json();
        setReviews(reviewsArray.data.reviews);
      }
      catch (err) {
        console.error(err.message);
      }
    }
    getReviews();
  }, []);

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

  // update 
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/restaurants/${restaurant.id}/AddReview`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {
          name: name,
          review: reviewText,
          rating: rating
        })
      });
      window.location = "/";
    }
    catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Fragment>
          <button type="button" className="btn btn-info" data-toggle="modal" data-target={`#id${restaurant.id}2`}>View</button>

          <div id={`id${restaurant.id}2`} className="modal fade" role="dialog" >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                <div className="col-md-12">
                  <h4 className="font-weight-light text-dark text-center">
                    {restaurant.name}
                  </h4>
                  <h5 className="font-weight-light text-muted  text-center">
                  {restaurant.location}
                  </h5>
                  <div className="text-center">{renderRating(restaurant)}
                  </div>
                </div>
                <button 
                type="button" 
                className="close" 
                data-dismiss="modal">&times;</button>
              </div>
                <div className="modal-body">
                  <div className="row row-cols-3 mb-2">
                  {reviews.map((review) => {
                    return (
                      <div 
                        key={review.id}
                        className="card text-white bg-info mb-3 mr-4 mx-auto" 
                        style={{maxWidth: "30%"}}
                      >
                        <div 
                          className="card-header d-flex justify-content-between"
                        >
                          <span>{review.name}</span>
                          <span>
                            <StarRating rating={review.rating}/>
                          </span>
                        </div>
                        <div className="card-body">
                          <p className="card-text">
                            {review.review}
                          </p>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                  <div className="mb-2">
                  <h5 className="text-info font-weight-normal">
                    Write a review
                  </h5>
                    <form action="">
                      <div className="form-row">
                        <div className="form-group col-8">
                          <label>Name</label>
                            <input 
                              value={name}
                              onChange={e => setName(e.target.value)}
                              placeholder="Name" 
                              type="text" 
                              className="form-control"
                            />
                        </div>
                        <div className="form-group col-4">
                          <label>Rating</label>
                          <select 
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            className="custom-select"
                          >
                            <option disabled value="" hidden>Select</option>
                            <option value="1">1 star</option>
                            <option value="2">2 stars</option>
                            <option value="3">3 stars</option>
                            <option value="4">4 stars</option>
                            <option value="5">5 stars</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Review</label>
                        <textarea 
                          value={reviewText}
                          onChange={e => setReviewText(e.target.value)}
                          style={{height:"100px"}}
                          className="form-control mb-4 bg-light"
                          placeholder="Share details of your own experience at this restaurant"></textarea>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                  type="button" 
                  className="btn btn-primary" data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button 
                    onClick={e => handleSubmitReview(e)}
                    type="button" 
                    className="btn btn-info" data-dismiss="modal"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
    </Fragment>
  )
}

export default ReviewModal
