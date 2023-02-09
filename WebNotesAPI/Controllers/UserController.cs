using Microsoft.AspNetCore.Mvc;
using WebNotesAPI.Auth;
using WebNotesAPI.Data;
using WebNotesAPI.Models.Entities;
using WebNotesAPI.Tools;

namespace WebNotesAPI.Controllers;
/*
    todo: 
    > add login function
    > add check if account with email are exist
*/
// [Route("api/[controller]")]
[ApiController]
public class UserController : Controller
{
    private readonly NotesDbContext _context;
    private readonly ITokenService _tokenService;
    // private readonly AuthenticateExtension _auth;

    public UserController(NotesDbContext context, ITokenService tokenService)//, AuthenticateExtension auth)
    {
        _context = context;
        _tokenService = tokenService;
        // _auth = auth;
    }

    [HttpPost]
    [Route("api/[controller]/registration")]
    public async Task<IActionResult> CreateUser(User user)
    {
        user.Id = Guid.NewGuid();
        user.Password = Toolchain.GenerateHash(user.Password!);
        user.Role = "user";

        await _context.users.AddAsync(user);
        await _context.SaveChangesAsync();

        return Ok(user);
    }

    // [HttpPost]
    // [Route("api/[controller]/login")]
    // public IActionResult Login([FromBody] UserLoginModel userLoginModel)
    // {
    //     var user = _auth.Authenticate(userLoginModel);

    //     if (user != null)
    //         return Ok(_tokenService.GenerateToken(user));

    //     return Unauthorized(user);
    // }
}