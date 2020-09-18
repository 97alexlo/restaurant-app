import React, { Fragment, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import './components.css';

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/restaurants/${id}/addReview`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {
          name: name,
          review: reviewText,
          rating: rating
        })
      })
      const parsePost = await response.json();
      history.push("/");
      history.push(location.pathname);
    } catch(err) {
      console.error(err.message);
    }
  };

  const goBack = () => {
    history.push("/");
  }

  return (
    <Fragment>
    <div className="mb-2">
    <h5 className="text-info font-weight-normal">
    Write a review
    </h5>
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="Review"
            className="form-control"
            style={{height:"130px"}}
            className="form-control mb-4 bg-light"
            placeholder="Share details of your own experience at this restaurant"
          ></textarea>
        </div>
        <button
          onClick={goBack}
          className="btn btn-outline-primary mr-1"
        >
        Go Back
        </button>
        <button
          type="submit"
          onClick={(e) => handleSubmitReview(e)}
          className="btn btn-info"
        >
          Submit
        </button>
      </form>
    </div>
    </Fragment>
  );
};

export default AddReview;