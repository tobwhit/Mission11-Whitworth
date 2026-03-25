import './App.css';
import CartSummary from './components/CartSummary';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <>
      <ToastProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<BooksPage />} />
              <Route path="/projects" element={<BooksPage />} />
              <Route path="/cartSummary" element={<CartSummary />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Router>
          <ToastContainer />
        </CartProvider>
      </ToastProvider>
    </>
  );
}

export default App;
