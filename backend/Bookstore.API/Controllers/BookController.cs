using Bookstore.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers;

[Route("api/[controller]")]
[ApiController]

public class BookController : ControllerBase
{
    private BookstoreDbContext _context;

    public BookController(BookstoreDbContext temp)
    {
        _context = temp;
    }

    [HttpGet]
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string? sortBy = null, [FromQuery] List<string>? bookCategories = null) //because you are returning an object instead of a list of projects, use IActionResult instead of IEnumerable
    {
        
        var query = _context.Books.AsQueryable();
        
        // apply filtering based on selected book categories
        if (bookCategories != null && bookCategories.Any())
        {
            query=query.Where(b => bookCategories.Contains(b.Category));
        }
        
        
        // Apply sorting only if sortBy is provided
        if (!string.IsNullOrEmpty(sortBy))
        {
            if (sortBy.ToLower() == "title")
            {
                query = query.OrderBy(b => b.Title);
            }
            else if (sortBy.ToLower() == "title_desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }
            else if (sortBy.ToLower() == "author")
            {
                query = query.OrderBy(b => b.Author);
            }
        }
        
        var bookList = query
            .Skip(pageSize * (pageNum - 1))
            .Take(pageSize)
            .ToList();
        
        var bookCount = query.Count();

        var resultObject = new
        {
            Books = bookList,
            BookCount = bookCount
        };
        
        return Ok(resultObject);
    }

    [HttpGet("GetBookCategories")]
    public IActionResult GetBookCategories()
    {
        var bookCategories = _context.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
        
        return Ok(bookCategories);
    }

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody]Book newBook)
    {
        _context.Books.Add(newBook);
        _context.SaveChanges();
        return Ok(newBook);
    }

    [HttpPut("UpdateBook/{bookId}")]
    public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
    {
        var existingBook = _context.Books.Find(bookId);
        
        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.ISBN = updatedBook.ISBN;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;
        
        _context.Books.Update(existingBook);
        _context.SaveChanges();
        
        return Ok(existingBook);
    }

    [HttpDelete("DeleteBook/{bookId}")]
    public IActionResult DeleteBook(int bookId)
    {
        var book = _context.Books.Find(bookId);

        if (book == null)
        {
            return NotFound(new { message = "Book not found." });
            
        }
        _context.Books.Remove(book);
        _context.SaveChanges();
        
        return NoContent();
    }
        
}