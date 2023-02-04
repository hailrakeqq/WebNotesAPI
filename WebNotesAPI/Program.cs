using Microsoft.EntityFrameworkCore;
using WebNotesAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddAuthentication("OAuth")
    .AddJwtBearer("OAuth", config =>
    {

    });

builder.Services.AddAuthorization();

builder.Services.AddDbContext<NotesDbContext>(option => option.UseNpgsql(
    builder.Configuration.GetConnectionString("DefaultConnection")
));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(s =>
{
    s.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Version = "V1",
        Title = "Note API",
        Description = "Simple CRUD API for notes app"
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Notes API");
    c.RoutePrefix = string.Empty;
});


app.UseHttpsRedirection();

app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
