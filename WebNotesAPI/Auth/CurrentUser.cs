// using System.Security.Claims;
// using Microsoft.AspNetCore.Mvc;
// using WebNotesAPI.Models.Entities;

// namespace WebNotesAPI.Auth;

// public class CurrentUser : ControllerBase
// {
//     // public User GetCurrentUser()
//     // {
//     //     var identity = HttpContext.User.Identity as ClaimsIdentity;

//     //     if (identity != null)
//     //     {
//     //         var userClaims = identity.Claims;

//     //         return new User
//     //         {
//     //             Id = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
//     //             Email = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
//     //             Username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Name)?.Value,
//     //             Role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value,
//     //         };
//     //     }
//     //     return null!;
//     // }
// }