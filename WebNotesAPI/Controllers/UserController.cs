using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebNotesAPI.Auth;
using WebNotesAPI.Data;
using WebNotesAPI.Models.Entities;
using WebNotesAPI.Tools;

namespace WebNotesAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : Controller
{
    private readonly NotesDbContext _context;
    private readonly ITokenService _tokenService;
    // private readonly CurrentUser? _currentUser = null;
    public UserController(NotesDbContext context, ITokenService tokenService)//, CurrentUser currentUser)
    {
        _context = context;
        _tokenService = tokenService;
        // _currentUser = currentUser;
    }

    [HttpGet("Admin")]
    [Authorize]
    public IActionResult AdminsEndpoint(CurrentUser currentUser)
    {
        return Ok($"test:your name is {currentUser.Username} your id is {currentUser.Id}");
    }

    [HttpPost]
    [Route("Registration")]
    public async Task<IActionResult> CreateUser(User user)
    {
        var currentUser = _context.users.FirstOrDefault(u => u.Email == user.Email ||
                                                             u.Username == user.Username);

        if (currentUser == null)
        {
            user.Id = Guid.NewGuid().ToString();
            user.Password = Toolchain.GenerateHash(user.Password!);
            user.Role = "user";

            await _context.users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        return Conflict("Account with these email or username already exist");
    }

    [HttpPost]
    [Route("Login")]
    public IActionResult Login([FromBody] UserLoginModel userLoginModel)
    {
        var currentUser = _context.users.FirstOrDefault(u =>
            u.Email!.ToLower() == userLoginModel.Email!.ToLower() &&
            u.Password == Toolchain.GenerateHash(userLoginModel.Password!));

        if (currentUser != null)
            return Ok(_tokenService.GenerateToken(currentUser));

        return Unauthorized(currentUser);
    }

    [HttpDelete]
    [Route("{id:Guid}")]
    [Authorize]
    public async Task<IActionResult> DeleteUser([FromRoute] string id)
    {
        var existingUser = await _context.users.FirstOrDefaultAsync(i => i.Id == id);

        if (existingUser != null)
        {
            _context.users.Remove(existingUser);
            await _context.SaveChangesAsync();

            return Ok();
        }

        return NotFound();
    }
}