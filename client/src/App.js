import React, {Fragment} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RestaurantsContextProvider } from './context/contextAPI';
import Home from './routes/Home';
import ReviewModal from './routes/ReviewModal';

function App() {
  return (
    <RestaurantsContextProvider>
      <Fragment>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact path="/restaurants/:id"
              component={ReviewModal}
            />
          </Switch>
        </Router>
      </div>
      </Fragment>
    </RestaurantsContextProvider>

  );
}

export default App;
