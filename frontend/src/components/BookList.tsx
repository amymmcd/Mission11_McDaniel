import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BookAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortBy,
          selectedCategories
        );

        setBooks(data.books);
        setTotalPages(Math.ceil(data.bookCount / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortBy, selectedCategories]);

  if (loading) {
    return <div>Loading Books...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <label>
        Sort by:
        <select
          value={sortBy}
          onChange={(s) => {
            setSortBy(s.target.value);
            setPageNum(1);
          }}
        >
          <option value="">No Sort</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </label>
      <br />
      <br />
      {books.map((b) => (
        <div
          id="bookCard"
          className="card"
          style={{ width: '700px' }}
          key={b.bookID}
        >
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Page Count: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${b.price}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(
                  `/buy/${b.bookID}/${encodeURIComponent(b.title)}/${b.price}`
                )
              }
            >
              Buy
            </button>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
      <br />
    </>
  );
}

export default BookList;
