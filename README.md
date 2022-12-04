[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub contributors](https://img.shields.io/github/contributors/Ornstein89/AvanpostHack_2022)

# Описание

Решение команды Foxhound на хакатоне Avanpost Hack 2-4 декабря 2022. Демоверсия развёрнута на https://foxhound-team.pro и доступна до 5 декабря.

# Структура репозитория

`backend` - бекенд демоверсии на Go и Fiber.

`compose` - файлы автоматического развёртывания демоверсии в контейнерной инфраструктуре.

`frontend` - веб-страница демоверсии.

`research` - предварительная обработка данных, прототипирование алгоритмов на Python.

# Развертывание через docker-compose
1. Установить [docker](https://docs.docker.com/engine/install/ubuntu/)
2. В папке compose создать файл .env и [заполнить](#описание-переменных-окружения) его в соответствии с примерами
3. Запустить команду docker compose up -d с правами суперпользователя
```bash
sudo docker compose up -d
```
5. Настроить внешний nginx, который будет пересылать все запросы на порт приложения

# Команда

Антон Недогарок - алгоритмы, R&D, ML, Python
  
Антон Петров - фуллстек, Go, Vuetify, DevOps
