using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebNotesAPI.Auth;
using WebNotesAPI.Data;
using WebNotesAPI.Models.Entities;

namespace WebNotesAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class NotesController : Controller
{
    private readonly NotesDbContext _context;
    private readonly CurrentUser _currentUser;

    public NotesController(NotesDbContext noteDbContext, CurrentUser currentUser)
    {
        _context = noteDbContext;
        _currentUser = currentUser;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllNotes()
    {
        var currentUser = _currentUser.GetCurrentUser();
        return Ok(await _context.notes.Where(u => u.OwnerId == currentUser.Id).ToListAsync());
    }

    [HttpGet]
    [Route("{id:Guid}")]
    public async Task<IActionResult> GetNoteById([FromRoute] Guid id)
    {
        var currentUser = _currentUser.GetCurrentUser();
        var existingNote = await _context.notes.FirstOrDefaultAsync(i => i.Id == id);

        if (existingNote != null)
            return Ok(existingNote);

        return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> AddNote(Note note)
    {
        var currentUser = _currentUser.GetCurrentUser();

        note.Id = Guid.NewGuid();
        note.OwnerId = currentUser.Id;

        await _context.notes.AddAsync(note);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetNoteById), new { id = note.Id }, note);
    }

    [HttpPut]
    [Route("{id:Guid}")]
    public async Task<IActionResult> UpdateNote([FromRoute] Guid id, [FromBody] Note updatedNote)
    {
        var existingNote = await _context.notes.FirstOrDefaultAsync(x => x.Id == id);

        if (existingNote != null)
        {
            existingNote.Title = updatedNote.Title;
            existingNote.Description = updatedNote.Description;

            await _context.SaveChangesAsync();

            return Ok(existingNote);
        }

        return NotFound();
    }

    [HttpDelete]
    [Route("{id:Guid}")]
    public async Task<IActionResult> DeleteNote([FromRoute] Guid id)
    {
        var existingNote = await _context.notes.FirstOrDefaultAsync(i => i.Id == id);

        if (existingNote != null)
        {
            _context.notes.Remove(existingNote);
            await _context.SaveChangesAsync();

            return Ok();
        }

        return NotFound();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAllNotes()
    {
        var currentUser = _currentUser.GetCurrentUser();
        foreach (var note in _context.notes.Where(u => u.OwnerId == currentUser.Id))
            _context.notes.Remove(note);

        await _context.SaveChangesAsync();
        return Ok();
    }
}