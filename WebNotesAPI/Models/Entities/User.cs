using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace WebNotesAPI.Models.Entities;

public class User
{
    public Guid Id { get; set; }
    public string? Email { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
}

public class UserLoginModel
{
    [Required]
    public string? Email { get; set; }

    [Required]
    public string? Password { get; set; }
}