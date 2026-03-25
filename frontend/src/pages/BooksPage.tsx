import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import WelcomeBand from '../components/WelcomeBand';
import { useState } from 'react';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container">
      <WelcomeBand />
      <div className="row">
        <div className="col-md-2">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-10">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
