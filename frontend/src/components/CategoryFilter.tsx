import { useEffect, useState } from 'react';
import './CategoryFilter.css';
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5005/Bookstore/GetBookCategories'
        );
        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckbocChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h5>Book Categories</h5>
      <div className="category-list">
        {categories.map((c) => {
          return (
            <div key={c} className="category-item">
              <input
                className="category-checkbox"
                type="checkbox"
                id={c}
                value={c}
                onChange={handleCheckbocChange}
              />
              <label htmlFor={c}>{c} </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;
