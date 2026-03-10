var builder = WebApplication.CreateBuilder(args);

// CORS ayarı (Geliştirme aşamasında lokalden React'a izin verir, Nginx ile bu dahi olmasa backend'e erişilir)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();

// Docker tarafından tüketilecek dummy (deneme) verilerimiz
app.MapGet("/api/data", () =>
{
    return new[]
    {
        new { Id = 1, Name = "Ubuntu Server Hazırlığı", Status = "Tamamlandı ✅" },
        new { Id = 2, Name = "Docker & Docker Compose Kurulumu", Status = "Tamamlandı ✅" },
        new { Id = 3, Name = "C# Backend API Yazılması", Status = "Başarılı 🚀" },
        new { Id = 4, Name = "React Arayüzü ile C#'tan Veri Çekme", Status = "Başarılı 🚀" }
    };
});

app.Run();
