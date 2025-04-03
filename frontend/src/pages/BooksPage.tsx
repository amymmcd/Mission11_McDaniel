import PageTitle from '../components/PageTitle';
import BookList from '../components/BookList';
import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <CartSummary />
      <PageTitle />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories}/>
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
