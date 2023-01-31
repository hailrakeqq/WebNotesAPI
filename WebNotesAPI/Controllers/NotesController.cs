using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebNotesAPI.Data;
using WebNotesAPI.Models.Entities;

namespace WebNotesAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : Controller
{
    private readonly NotesDbContext noteDbContext;

    public NotesController(NotesDbContext noteDbContext)
    {
        this.noteDbContext = noteDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllNotes() => Ok(await noteDbContext.notes.ToListAsync());

    [HttpGet]
    [Route("{id:Guid}")]
    public async Task<IActionResult> GetNoteById([FromRoute] Guid id)
    {
        var existingNote = await noteDbContext.notes.FirstOrDefaultAsync(i => i.Id == id);

        if (existingNote != null)
            return Ok(existingNote);

        return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> AddNote(Note note)
    {
        note.Id = Guid.NewGuid();

        await noteDbContext.notes.AddAsync(note);
        await noteDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetNoteById), new { id = note.Id }, note);
    }

    [HttpPut]
    [Route("{id:Guid}")]
    public async Task<IActionResult> UpdateNote([FromRoute] Guid id, [FromBody] Note updatedNote)
    {
        var existingNote = await noteDbContext.notes.FirstOrDefaultAsync(x => x.Id == id);

        if (existingNote != null)
        {
            existingNote.Title = updatedNote.Title;
            existingNote.Description = updatedNote.Description;

            await noteDbContext.SaveChangesAsync();

            return Ok(existingNote);
        }

        return NotFound();
    }

    [HttpDelete]
    [Route("{id:Guid}")]
    public async Task<IActionResult> DeleteNote([FromRoute] Guid id)
    {
        var existingNote = await noteDbContext.notes.FirstOrDefaultAsync(i => i.Id == id);

        if (existingNote != null)
        {
            noteDbContext.notes.Remove(existingNote);
            await noteDbContext.SaveChangesAsync();

            return Ok();
        }

        return NotFound();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAllNotes()
    {
        foreach (var note in noteDbContext.notes)
            noteDbContext.notes.Remove(note);

        await noteDbContext.SaveChangesAsync();
        return Ok();
    }
}