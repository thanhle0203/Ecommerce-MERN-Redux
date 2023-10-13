import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import { ProductPage } from './components/ProductPage';
import {Cart} from './components/Cart';
import User from './components/User';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>    
      
      <Header /> 
      <Routes>
          
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/products' element={<ProductPage />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>

      <Footer />
    </Router>
    

  );
}

export default App;
