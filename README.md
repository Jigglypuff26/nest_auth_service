# NestJS Authentication Service 🔐

Простой сервис аутентификации на основе NestJS с PostgreSQL. Предоставляет REST API для регистрации, входа и управления пользователями с JWT токенами.

## 🚀 Особенности

- **JWT аутентификация** - безопасные access tokens
- **PostgreSQL** - надежное хранение данных
- **TypeORM** - работа с базой данных
- **Валидация** - встроенная валидация DTO
- **Безопасность** - хеширование паролей с bcrypt
- **TypeScript** - полная типизация
- **Готовые модули** - пользователи и аутентификация

## 📦 Установка и запуск

### Предварительные требования

- Node.js 16+
- PostgreSQL 12+
- npm или yarn

### 1. Клонирование репозитория
```
git clone https://github.com/Jigglypuff26/nest_auth_service.git
cd nest_auth_service
```

2. Установка зависимостей

```
npm install
```

3. Настройка базы данных

Создайте базу данных в PostgreSQL:

```
CREATE DATABASE nest_auth;
```

4. Настройка переменных окружения

Создайте файл .env в корне проекта:
env

```
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=nest_auth

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=1d

# Application
NODE_ENV=development
PORT=3000
```

5. Запуск приложения

Разработка:

```
npm run start:dev
```

Продакшен:

```
npm run build
npm run start:prod
```

Приложение будет доступно по адресу: http://localhost:3000
📚 API Endpoints
Аутентификация
Регистрация пользователя

POST /auth/signup
Content-Type: application/json
```
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Вход пользователя

POST /auth/signin
Content-Type: application/json

```
{
  "email": "user@example.com",
  "password": "password123"
}
```

Получение профиля

GET /auth/profile
Authorization: Bearer <your_jwt_token>

Управление пользователями (требуют JWT)
Получить всех пользователей

GET /users/allUsers
Authorization: Bearer <your_jwt_token>

Получить пользователя по ID

GET /users/getUser/1
Authorization: Bearer <your_jwt_token>

Изменить пользователя

PATCH /users/update/1
Authorization: Bearer <your_jwt_token>

Удалить пользователя

DELETE /users/remove/1
Authorization: Bearer <your_jwt_token>

🛠 Технологии

    NestJS - фреймворк для Node.js

    PostgreSQL - реляционная база данных

    TypeORM - ORM для TypeScript

    JWT - JSON Web Tokens

    bcryptjs - хеширование паролей

    class-validator - валидация DTO

    Passport - аутентификация

📁 Структура проекта
text

src/
├── app.module.ts          # Корневой модуль
├── main.ts               # Точка входа
├── auth/                 # Модуль аутентификации
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/
│   │   └── signin.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── strategies/
│       └── jwt.strategy.ts
└── user/                 # Модуль пользователей
    ├── user.controller.ts
    ├── user.service.ts
    ├── user.entity.ts
    ├── user.module.ts
    └── dto/
        ├── create-user.dto.ts
        └── update-user.dto.ts

🔧 Команды разработки

# Запуск в режиме разработки
```
npm run start:dev
```

# Сборка проекта
```
npm run build
```

# Форматирование кода
```
npm run format
```

🧪 Примеры использования
Регистрация и аутентификация
bash

# 1. Регистрация
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# 2. Вход
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# 3. Использование токена для доступа к защищенным endpoint'ам
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

🔒 Безопасность

    Пароли хешируются с помощью bcrypt

    JWT токены с сроком действия

    Валидация всех входящих данных

    Защита от SQL-инъекций через TypeORM