using Microsoft.EntityFrameworkCore;
using WebNotesAPI.Models.Entities;

namespace WebNotesAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Note> notes { get; set; }
    public DbSet<User> users { get; set; }
    public DbSet<Todo> todos { get; set; }
}