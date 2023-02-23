FROM mcr.microsoft.com/dotnet/sdk:7.0 AS dotnet-build
WORKDIR /src
EXPOSE 80
EXPOSE 443

COPY . /src
RUN dotnet restore "WebNotesAPI.csproj"
RUN dotnet build "WebNotesAPI.csproj" -c Release -o /app/build

FROM dotnet-build AS dotnet-publish
RUN dotnet publish "WebNotesAPI.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
RUN mkdir /app/wwwroot
COPY --from=dotnet-publish /app/publish .

ENTRYPOINT ["dotnet", "WebNotesAPI.dll"]
