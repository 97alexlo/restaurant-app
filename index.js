const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  console.log("in production mode");
  app.use(express.static('client/build'));
  // app.get('*', (request, response) => {
  //   response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
}

// routes
// create a table 
app.post("/restaurants", async (req, res) => {
  try {
    // returning * means that it returns the newly inserted row
    const results = await pool.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [req.body.name, req.body.location, req.body.price_range]);

    res.status(201).json({
      status:"success",
      data: {
        restaurant: results.rows[0]
      }
    });

  }
  catch (err) {
    console.error(err.message)
  }
});

// get all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    // get all data from restaurants table + average rating and the number of reviews for each restaurant
    const restaurantRatingData = await pool.query("select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating), 1) as avg_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");

    res.status(200).json({
      status: "success",
      results: restaurantRatingData.rows.length,
      data: {
        restaurants: restaurantRatingData.rows
      }
    });
  }
  catch(err) {
    console.error(err.message);
  }
});

// get a restaurant
app.get("/restaurants/:id", async (req, res) => {
  try {
    // equivalent to select * from restaurants where id = req.params.id
    const restaurant = await pool.query("select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating), 1) as avg_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;", [req.params.id]);

    const reviews = await pool.query("select * from reviews where restaurant_id = $1", [req.params.id]);

    res.status(200).json({
      status:"success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      }
    });
  }
  catch(err) {
    console.error(err.message);
  }
});

// update a restaurant
app.put("/restaurants/:id", async (req, res) => {
  try {
    const results = await pool.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);

    res.status(200).json({
      status:"success",
      data: {
        restaurant: results.rows[0]
      }
    });
  }
  catch(err) {
    console.error(err.message);
  }
});

// delete restaurant
app.delete("/restaurants/:id", async (req, res) => {
  try {
    const deleteReviews = await pool.query(
      "Delete from reviews where restaurant_id = $1;", [req.params.id]);
    
    const deleteRestaurant = await pool.query("DELETE FROM restaurants where id = $1;", [req.params.id]);
    res.status(204).json({
      status: "success"
    });
  }
  catch(err) {
    console.error(err.message);
  }
})

// create a review of a restaurant
app.post("/restaurants/:id/addReview", async(req, res) => {
  try {
    const newReview = await pool.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;", [req.params.id, req.body.name, req.body.review, req.body.rating])
    res.status(201).json({
      status:"success",
      data: {
        review: newReview.rows[0]
      }
    });
  }
  catch(err) {
    console.log(err);
  }
});

app.get("/search", async(req, res) => {
  try {
    const {name} = req.query;
    // ILIKE = not case sensitive version of LIKE
    const restaurant = await pool.query("SELECT * FROM (select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating), 1) as avg_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id) as reset WHERE reset.name ILIKE $1;", [`%${name}%`]);
    res.json(restaurant.rows);
  } 
  catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`)
});