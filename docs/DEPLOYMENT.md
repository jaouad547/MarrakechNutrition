# Déploiement — MarrakechNutrition

## Prérequis serveur

| Composant | Version minimale |
|-----------|-----------------|
| PHP       | 8.2+            |
| MySQL     | 8.0+            |
| Node.js   | 20+             |
| Composer  | 2.x             |

---

## Checklist de déploiement

### 1. Code & dépendances

- [ ] Cloner le dépôt sur le serveur :  
  `git clone <repo-url> /var/www/marrakechnutrition`
- [ ] Installer les dépendances PHP (sans devtools) :  
  `composer install --no-dev --optimize-autoloader`
- [ ] Installer et compiler les assets front-end :  
  `npm ci && npm run build`

### 2. Configuration

- [ ] Copier le fichier d'environnement :  
  `cp .env.example .env`
- [ ] Générer la clé applicative :  
  `php artisan key:generate`
- [ ] Renseigner toutes les variables dans `.env` :
  - `APP_ENV=production`
  - `APP_DEBUG=false`
  - `APP_URL=https://yourdomain.com`
  - Identifiants MySQL (`DB_*`)
  - Configuration mail (`MAIL_*`)

### 3. Base de données

- [ ] Créer la base de données MySQL :  
  `mysql -u root -p -e "CREATE DATABASE marrakechnutrition CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"`
- [ ] Exécuter les migrations :  
  `php artisan migrate --force`
- [ ] Charger les seeders si nécessaire :  
  `php artisan db:seed --force`

### 4. Stockage & fichiers

- [ ] Créer le lien symbolique pour le stockage public :  
  `php artisan storage:link`
- [ ] Donner les droits d'écriture aux répertoires nécessaires :  
  `chmod -R 775 storage bootstrap/cache`

### 5. Optimisations de production

- [ ] Mettre en cache la configuration :  
  `php artisan config:cache`
- [ ] Mettre en cache les routes :  
  `php artisan route:cache`
- [ ] Mettre en cache les vues :  
  `php artisan view:cache`
- [ ] Mettre en cache les événements :  
  `php artisan event:cache`

### 6. Queue & Scheduler (optionnel)

- [ ] Configurer un worker de queue (Supervisor recommandé) :  
  `php artisan queue:work --sleep=3 --tries=3`
- [ ] Ajouter le scheduler Laravel dans le cron :  
  `* * * * * cd /var/www/marrakechnutrition && php artisan schedule:run >> /dev/null 2>&1`

### 7. Serveur Web (Nginx)

Exemple de bloc Nginx :

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/marrakechnutrition/public;
    index index.php;

    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### 8. SSL

- [ ] Obtenir un certificat Let's Encrypt :  
  `certbot --nginx -d yourdomain.com -d www.yourdomain.com`

### 9. Vérifications finales

- [ ] `APP_DEBUG=false` dans `.env`
- [ ] `APP_ENV=production` dans `.env`
- [ ] `robots.txt` accessible sur `/robots.txt`
- [ ] `sitemap.xml` accessible sur `/sitemap.xml`
- [ ] Page d'accueil se charge sans erreur
- [ ] Ajout au panier fonctionne
- [ ] Checkout complet (du panier à la confirmation de commande)
- [ ] Connexion admin et gestion des produits/commandes
- [ ] Images produits s'affichent correctement (vérifier `storage:link`)
- [ ] Aucun message d'erreur Laravel visible dans les logs :  
  `tail -f storage/logs/laravel.log`

---

## Rollback

En cas de problème après déploiement :

```bash
# Revenir à la version précédente
git checkout <previous-tag>
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate:rollback  # si des migrations ont été appliquées
php artisan config:cache && php artisan route:cache && php artisan view:cache
```
