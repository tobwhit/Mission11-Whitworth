import type { CartItem } from '../types/CartItem';

interface CheckoutModalProps {
  cart: CartItem[];
  totalAmount: number;
  onClose: () => void;
}

function CheckoutModal({ cart, totalAmount, onClose }: CheckoutModalProps) {
  const handleCheckout = () => {
    alert('Order placed successfully! (This is a demo)');
    onClose();
  };

  return (
    <>
      {/* Bootstrap Modal Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade show"
        style={{ display: 'block' }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Checkout</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <h6>Order Summary</h6>
              <ul className="list-group mb-3">
                {cart.map((item) => (
                  <li
                    key={item.bookID}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <div>
                      <strong>{item.title}</strong>
                      <br />
                      <small>
                        ${item.price.toFixed(2)} × {item.quantity}
                      </small>
                    </div>
                    <span>${item.subtotal.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong className="text-success">
                  ${totalAmount.toFixed(2)}
                </strong>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCheckout}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutModal;
