using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebNotesAPI.Data;
using Microsoft.AspNetCore.Authorization;
using WebNotesAPI.Models.Entities;


namespace WebNotesAPI.Controllers;

[Route("api/[controller]")]
[Authorize]
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
    {
        return Ok(await _context.todos.Where(u => u.OwnerId == currentUser.Id).ToListAsync());
    }

    [HttpGet]
    [Route("{id:Guid}")]
    public async Task<IActionResult> GetTodoById(string id)
    {
        var todo = await _context.todos.Where(u => u.Id == id).FirstOrDefaultAsync();
        return todo != null ? Ok(todo) : NotFound();
    }

    [HttpPost]
    [Route("AddTodo")]
    public async Task<IActionResult> AddTodo(CurrentUser currentUser, [FromBody] Todo todo)
    {
        todo.Id = Guid.NewGuid().ToString();
        todo.OwnerId = currentUser.Id;

        await _context.todos.AddAsync(todo);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAllTodo), new { id = todo.Id }, todo);
    }

    [HttpPut]
    [Route("{id:Guid}")]
    public async Task<IActionResult> UpdateTodo([FromRoute] string id, [FromBody] Todo todo)
    {
        var existingTodo = await _context.todos.FirstOrDefaultAsync(t => t.Id == id);

        if (existingTodo != null)
        {
            existingTodo.Title = todo.Title;
            existingTodo.isComplete = todo.isComplete;
            await _context.SaveChangesAsync();

            return Ok(existingTodo);
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