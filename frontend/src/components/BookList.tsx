import type { Book } from '../types/Book';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';
import { fetchBooks } from '../api/BooksAPI';
import CartSummary from './CartSummary';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  // Necesary state variables to keep track of
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories, sortOrder);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  const toggleSort = () => {
    if (sortOrder === null) {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder(null);
    }
  };

  const { addToCart } = useCart();

  const handleAddToCart = (
    bookID: number,
    title: string,
    price: number,
    quantity = 1,
    subtotal = price
  ) => {
    const newItem: CartItem = { bookID, title, price, quantity, subtotal };
    addToCart(newItem);
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container my-4">
      <CartSummary />
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Toggle sort button to toggle between 3 sort options, asc, desc, off */}
        <button
          type="button"
          className={`btn ${sortOrder ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={toggleSort}
        >
          Sort by Title:{' '}
          {sortOrder === 'asc'
            ? '↑ A-Z'
            : sortOrder === 'desc'
              ? '↓ Z-A'
              : 'Off'}
        </button>
      </div>

      <div className="row">
        {books.map((b) => (
          <div className="col-md-6 col-lg-4 mb-3" key={b.bookID}>
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{b.title}</h5>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <strong>Author:</strong> {b.author}
                  </li>
                  <li className="mb-2">
                    <strong>Publisher:</strong> {b.publisher}
                  </li>
                  <li className="mb-2">
                    <strong>ISBN:</strong> {b.isbn}
                  </li>
                  <li className="mb-2">
                    <strong>Classification:</strong> {b.classification}
                  </li>
                  <li className="mb-2">
                    <strong>Category:</strong> {b.category}
                  </li>
                  <li className="mb-2">
                    <strong>Pages:</strong> {b.pageCount}
                  </li>
                  <li>
                    <strong>Price:</strong>{' '}
                    <span className="text-success fw-bold">${b.price}</span>
                  </li>
                </ul>

                <button
                  className="btn btn-success"
                  onClick={() => handleAddToCart(b.bookID, b.title, b.price)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
}

export default BookList;
