using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11.API.Data;

namespace Mission11.API.Controllers;

[Route("[controller]")]
[ApiController]
public class BookstoreController : ControllerBase
{
    private BookstoreDbContext _bookstoreDbContext;
    
    public BookstoreController(BookstoreDbContext temp) => _bookstoreDbContext = temp;

    [HttpGet("AllBooks")]
    public async Task<IActionResult> GetAllBooks(int pageSize = 5, int pageNum = 1, string? sortBy = null, string? sortOrder = null, [FromQuery] List<string>? category = null )
    {
        var query = _bookstoreDbContext.Books.AsQueryable();
        
        // Apply sorting if sortBy and sortOrder are provided
        if (!string.IsNullOrEmpty(sortBy) && sortBy.ToLower() == "title" && !string.IsNullOrEmpty(sortOrder))
        {
            query = sortOrder.ToLower() == "desc"
                ? query.OrderByDescending(b => b.Title)
                : query.OrderBy(b => b.Title);
        }

        if (category != null && category.Any())
        {
            query = query.Where(b => category.Contains(b.Category));
        }
        
        var totalNumBooks = query.Count();
        // Then apply pagination
        var books = await query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return Ok(new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        });
    }

    [HttpGet("GetBookCategories")]
    public IActionResult GetBookCategories()
    {
        var bookCategories = _bookstoreDbContext.Books.Select(b => b.Category).Distinct().ToList();
        
        return Ok(bookCategories);
    }
    
    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        _bookstoreDbContext.Books.Add(newBook);
        _bookstoreDbContext.SaveChanges();
        return Ok(newBook);
    }

    [HttpPut("UpdateBook/{BookID}")]
    public IActionResult UpdateBook(int BookID, [FromBody] Book updatedBook)
    {
        var existingBook = _bookstoreDbContext.Books.Find(BookID);
        
        existingBook.Title =  updatedBook.Title;
        existingBook.Publisher =  updatedBook.Publisher;
        existingBook.Author =  updatedBook.Author;
        existingBook.ISBN = updatedBook.ISBN;
        existingBook.Classification =  updatedBook.Classification;
        existingBook.Category =  updatedBook.Category;
        existingBook.PageCount =  updatedBook.PageCount;
        existingBook.Price =  updatedBook.Price;

        _bookstoreDbContext.Update(existingBook);
        _bookstoreDbContext.SaveChanges();
        return Ok(existingBook);
    }

    [HttpDelete("DeleteBook/{BookID}")]
    public IActionResult DeleteBook(int BookID)  
    {
        var book = _bookstoreDbContext.Books.Find(BookID);

        if (book == null)
        {
            return NotFound(new { message = "Book not found" });
        }

        _bookstoreDbContext.Books.Remove(book);
        _bookstoreDbContext.SaveChanges();

        return NoContent();
    }
}