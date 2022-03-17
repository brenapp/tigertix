FROM mcr.microsoft.com/dotnet/sdk AS build
WORKDIR /app
COPY *.csproj ./
RUN dotnet restore EventsMicroservice.csproj
COPY . ./
RUN dotnet publish EventsMicroservice.csproj -c Release -o out
FROM mcr.microsoft.com/dotnet/runtime AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "EventsMicroservice.dll"]  