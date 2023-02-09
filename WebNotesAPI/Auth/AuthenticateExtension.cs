using WebNotesAPI.Data;
using WebNotesAPI.Models.Entities;
using WebNotesAPI.Tools;

namespace WebNotesAPI.Auth;

// public class AuthenticateExtension
// {
//     private readonly NotesDbContext _context;

//     public AuthenticateExtension(NotesDbContext context)
//     {
//         _context = context;
//     }

//     public User Authenticate(UserLoginModel userLoginModel)
//     {
//         var currentUser = _context.users.FirstOrDefault(u =>
//             u.Email!.ToLower() == userLoginModel.Email!.ToLower() &&
//             u.Password == Toolchain.GenerateHash(userLoginModel.Password!));

//         if (currentUser != null)
//             return currentUser;

//         return null!;
//     }
// }