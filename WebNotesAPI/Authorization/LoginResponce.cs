namespace WebNotesAPI.Authorization;
public static class AuthenticationServiceExtensions
{
    public static IServiceCollection AddLoginResponce(this IServiceCollection services)
    {
        return services.AddSingleton<LoginResponce>();
    }
}
public class LoginResponce
{
    public string? Id { get; set; }
    public string? Email { get; set; }
    public string? Username { get; set; }
    public string? Role { get; set; }
    public string? JWTToken { get; set; }
    public string? RefreshToken { get; set; }
}