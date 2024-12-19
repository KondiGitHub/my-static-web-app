import React, { Component, lazy, Suspense } from 'react';
import 'bulma/css/bulma.css';
import './styles.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { HeaderBar, NavBar, NotFound } from './components';
import About from './About';
import MortgageCalculator from './products/MortgageCalculator';
import MortagegeDetails from './products/MortagageDetails';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import PhotoGallery from './components/PhotoGallery';
import ServerTest from './products/ServerTest';
import Flowers from './products/Flowers';

const Products = withRouter(
  lazy(() => import(/* webpackChunkName: "products" */ './products/Products'))
);

class App extends Component {
  render() {
    return (
      <div>
        {/* <HeaderBar /> */}
        <div className="section columns">
          {/* <NavBar /> */}
          <main className="column">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Redirect from="/" exact to="/home" />
                {/* <Route path="/products" component={Products} />
                <Route path="/about" component={About} /> */}
                 <Route exact path="/home" component={Home} />
                <Route exact path="/loanCaluclator" component={MortgageCalculator} />
                <Route exact path="/detailedLoan" component={ MortagegeDetails} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/photo-galary" component={PhotoGallery} />
                <Route exact path="/serverTest" component={ServerTest} />
                <Route exact path="/AmmuArts" component={Flowers} />
                <Route exact path="**" component={NotFound} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
