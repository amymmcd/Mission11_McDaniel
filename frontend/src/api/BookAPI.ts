import { Book } from '../types/Book';

interface FetchBooksResponse {
  bookCount: number;
  books: Book[];
  totalNumBooks: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortBy: string,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
      .join('&');
    const response = await fetch(
      `http://localhost:4000/api/Book?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch books`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
