interface PaginationProps {
  pageNum: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

function Pagination({
  pageNum,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <>
      {/* Pagination element*/}
      <div className="d-flex align-items-center">
        <label htmlFor="pageSizeSelect" className="me-2 mb-0">
          Results per page:
        </label>
        <select
          id="pageSizeSelect"
          className="form-select form-select-sm w-auto"
          value={pageSize}
          onChange={(b) => {
            onPageSizeChange(Number(b.target.value));
            onPageChange(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      {/* Page Navigation */}
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(pageNum - 1)}
              disabled={pageNum === 1}
            >
              Previous
            </button>
          </li>
          {/* This only displays the number of pages depending on how many results are shown per page */}
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${pageNum === index + 1 ? 'active' : ''}`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange(index + 1)}
                disabled={pageNum === index + 1}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(pageNum + 1)}
              disabled={pageNum === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
