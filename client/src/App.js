import './App.css';
import { Header } from './components/templates/Header';
import { AnimalIcons } from './components/templates/AnimalIcons';
import { Footer } from './components/templates/Footer';
import { Home } from './components/pages/Home';
import { Products } from './components/pages/Products';
import { IndividualProduct } from './components/pages/IndividualProduct';
import { Cart } from './components/templates/Cart';
import { Login } from './components/authentication/Login';
import { Register } from './components/authentication/Register';
import { ChangePassword } from './components/authentication/ChangePassword';
import { ChangeEmail } from './components/authentication/ChangeEmail';
import { Profile } from './components/pages/Profile';
import { Checkout } from './components/pages/Checkout';
import { AccountDetails } from './components/pages/AccountDetails';
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {

  const showCart = useSelector(state => state.cart.showCart);
  const showLoginModal = useSelector(state => state.login.showLoginModal);
  const showRegisterModal = useSelector(state => state.login.showRegisterModal);
  const showChangePasswordModal = useSelector(state => state.login.showChangePasswordModal)
  const showChangeEmailModal = useSelector(state => state.login.showChangeEmailModal);
  const { products } = useSelector(state => state.products);

  return <div className="App">
    <Header />
    <AnimalIcons />
    {showCart && <Cart />}
    {showLoginModal && <Login />}
    {showRegisterModal && <Register />}
    {showChangePasswordModal && <ChangePassword />}
    {showChangeEmailModal && <ChangeEmail />}
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="products"
          element={
            products.length !== 0 ?
              (<Products />) : (<Navigate replace to="/" />)
          }
        />
        <Route path="products/:pet/:product_id" element={<IndividualProduct />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="account-details" element={<AccountDetails />} />
      </Routes>
    </main>
    <Footer />
  </div>

}

export default App;
