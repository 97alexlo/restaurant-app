CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(200) NOT NULL,
  price_range INT NOT NULL CHECK(price_range >=1 and price_range <=5)
);

CREATE TABLE reviews (
  id bigserial NOT NULL PRIMARY KEY, 
  restaurant_id BIGINT REFERENCES restaurants(id), 
  name VARCHAR(50) NOT NULL, 
  review TEXT NOT NULL, 
  rating INT NOT NULL CHECK(rating >=1 and rating <=5)
  );