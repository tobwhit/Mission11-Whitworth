import { useToast } from '../context/ToastContext';
import './ToastContainer.css';

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container-custom">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast show bg-${toast.type} text-white`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Close notification"
              onClick={() => removeToast(toast.id)}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
