using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebNotesAPI.Data;
using WebNotesAPI.Models.Entities;

namespace WebNotesAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class NotesController : Controller
{
    private readonly AppDbContext _context;

    public NotesController(AppDbContext noteDbContext)
    {
        _context = noteDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllNotes(CurrentUser currentUser)
        => Ok(await _context.notes.Where(u => u.OwnerId == currentUser.Id).ToListAsync());


    [HttpGet]
    [Route("{id:Guid}")]
    public async Task<IActionResult> GetNoteById([FromRoute] Guid id)
    {
        var existingNote = await _context.notes.FirstOrDefaultAsync(i => i.Id == id);

        if (existingNote != null)
            return Ok(existingNote);

        return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> AddNote(Note note, CurrentUser currentUser)
    {
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
    public async Task<IActionResult> DeleteAllNotes(CurrentUser currentUser)
    {
        foreach (var note in _context.notes.Where(u => u.OwnerId == currentUser.Id))
            _context.notes.Remove(note);

        await _context.SaveChangesAsync();
        return Ok();
    }
}