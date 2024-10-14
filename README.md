# 🚀👨🏻‍💻 Nettt Interactieve Media new website

This is my internship assignment, where I programmed a new website for Nettt Interactive Media.

## 🛠️ Technologies

- Statamic CMS
- HTML 
- PHP 
- TailwindCSS 
- Vanilla JavaScript 
- Alpine.js

## Installation instructions

1. Download Laragon and put the file in the 'www' folder.
2. run `composer install`
3. run `php please make:user`
4. run `npm i` && `npm run dev`

## Environment file contents

### Development

```env
Dump your .env values here with sensitive data removed.
```

### Production

```env
Dump your .env values here with sensitive data removed. The following is a production example that uses full static caching:
APP_NAME=Statamic
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://[website].test

STATAMIC_LICENSE_KEY=
STATAMIC_STACHE_WATCHER=true
STATAMIC_STATIC_CACHING_STRATEGY=null
STATAMIC_REVISIONS_ENABLED=false
STATAMIC_GRAPHQL_ENABLED=false
STATAMIC_API_ENABLED=false
STATAMIC_GIT_ENABLED=false

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=[website]
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

DEBUGBAR_ENABLED=false
```

## NGINX config

Add the following to your NGINX config __inside the server block__ enable static resource caching:
```
expires $expires;
```

And this __outside the server block__:
```
map $sent_http_content_type $expires {
    default    off;
    text/css    max;
    ~image/    max;
    application/javascript    max;
    application/octet-stream    max;
}
```

## Deploy script Ploi

```bash
if [[ {COMMIT_MESSAGE} =~ "[BOT]" ]]; then
    echo "Automatically committed on production. Nothing to deploy."
    {DO_NOT_NOTIFY}
    # Uncomment the following line when using zero downtime deployments.
    # {CLEAR_NEW_RELEASE}
    exit 0
fi

cd {SITE_DIRECTORY}
git pull origin main
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

npm ci
npm run build
{SITE_PHP} artisan cache:clear
{SITE_PHP} artisan config:cache
{SITE_PHP} artisan route:cache
{SITE_PHP} artisan statamic:stache:warm
{SITE_PHP} artisan queue:restart
{SITE_PHP} artisan statamic:search:update --all
{SITE_PHP} artisan statamic:static:clear
{SITE_PHP} artisan statamic:static:warm --queue

{RELOAD_PHP_FPM}

echo "🚀 Application deployed!"
```

## Deploy script Forge

```bash
if [[ $FORGE_DEPLOY_MESSAGE =~ "[BOT]" ]]; then
    echo "Automatically committed on production. Nothing to deploy."
    exit 0
fi

cd $FORGE_SITE_PATH
git pull origin main
$FORGE_COMPOSER install --no-interaction --prefer-dist --optimize-autoloader --no-dev

npm ci
npm run build
$FORGE_PHP artisan cache:clear
$FORGE_PHP artisan config:cache
$FORGE_PHP artisan route:cache
$FORGE_PHP artisan statamic:stache:warm
$FORGE_PHP artisan queue:restart
$FORGE_PHP artisan statamic:search:update --all
$FORGE_PHP artisan statamic:static:clear
$FORGE_PHP artisan statamic:static:warm --queue

( flock -w 10 9 || exit 1
    echo 'Restarting FPM...'; sudo -S service $FORGE_PHP_FPM reload ) 9>/tmp/fpmlock
```
