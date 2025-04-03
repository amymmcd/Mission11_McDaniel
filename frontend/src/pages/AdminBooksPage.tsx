import PageTitle from '../components/PageTitle';
import Pagination from '../components/Pagination';
import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { fetchBooks } from '../api/BookAPI';

function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(pageSize, pageNum, '', []);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.bookCount / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum]);
  if (loading) {
    return <div>Loading Books...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1>Admin - Books</h1>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Title</td>
            <td>Author</td>
            <td>Publisher</td>
            <td>ISBN</td>
            <td>Classification</td>
            <td>Category</td>
            <td>Page Count</td>
            <td>Price</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.bookID}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>{b.price}</td>
              <td>
                <button onClick={() => console.log(`Edit book ${b.bookID}`)}>
                  Edit
                </button>
                <button onClick={() => console.log(`Delete book ${b.bookID}`)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
}
export default AdminBooksPage;
