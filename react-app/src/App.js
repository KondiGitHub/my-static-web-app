import React, { Component, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NotFound } from './components';
import MortgageCalculator from './products/MortgageCalculator';
import MortagegeDetails from './products/MortagageDetails';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import PhotoGallery from './components/PhotoGallery';
import ServerTest from './products/ServerTest';
import Flowers from './products/Flowers';
import Payment from './components/Payment';
import Completion from './components/Completion';
import AccountProfilePage from './components/AccountProfilePage';
import PrivateRoute from './components/PrivateRoute';
import Cart from './components/Cart';
//import { UserContext } from './UserContext';

// Lazy-loaded component
const Products = lazy(() => import(/* webpackChunkName: "products" */ './products/Products'));

// PrivateRoute implementation for v6+
// const PrivateRoute = ({ children }) => {
//   const { user } = useContext(UserContext);
//   return user ? children : <Navigate to="/login" />;
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripePromise: '',
    };
  }

  render() {
    return (
        <div>
          {/* <HeaderBar /> */}
          <div className="section columns">
            {/* <NavBar /> */}
            <main className="column">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/loanCaluclator" element={<MortgageCalculator />} />
                  <Route path="/detailedLoan" element={<MortagegeDetails />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <AccountProfilePage />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/photo-galary" element={<PhotoGallery />} />
                  <Route path="/serverTest" element={<ServerTest />} />
                  <Route path="/AmmuArts" element={<Flowers />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/completion" element={<Completion />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
    );
  }
}

export default App;
