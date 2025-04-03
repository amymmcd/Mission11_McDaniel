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
        
        var bookCount = _context.Books.Count();

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
        
}