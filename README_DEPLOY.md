# BlackIce Alpclub - Deployment Guide

Этот документ содержит инструкции по развертыванию React приложения BlackIce Alpclub на Linux сервере.

## Системные требования

- Linux 6.8.0-55-generic x86_64
- Docker (рекомендуется версия 20.10+)
- Docker Compose (рекомендуется версия 2.0+)
- Node.js 18+ (для локальной разработки)
- Минимум 1GB RAM
- Минимум 2GB свободного места на диске

## Быстрое развертывание

### 1. Подготовка сервера

Установите Docker и Docker Compose на вашем сервере:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# Добавьте пользователя в группу docker (опционально)
sudo usermod -aG docker $USER
```

### 2. Клонирование и развертывание

```bash
# Клонируйте репозиторий
git clone <your-repo-url>
cd BlackIce_alpclub

# Запустите развертывание
./deploy.sh deploy
```

Приложение будет доступно по адресу `http://localhost` или `http://your-server-ip`

**Примечание:** Команда `deploy` использует Docker для сборки приложения и не требует установки Node.js на сервере.

## Детальные инструкции

### Использование скрипта развертывания

Скрипт `deploy.sh` предоставляет следующие команды:

```bash
# Полное развертывание (рекомендуется)
./deploy.sh deploy

# Тестирование Docker сборки (без развертывания)
./deploy.sh test-build
# или используйте отдельный скрипт:
./test-build.sh

# Полное развертывание с локальной + Docker сборкой
./deploy.sh deploy-full

# Сборка React приложения локально
./deploy.sh build-local

# Сборка только Docker образа
./deploy.sh build-docker

# Сборка локально + Docker образ
./deploy.sh build

# Перезапуск контейнеров
./deploy.sh restart

# Остановка приложения
./deploy.sh stop

# Просмотр логов
./deploy.sh logs

# Проверка статуса
./deploy.sh status

# Очистка ресурсов
./deploy.sh cleanup
```

### Ручное развертывание с Docker

```bash
# Сборка образа
docker-compose build

# Запуск контейнера
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

### Структура контейнера

- **blackice-app**: Основное приложение на Nginx (порт 80)
- Статические файлы обслуживаются из `/usr/share/nginx/html`
- Nginx настроен для SPA (Single Page Application) с client-side routing

## Настройка домена и SSL

### С Nginx Proxy Manager (рекомендуется)

1. Установите Nginx Proxy Manager
2. Добавьте прокси-хост для вашего домена
3. Укажите внутренний IP:80
4. Включите SSL Let's Encrypt

### С Certbot (для standalone развертывания)

```bash
# Установите certbot
sudo apt install certbot

# Получите SSL сертификат
sudo certbot certonly --standalone -d yourdomain.com

# Добавьте HTTPS в docker-compose.yml
version: '3.8'
services:
  blackice-app:
    # ... существующие настройки
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt:ro
```

## Мониторинг и обслуживание

### Просмотр логов

```bash
# В реальном времени
docker-compose logs -f blackice-app

# Последние 100 строк
docker-compose logs --tail=100 blackice-app
```

### Обновление приложения

```bash
# Получите последние изменения
git pull origin master

# Пересоберите и перезапустите
./deploy.sh deploy
```

### Резервное копирование

```bash
# Создайте архив настроек
tar -czf backup_$(date +%Y%m%d).tar.gz \
  docker-compose.yml \
  nginx.conf \
  deploy.sh \
  .env 2>/dev/null || true
```

## Безопасность

### Рекомендации

1. **Firewall**: Настройте UFW или firewalld
   ```bash
   sudo ufw enable
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw allow 22
   ```

2. **SSL**: Всегда используйте HTTPS в продакшене

3. **Обновления**: Регулярно обновляйте систему
   ```bash
   sudo apt update && sudo apt upgrade
   ```

4. **Мониторинг**: Настройте логирование и мониторинг

### Переменные окружения

Создайте файл `.env` для конфиденциальных настроек:

```env
NODE_ENV=production
# Добавьте другие переменные по необходимости
```

## Troubleshooting

### Проблемы со сборкой Docker

#### Ошибка "react-scripts: not found"

```bash
# Очистите Docker кэш и пересоберите
./deploy.sh cleanup
./deploy.sh deploy

# Или протестируйте сборку отдельно
./test-build.sh

# Проверьте логи сборки
docker build --no-cache --progress=plain -t blackice-debug .
```

#### Ошибка "Build failed"

```bash
# Проверьте, что все зависимости указаны в package.json
npm install
npm run build

# Если проблема в Docker, попробуйте:
docker system prune -f
./deploy.sh deploy
```

### Приложение не запускается

```bash
# Проверьте статус контейнеров
docker-compose ps

# Проверьте логи
docker-compose logs blackice-app

# Проверьте порты
netstat -tlnp | grep :80
```

### Ошибка сборки Docker

```bash
# Очистите кэш Docker
docker system prune -f

# Пересоберите без кэша
docker-compose build --no-cache
```

### Проблемы с памятью

Если сервер имеет ограниченную память:

```yaml
# В docker-compose.yml добавьте лимиты
services:
  blackice-app:
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
```

## Контакты

При возникновении проблем создайте issue в репозитории проекта.
