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
import { Profile } from './components/pages/Profile';
import { Checkout } from './components/pages/Checkout';
import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {

  const showCart = useSelector(state => state.cart.showCart);
  const showLoginModal = useSelector(state => state.login.showLoginModal)
  const showRegisterModal = useSelector(state => state.login.showRegisterModal)

  return <div className="App">
    <Header />
    <AnimalIcons />
    {showCart && <Cart />}
    {showLoginModal && <Login />}
    {showRegisterModal && <Register />}
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:pet/:product_id" element={<IndividualProduct />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </main>
    <Footer />
  </div>

}

export default App;
