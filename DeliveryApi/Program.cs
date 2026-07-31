// Program.cs
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using DeliveryApi.Models; // Проверьте namespace вашего VertaDbContext

var builder = WebApplication.CreateBuilder(args);

// 1. Настройка подключения к MySQL (VertaDB)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Server=localhost;Port=3306;Database=VertaDB;User=root;Password=1234;";

builder.Services.AddDbContext<VertaDbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    ));

// 2. Настройка CORS для подключения фронтенда React (localhost:5173)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 3. Регистрация контроллеров + устранение зацикливания JSON (для навигационных свойств EF Core)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// 4. Поддержка Swagger (OpenAPI)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 5. Включение Swagger UI в режиме разработки (http://localhost:5283/swagger)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Delivery API v1");
    });
}

// 6. Подключение Middleware
app.UseCors("AllowReactApp"); // Обязательно перед MapControllers()

app.UseAuthorization();

app.MapControllers();

app.Run();