using Microsoft.EntityFrameworkCore;
using WebNotesAPI.Models.Entities;

namespace WebNotesAPI.Data;

public class NotesDbContext : DbContext
{
    public NotesDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Note> notes { get; set; }
    public DbSet<User> users { get; set; }
}