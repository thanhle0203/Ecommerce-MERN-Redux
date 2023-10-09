import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import { ProductPage } from './components/ProductPage';

function App() {
  return (
    <Router>    
      <Header />   

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductPage />} />
      </Routes>

      <Footer />
    </Router>
    

  );
}

export default App;
