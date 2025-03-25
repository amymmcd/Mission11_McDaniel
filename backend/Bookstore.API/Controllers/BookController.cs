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
    public IEnumerable<Book> GetBooks()
    {
        var books = _context.Books.ToList();
        return books;
    }
}