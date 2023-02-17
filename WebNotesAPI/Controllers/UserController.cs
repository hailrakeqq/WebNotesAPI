using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebNotesAPI.Auth;
using WebNotesAPI.Authorization;
using WebNotesAPI.Data;
using WebNotesAPI.Models.Entities;
using WebNotesAPI.Tools;

namespace WebNotesAPI.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class UserController : Controller
{
    private readonly NotesDbContext _context;
    private readonly ITokenService _tokenService;
    private readonly LoginResponce _loginResponce;

    public UserController(NotesDbContext context, ITokenService tokenService, LoginResponce tokenResponce)
    {
        _context = context;
        _tokenService = tokenService;
        _loginResponce = tokenResponce;
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("Registration")]
    public async Task<IActionResult> CreateUser(User user)
    {
        var currentUser = _context.users.FirstOrDefault(u => u.Email == user.Email &&
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
    [AllowAnonymous]
    [Route("Login")]
    public IActionResult Login([FromBody] UserLoginModel userLoginModel)
    {
        var currentUser = _context.users.FirstOrDefault(u =>
            u.Email!.ToLower() == userLoginModel.Email!.ToLower() &&
            u.Password == Toolchain.GenerateHash(userLoginModel.Password!));

        if (currentUser != null)
        {
            _loginResponce.Id = currentUser.Id;
            _loginResponce.Email = currentUser.Email;
            _loginResponce.Username = currentUser.Username;
            _loginResponce.Role = currentUser.Role;
            _loginResponce.JWTToken = _tokenService.GenerateToken(currentUser);
            _loginResponce.RefreshToken = "test";
            return Ok(_loginResponce);
        }

        return Unauthorized(currentUser);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUser([FromHeader] string ownerId)
    {
        var user = await _context.users.FirstOrDefaultAsync(u => u.Id == ownerId && u.Role == "admin");

        if (user != null)
            return Ok(_context.users.ToList());
        return NotFound();
    }


    [HttpGet]
    [Route("{id:Guid}")]
    public async Task<IActionResult> GetUser([FromRoute] string id)
    {
        var user = await _context.users.FirstOrDefaultAsync(u => u.Id == id);

        if (user != null)
            return Ok(user);
        return NotFound();
    }

    [HttpPut]
    [Route("ChangeEmail/{id:Guid}")]
    public async Task<IActionResult> ChangeUserEmail([FromRoute] string id, [FromBody] UserChangeDataModel newUserData)
    {
        var existingUser = await _context.users.FirstOrDefaultAsync(i => i.Id == id);

        if (existingUser != null)
        {
            if (existingUser.Password == Toolchain.GenerateHash(newUserData.ConfirmPassword!))
            {
                existingUser.Email = newUserData.Email;
                await _context.SaveChangesAsync();

                return Ok("Your e-mail has been changed successfully.");
            }
            return Unauthorized("You enter wrong password");
        }
        return NotFound();
    }

    [HttpPut]
    [Route("ChangeUsername/{id:Guid}")]
    public async Task<IActionResult> ChangeUsername([FromRoute] string id, [FromBody] UserChangeDataModel newUserData)
    {
        var existingUser = await _context.users.FirstOrDefaultAsync(i => i.Id == id);

        if (existingUser != null)
        {
            if (existingUser.Password == Toolchain.GenerateHash(newUserData.ConfirmPassword!))
            {
                existingUser.Username = newUserData.Username;
                await _context.SaveChangesAsync();

                return Ok("Your username has been changed successfully.");
            }
            return Unauthorized("You enter wrong password");
        }
        return NotFound();
    }

    [HttpPut]
    [Route("ChangePassword/{id:Guid}")]
    public async Task<IActionResult> ChangeUserPassword([FromRoute] string id, [FromBody] UserChangeDataModel newUserData)
    {
        var existingUser = await _context.users.FirstOrDefaultAsync(i => i.Id == id);

        if (existingUser != null)
        {
            if (existingUser.Password == Toolchain.GenerateHash(newUserData.ConfirmPassword!))
            {
                existingUser.Password = Toolchain.GenerateHash(newUserData.Password!);
                await _context.SaveChangesAsync();

                return Ok("Your password has been changed successfully.");
            }
            return Unauthorized("You enter wrong password");
        }
        return NotFound();
    }

    [HttpPut]
    [Route("PromoteToAdmin/{id:Guid}")]
    public async Task<IActionResult> PromoteToAdmin([FromRoute] string id, [FromHeader] string adminId)
    {
        var existingUser = await _context.users.FirstOrDefaultAsync(u => u.Id == id);
        var userWhoPromoted = await _context.users.FirstOrDefaultAsync(u => u.Id == adminId && u.Role == "admin");

        if (existingUser != null)
        {
            if (userWhoPromoted != null && existingUser.Role != "admin")
                existingUser.Role = "admin";
            await _context.SaveChangesAsync();
            return Ok($"User {existingUser.Username} was promoted to admin");
        }
        return NotFound("We can't find user, or user already had role \"admin\"");
    }

    [HttpDelete]
    [Route("{id:Guid}")]
    public async Task<IActionResult> DeleteUser([FromRoute] string id, [FromBody] UserChangeDataModel newUserData)
    {
        var existingUser = await _context.users.FirstOrDefaultAsync(i => i.Id == id);

        if (existingUser != null)
        {
            if (existingUser.Password == Toolchain.GenerateHash(newUserData.ConfirmPassword!))
            {
                foreach (var note in _context.notes.Where(u => u.OwnerId == existingUser.Id))
                    _context.notes.Remove(note);

                _context.users.Remove(existingUser);
                await _context.SaveChangesAsync();

                return Ok("You successfully delete your account");
            }
            return Unauthorized("You enter wrong password");
        }

        return NotFound();
    }
}