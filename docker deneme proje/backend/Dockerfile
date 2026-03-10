# C# uygulamasını derliyoruz (Build aşaması)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Backend.csproj", "./"]
RUN dotnet restore "Backend.csproj"
COPY . .
RUN dotnet publish "Backend.csproj" -c Release -o /app/publish

# Uygulamayı çalıştırılabilir hale getiriyoruz (Çalışma aşaması)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
# .NET 8 varsayılan olarak HTTP üzerinden Docker içinde 8080 portunu açar.
# PORT değişkenini manuel olarak da belirtebilirsiniz.
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "Backend.dll"]
