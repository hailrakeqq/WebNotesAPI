namespace WebNotesAPI.Models.Entities;

public class Todo
{
    public string? Id { get; set; }
    public string? OwnerId { get; set; }
    public string? Title { get; set; }
    public bool isComplete { get; set; }
}