using Microsoft.EntityFrameworkCore;
using ControleGastosApi.Data;
using ControleGastosApi.Models;

var builder = WebApplication.CreateBuilder(args);


// Adiciona os serviços para Controllers
builder.Services.AddControllers();

// CORREÇÃO DOS ERROS: Adiciona o Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configura o Banco SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configura o CORS para o React
builder.Services.AddCors(options => {
    options.AddPolicy("LinkComReact", policy => {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// CORREÇÃO DOS ERROS: Ativa o Swagger no ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("LinkComReact");
app.UseAuthorization();
app.MapControllers();

app.Run();
