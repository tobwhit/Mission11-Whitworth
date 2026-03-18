import type { Book } from './types/Book';
import { useState, useEffect } from 'react';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let url = `https://localhost:5005/Bookstore/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`;

        if (sortOrder) {
          url += `&sortBy=title&sortOrder=${sortOrder}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setBooks(data.books || []);
        setTotalItems(data.totalNumBooks || 0);
        setTotalPages(Math.ceil((data.totalNumBooks || 0) / pageSize));
      } catch (error) {
        console.error('Failed to fetch books:', error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder]);

  const toggleSort = () => {
    if (sortOrder === null) {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder(null);
    }
  };

  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        <h1 className="display-4">Amazon</h1>
        <p className="lead text-muted">Let's cut down our name sake for paper and make a profit!</p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          type="button"
          className={`btn ${sortOrder ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={toggleSort}
        >
          Sort by Title:{' '}
          {sortOrder === 'asc' ? '↑ A-Z' : sortOrder === 'desc' ? '↓ Z-A' : 'Off'}
        </button>

        <div className="d-flex align-items-center">
          <label htmlFor="pageSizeSelect" className="me-2 mb-0">Results per page:</label>
          <select
            id="pageSizeSelect"
            className="form-select form-select-sm w-auto"
            value={pageSize}
            onChange={(b) => {
              setPageSize(Number(b.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
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
                    <strong>Price:</strong> <span className="text-success fw-bold">${b.price}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => setPageNum(pageNum - 1)}
              disabled={pageNum === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${pageNum === index + 1 ? 'active' : ''}`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => setPageNum(index + 1)}
                disabled={pageNum === index + 1}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => setPageNum(pageNum + 1)}
              disabled={pageNum === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BookList;
