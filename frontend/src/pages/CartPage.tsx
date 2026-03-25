import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';
import WelcomeBand from '../components/WelcomeBand';
import CheckoutModal from '../components/CheckoutModal';
import './CartPage.css';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  return (
    <>
      <WelcomeBand />
      <div className="cart-page">
        <h1>Your Cart</h1>
        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item: CartItem) => (
                <li key={item.bookID} className="cart-item">
                  <div className="cart-item-details">
                    <div className="cart-item-title">{item.title}</div>
                    <div className="cart-item-info">
                      ${item.price.toFixed(2)} × {item.quantity} = $
                      {item.subtotal.toFixed(2)}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.bookID)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-total">Total: ${totalAmount.toFixed(2)}</div>
          </>
        )}
        <div className="cart-actions">
          <button
            type="button"
            className="continue-browsing-button"
            onClick={() => navigate('/projects')}
          >
            Continue Browsing
          </button>
          <button
            type="button"
            className="checkout-button"
            disabled={cart.length === 0}
            onClick={() => setShowCheckoutModal(true)}
          >
            Checkout
          </button>
        </div>

        {/* Bootstrap Modal - only shows when showCheckoutModal is true */}
        {showCheckoutModal && (
          <CheckoutModal
            cart={cart}
            totalAmount={totalAmount}
            onClose={() => setShowCheckoutModal(false)}
          />
        )}
      </div>
    </>
  );
}
export default CartPage;
