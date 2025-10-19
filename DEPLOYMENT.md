# Deployment Guide - Oulinou Parfums Website

This guide provides step-by-step instructions for deploying the Oulinou Parfums e-commerce website to production.

## 🚀 Prerequisites

### Server Requirements
- **PHP**: 8.0 or higher
- **MySQL**: 8.0 or higher
- **Web Server**: Apache 2.4+ or Nginx 1.18+
- **SSL Certificate**: For secure transactions
- **Domain**: Configured domain name

### Development Environment
- **XAMPP**: For local development
- **Git**: For version control
- **Composer**: For PHP dependencies (if needed)

## 📋 Pre-Deployment Checklist

### Code Review
- [ ] All files are properly organized
- [ ] No sensitive information in code
- [ ] Database credentials are in config files
- [ ] All features are tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility tested

### Security Review
- [ ] Database credentials are secure
- [ ] No hardcoded passwords
- [ ] Input validation is implemented
- [ ] CSRF protection is enabled
- [ ] SQL injection prevention is in place

### Performance Review
- [ ] Images are optimized
- [ ] CSS is minified
- [ ] JavaScript is optimized
- [ ] Database queries are efficient
- [ ] Caching is implemented (if needed)

## 🗄️ Database Setup

### 1. Create Database
```sql
CREATE DATABASE oulinou_parfums CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Import Schema
```bash
mysql -u username -p oulinou_parfums < database/schema.sql
```

### 3. Configure Database Connection
Update `pages/database-connection.php`:
```php
<?php
$host = 'localhost';
$dbname = 'oulinou_parfums';
$username = 'your_username';
$password = 'your_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
```

## 🌐 Web Server Configuration

### Apache Configuration

#### 1. Virtual Host Setup
```apache
<VirtualHost *:80>
    ServerName oulinouparfums.com
    ServerAlias www.oulinouparfums.com
    DocumentRoot /var/www/html/oulinou-parfums
    
    <Directory /var/www/html/oulinou-parfums>
        AllowOverride All
        Require all granted
    </Directory>
    
    # Redirect HTTP to HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>

<VirtualHost *:443>
    ServerName oulinouparfums.com
    ServerAlias www.oulinouparfums.com
    DocumentRoot /var/www/html/oulinou-parfums
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    <Directory /var/www/html/oulinou-parfums>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

#### 2. .htaccess Configuration
```apache
# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"

# PHP Configuration
php_value upload_max_filesize 10M
php_value post_max_size 10M
php_value max_execution_time 30
php_value memory_limit 128M

# Error Pages
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html

# Cache Control
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
</FilesMatch>
```

### Nginx Configuration

#### 1. Server Block
```nginx
server {
    listen 80;
    server_name oulinouparfums.com www.oulinouparfums.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name oulinouparfums.com www.oulinouparfums.com;
    
    root /var/www/html/oulinou-parfums;
    index index.php index.html;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security Headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    
    # PHP Processing
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    # Static Files
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }
    
    # Security
    location ~ /\. {
        deny all;
    }
}
```

## 🔒 SSL Certificate Setup

### Let's Encrypt (Free)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache

# Get Certificate
sudo certbot --apache -d oulinouparfums.com -d www.oulinouparfums.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Commercial SSL
1. Purchase SSL certificate from provider
2. Generate CSR (Certificate Signing Request)
3. Submit CSR to certificate authority
4. Install certificate files
5. Configure web server

## 📁 File Upload & Permissions

### 1. Upload Files
```bash
# Upload project files
scp -r ./OULINOU\ PARFUMS/ user@server:/var/www/html/oulinou-parfums/

# Or use Git
git clone https://github.com/KamalAassab/OulinouWebsite.git
cd OulinouWebsite
```

### 2. Set Permissions
```bash
# Set proper permissions
sudo chown -R www-data:www-data /var/www/html/oulinou-parfums
sudo chmod -R 755 /var/www/html/oulinou-parfums

# Set write permissions for uploads
sudo chmod -R 777 /var/www/html/oulinou-parfums/assets/images
sudo chmod -R 777 /var/www/html/oulinou-parfums/uploads
```

## 🗄️ Database Production Setup

### 1. Create Production Database
```sql
CREATE DATABASE oulinou_parfums_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'oulinou_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON oulinou_parfums_prod.* TO 'oulinou_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Import Production Data
```bash
mysql -u oulinou_user -p oulinou_parfums_prod < database/schema.sql
```

### 3. Update Database Configuration
```php
// pages/database-connection.php
<?php
$host = 'localhost';
$dbname = 'oulinou_parfums_prod';
$username = 'oulinou_user';
$password = 'secure_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
```

## 🔧 Environment Configuration

### 1. Production Settings
```php
// config/production.php
<?php
// Production Configuration
define('ENVIRONMENT', 'production');
define('DEBUG', false);
define('DB_HOST', 'localhost');
define('DB_NAME', 'oulinou_parfums_prod');
define('DB_USER', 'oulinou_user');
define('DB_PASS', 'secure_password');

// Security Settings
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);
?>
```

### 2. Session Configuration
```php
// config/session.php
<?php
// Secure Session Configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_samesite', 'Strict');
?>
```

## 📊 Performance Optimization

### 1. PHP Optimization
```ini
; php.ini
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=4000
opcache.revalidate_freq=2
opcache.fast_shutdown=1
```

### 2. Database Optimization
```sql
-- Add indexes for better performance
ALTER TABLE products ADD INDEX idx_name (nom);
ALTER TABLE products ADD INDEX idx_price (prix);
ALTER TABLE users ADD INDEX idx_email (email);
ALTER TABLE cart ADD INDEX idx_user_id (user_id);
```

### 3. Caching Implementation
```php
// Simple file-based caching
function getCache($key, $expiry = 3600) {
    $file = "cache/" . md5($key) . ".cache";
    if (file_exists($file) && (time() - filemtime($file)) < $expiry) {
        return unserialize(file_get_contents($file));
    }
    return false;
}

function setCache($key, $data) {
    $file = "cache/" . md5($key) . ".cache";
    file_put_contents($file, serialize($data));
}
```

## 🔍 Monitoring & Logging

### 1. Error Logging
```php
// config/logging.php
<?php
function logError($message, $file = 'error.log') {
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] $message" . PHP_EOL;
    file_put_contents("logs/$file", $logMessage, FILE_APPEND);
}
?>
```

### 2. Performance Monitoring
```php
// Monitor page load times
$start_time = microtime(true);
// ... page content ...
$end_time = microtime(true);
$load_time = $end_time - $start_time;
logError("Page load time: {$load_time}s", 'performance.log');
```

## 🧪 Testing & Validation

### 1. Pre-Launch Testing
- [ ] All pages load correctly
- [ ] Database connections work
- [ ] User registration/login works
- [ ] Shopping cart functions
- [ ] Payment processing works
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] SSL certificate is valid
- [ ] Performance is acceptable

### 2. Security Testing
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Input validation
- [ ] File upload security
- [ ] Session security

## 🚀 Go Live Checklist

### Final Steps
- [ ] Domain DNS is configured
- [ ] SSL certificate is installed
- [ ] Database is populated
- [ ] All files are uploaded
- [ ] Permissions are set correctly
- [ ] Error logging is configured
- [ ] Backup strategy is in place
- [ ] Monitoring is set up

### Post-Launch
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify all functionality
- [ ] Test on different devices
- [ ] Monitor user feedback

## 📞 Support & Maintenance

### Regular Maintenance
- **Weekly**: Check error logs
- **Monthly**: Update dependencies
- **Quarterly**: Security audit
- **Annually**: Full system review

### Backup Strategy
```bash
# Database backup
mysqldump -u username -p oulinou_parfums_prod > backup_$(date +%Y%m%d).sql

# File backup
tar -czf backup_$(date +%Y%m%d).tar.gz /var/www/html/oulinou-parfums/
```

---

## 🎉 Deployment Complete!

Your Oulinou Parfums website is now live and ready for customers!

**Live URL**: https://oulinouparfums.com  
**Admin Panel**: https://oulinouparfums.com/pages/add-product.php  
**Support**: support@oulinouparfums.com  

---

**Made with ❤️ for luxury perfume enthusiasts**
