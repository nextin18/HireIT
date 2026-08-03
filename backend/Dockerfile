FROM php:8.3-cli

# Install system dependencies & Postgres PDO extension
RUN apt-get update && apt-get install -y \
    git unzip curl zip libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Copy Composer from official image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

# Install PHP Dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts

EXPOSE 10000

# CMD php artisan optimize:clear && \
#     php artisan migrate --force && \
#     php artisan db:seed --force && \
#     php artisan serve --host=0.0.0.0 --port=$PORT

# CMD php artisan optimize:clear && \
#     php artisan storage:link && \
#     php artisan migrate:fresh --seed --force && \
#     php artisan serve --host=0.0.0.0 --port=$PORT

CMD php artisan optimize:clear && \
    php artisan migrate:fresh --force && \
    php artisan db:seed --force && \
    php artisan serve --host=0.0.0.0 --port=$PORT