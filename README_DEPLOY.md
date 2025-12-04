# BlackIce Alpclub - Deployment Guide

Этот документ содержит инструкции по развертыванию React приложения BlackIce Alpclub (собранного с Vite) на Linux сервере.

## Системные требования

- Linux 6.8.0-55-generic x86_64
- Docker (рекомендуется версия 20.10+)
- Docker Compose (рекомендуется версия 2.0+)
- Node.js 18+ (для локальной разработки, версия 18-alpine используется в Docker)
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

Приложение теперь поддерживает HTTPS с автоматическим редиректом HTTP на HTTPS.

### Быстрая настройка SSL (рекомендуется для тестирования)

1. **Сгенерируйте self-signed сертификаты:**
   ```bash
   ./generate-ssl.sh
   # или для конкретного домена:
   ./generate-ssl.sh yourdomain.com
   ```

2. **Запустите приложение:**
   ```bash
   ./deploy.sh deploy
   ```

3. **Приложение будет доступно по HTTPS:**
   - HTTP: `http://localhost` (автоматически редиректируется на HTTPS)
   - HTTPS: `https://localhost`

### Настройка SSL для продакшена

#### Вариант 1: Let's Encrypt с Certbot (автоматический)

1. **Установите certbot:**
   ```bash
   sudo apt update
   sudo apt install certbot
   ```

2. **Получите SSL сертификат:**
   ```bash
   sudo certbot certonly --standalone -d yourdomain.com
   ```

3. **Настройте приложение:**
   ```bash
   # Создайте символические ссылки на сертификаты Let's Encrypt
   mkdir -p ssl/certs ssl/private
   sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/certs/ssl-cert-snakeoil.pem
   sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/private/ssl-cert-snakeoil.key

   # Или создайте символические ссылки
   # sudo ln -sf /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/certs/ssl-cert-snakeoil.pem
   # sudo ln -sf /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/private/ssl-cert-snakeoil.key
   ```

4. **Запустите приложение:**
   ```bash
   ./deploy.sh deploy
   ```

#### Вариант 2: Nginx Proxy Manager (рекомендуется)

1. **Установите Nginx Proxy Manager**
2. **Добавьте прокси-хост:**
   - Domain: `yourdomain.com`
   - Forward Hostname/IP: `your-server-ip`
   - Forward Port: `80`
3. **Включите SSL Let's Encrypt** в настройках прокси-хоста

#### Вариант 3: Ручная настройка сертификатов

1. **Поместите сертификаты в директории:**
   ```
   ssl/certs/ssl-cert-snakeoil.pem      # Ваш SSL сертификат
   ssl/private/ssl-cert-snakeoil.key     # Ваш приватный ключ
   ```

2. **Установите правильные права:**
   ```bash
   chmod 644 ssl/certs/ssl-cert-snakeoil.pem
   chmod 600 ssl/private/ssl-cert-snakeoil.key
   ```

3. **Docker автоматически смонтирует сертификаты из директории `ssl/` в контейнер**

3. **Запустите приложение:**
   ```bash
   ./deploy.sh deploy
   ```

### Автоматическое обновление сертификатов

Для автоматического обновления сертификатов Let's Encrypt добавьте в crontab:

```bash
# Ежемесячно обновлять сертификаты
0 12 1 * * /usr/bin/certbot renew --quiet && docker-compose restart blackice-app
```

### Проверка SSL

Проверьте настройку SSL:

```bash
# Проверьте доступность HTTPS
curl -I https://yourdomain.com

# Проверьте редирект HTTP на HTTPS
curl -I http://yourdomain.com

# Используйте SSL тестер
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
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

#### Ошибка "vite: command not found" или проблемы с зависимостями

```bash
# Очистите Docker кэш и пересоберите
./deploy.sh cleanup
./deploy.sh deploy

# Используйте отладочную сборку для диагностики
./deploy.sh debug-build

# Запустите интерактивный контейнер для проверки
docker run -it blackice-debug sh

# В контейнере проверьте:
npm list vite
npx vite --version

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
