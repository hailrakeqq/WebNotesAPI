// using System.Security.Claims;
// using WebNotesAPI.Models.Entities;

// namespace WebNotesAPI.Auth;

// public class CurrentUser
// {
//     private IHttpContextAccessor _context;
//     public CurrentUser(IHttpContextAccessor context)
//     {
//         _context = context;
//     }
//     public User GetCurrentUser()
//     {
//         var identity = _context.HttpContext.User.Identity as ClaimsIdentity;

//         if (identity != null)
//         {
//             var userClaims = identity.Claims;

//             return new User
//             {
//                 Id = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
//                 Email = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
//                 Username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Name)?.Value,
//                 Role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value,
//             };
//         }
//         return null!;
//     }
// }