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
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1) //because you are returning an object instead of a list of projects, use IActionResult instead of IEnumerable
    {
        
        var bookList = _context.Books
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
}