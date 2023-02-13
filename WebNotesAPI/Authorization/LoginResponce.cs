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
    public string? Username { get; set; }
    public string? JWTToken { get; set; }
    public string? RefreshToken { get; set; }
}