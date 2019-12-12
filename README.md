# MealMe-Server
This project emulates the "Search meal by name" option from [TheMealDB API](https://www.themealdb.com/api.php).
Additionally it add several methods:
```
/                   : show server status
/meals              : return all meals available in local db
/insert             : allow to upload new meals
/clear              : removes all meals from db
/sync               : connect with TheMealDB API and download all meals between letters 'a' through 'z' to local DB
/search.php?s=Some  : search all meals with 'Some' in it name
```

## Requirements
* [Docker](https://docs.docker.com/)


## Installation
**1)** Clone the project.
```
git clone https://github.com/agoztin/MealMe-Server
```
**2)** Build and start Docker container.
```
docker-compose up -d
```
**3)** After server is running you can synchronize with TheMealDB to populate local database.
```
http://localhost:8080/sync
```
> TheMealDB only returns 25 results per letter so at most yo can download 600 meals recipes.

**4)** Enjoy