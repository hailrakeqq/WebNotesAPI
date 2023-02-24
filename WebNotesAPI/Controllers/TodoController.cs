using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebNotesAPI.Data;
using WebNotesAPI.Models.Entities;

namespace WebNotesAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TodoController : Controller
{
    private readonly AppDbContext _context;

    public TodoController(AppDbContext appDbContext)
    {
        _context = appDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTodo(CurrentUser currentUser)
        => Ok(await _context.todos.Where(u => u.OwnerId == currentUser.Id).ToListAsync());

    [HttpGet]
    [Route("{id:Guid}")]
    public async Task<IActionResult> GetTodoById(CurrentUser currentUser, [FromRoute] string id)
    {
        var todo = await _context.todos.FirstOrDefaultAsync(u => u.Id == id && u.OwnerId == currentUser.Id);

        return todo != null ? Ok(todo) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> AddTodo(CurrentUser currentUser, [FromBody] Todo todo)
    {
        todo.Id = Guid.NewGuid().ToString();
        todo.OwnerId = currentUser.Id;

        await _context.todos.AddAsync(todo);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
    }

    [HttpPut]
    [Route("{id:Guid}")]
    public async Task<IActionResult> UpdateTodo([FromRoute] string id, [FromBody] Todo todo)
    {
        var existingTodo = await _context.todos.FirstOrDefaultAsync(t => t.Id == id);

        if (existingTodo != null)
        {
            existingTodo.Title = todo.Title;
            await _context.SaveChangesAsync();

            Ok(existingTodo);
        }
        return NotFound();
    }

    [HttpDelete]
    [Route("{id:Guid}")]
    public async Task<IActionResult> DeleteTodo([FromRoute] string id)
    {
        var existTodo = await _context.todos.FirstOrDefaultAsync(t => t.Id == id);

        if (existTodo != null)
        {
            _context.todos.Remove(existTodo);
            await _context.SaveChangesAsync();
        }

        return NotFound();
    }
}