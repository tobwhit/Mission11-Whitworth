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
    public async Task<IActionResult> GetAllBooks(int pageSize = 5, int pageNum = 1, string? sortBy = null, string? sortOrder = null)
    {
        var query = _bookstoreDbContext.Books.AsQueryable();

        // Apply sorting if sortBy and sortOrder are provided
        if (!string.IsNullOrEmpty(sortBy) && sortBy.ToLower() == "title" && !string.IsNullOrEmpty(sortOrder))
        {
            query = sortOrder.ToLower() == "desc"
                ? query.OrderByDescending(b => b.Title)
                : query.OrderBy(b => b.Title);
        }

        // Then apply pagination
        var books = await query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var totalNumBooks = await _bookstoreDbContext.Books.CountAsync();

        return Ok(new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        });
    }
}