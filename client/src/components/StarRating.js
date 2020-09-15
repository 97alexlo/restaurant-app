import React, {Fragment} from 'react'
import './components.css';

const StarRating = ({rating}) => {
  const stars = [];
  // add a full star until start reaches rating number
  // add an empty star for the rest
  for(let i =1; i <=5; i++) {
    if(i <= rating) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);  
    }
    // if star is a decimal add a half star
    else if(i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>);
    }
    else {
      stars.push(<i key={i} className="far fa-star text-warning"></i>);
    }
  };
  return (
    <Fragment>
      {stars}
    </Fragment>
  )
}

export default StarRating;