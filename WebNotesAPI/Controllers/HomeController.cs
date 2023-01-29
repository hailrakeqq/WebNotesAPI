/*
    Controller with main functionality
        -> CRUD for notes 
*/

using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebNote.Models;
using WebNotesAPI.Data;
using WebNotesAPI.Models.Entities;


namespace WebNote.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly NotesDbContext _noteDbContext;

    public HomeController(ILogger<HomeController> logger, NotesDbContext noteDbContext)
    {
        _logger = logger;
        _noteDbContext = noteDbContext;
    }

    public IActionResult Index() => View();

    [HttpGet]
    public IActionResult AddNotePage() => View();

    public IActionResult NotFoundPage() => View();

    [HttpGet]
    [ActionName("ViewNotePage")]
    public IActionResult GetAllNotes()
    {
        ViewData["notes"] = _noteDbContext.notes.ToList().Reverse<Note>();
        return View();
    }

    [HttpGet]
    [ActionName("ChangeNotePage")]
    public async Task<IActionResult> GetNoteById([FromRoute] Guid id)
    {
        var existingNote = await _noteDbContext.notes.FirstOrDefaultAsync(i => i.Id == id);

        if (existingNote != null)
            return View(existingNote);

        return NotFoundPage();
    }

    [HttpPost]
    public async Task<IActionResult> AddNote(Note note)
    {
        note.Id = Guid.NewGuid();

        await _noteDbContext.notes.AddAsync(note);
        await _noteDbContext.SaveChangesAsync();

        return RedirectToAction("ViewNotePage");
    }

    public async Task<IActionResult> UpdateNote([FromRoute] Guid id, Note updatedNote)
    {
        var existingNote = await _noteDbContext.notes.FirstOrDefaultAsync(x => x.Id == id);

        if (existingNote != null)
        {
            existingNote.Title = updatedNote.Title;
            existingNote.Description = updatedNote.Description;

            await _noteDbContext.SaveChangesAsync();

            return RedirectToAction("ViewNotePage");
        }

        return NotFoundPage();
    }

    public async Task<IActionResult> DeleteNote([FromRoute] Guid id)
    {
        var existingNote = await _noteDbContext.notes.FirstOrDefaultAsync(i => i.Id == id);

        if (existingNote != null)
        {
            _noteDbContext.notes.Remove(existingNote);
            await _noteDbContext.SaveChangesAsync();

            return RedirectToAction("ViewNotePage");
        }

        return NotFoundPage();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error() =>
        View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
}
