# Hello Node! Methed-StandUp backend

## API Endpoints

- `GET /comedians`: Получение всех 
- `GET /comedians/3`: Получение конкретного по id 
- `GET /clients/3`: Получение конкретного клиента по ticket 
- `POST /clients`: Добавление клиента 
```json
body:
{
    "fullName": "Джо",
    "phone": "111-222-33-33",
    "ticket": 13,
    "booking": [
        {"comedian": "3", "time": "23:00"}
    ],
    "age": 77
} 
```
- `PATCH /clients/2`: обновление клиента по номеру билета
```json
body:
{
    "fullName": "Иван Палыч",
    "phone": "111-777-33-33",
    "ticket": 2,
    "booking": [
        {
            "comedian": "1",
            "time": "20:00"
        }
    ],
    "age": 23
}
```

## Формат данных

comedians.json

```json
[
  {
      "id": "1",
      "comedian": "РУСЛАН БЕЛЫЙ",
      "performances": [
        {
          "time": "12:00",
          "hall": "Зал 1"
        },
        {
          "time": "23:00",
          "hall": "Зал 2"
        }
      ]
  },
  // ...
]
```
clients.json

```json
[
  {
    "fullName": "Павел",
    "phone": "111-222-33-44",
    "ticket": 1,
    "booking": [
      {
        "comedian": "11",
        "time": "20:00"
      }
    ],
    "age": 36
  },
  // ...
]
```
