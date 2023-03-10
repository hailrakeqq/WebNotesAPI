using System.ComponentModel.DataAnnotations;

namespace WebNotesAPI.Models.Entities;

public class User
{
    public string? Id { get; set; } = default!;
    public string? Email { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Role { get; set; }
}

public class UserLoginModel
{
    [Required]
    public string? Email { get; set; }

    [Required]
    public string? Password { get; set; }
}

public class UserChangeDataModel
{
    public string? Email { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Role { get; set; }

    [Required]
    public string? ConfirmPassword { get; set; }
}