# Oulinou Parfums - Premium E-commerce Website

A professional, modern e-commerce website for luxury perfumes built with PHP, MySQL, and modern web technologies.

## 🌟 Features

### 🛍️ E-commerce Functionality
- **Product Catalog** - Browse and search premium perfumes
- **Shopping Cart** - Add/remove items with real-time updates
- **Secure Checkout** - Professional payment processing
- **User Authentication** - Login/signup with secure sessions
- **User Profile** - Manage account and order history

### 🎨 Design & UX
- **Modern UI/UX** - Professional, minimalist design
- **Responsive Design** - Mobile-first approach
- **Glassmorphism Effects** - Modern visual aesthetics
- **Professional Animations** - Smooth transitions and hover effects
- **Custom Icons** - Professional SVG icon system

### 🔧 Technical Features
- **MVC Architecture** - Clean, organized code structure
- **Database Integration** - MySQL with PDO
- **Session Management** - Secure user sessions
- **Form Validation** - Client and server-side validation
- **Security Features** - CSRF protection, input sanitization

## 🚀 Technology Stack

- **Backend**: PHP 8.0+
- **Database**: MySQL 8.0+
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid & Flexbox
- **Icons**: Custom SVG icon system
- **Fonts**: Poppins (Google Fonts)

## 📁 Project Structure

```
OULINOU PARFUMS/
├── assets/                    # Organized assets
│   ├── icons/                # Professional SVG icons
│   ├── images/               # Optimized images
│   ├── scripts/              # JavaScript files
│   └── styles/               # CSS stylesheets
├── config/                   # Configuration files
├── controllers/              # MVC Controllers
├── core/                     # Core application files
├── database/                 # Database schema
├── models/                   # MVC Models
├── pages/                    # Main application pages
├── views/                    # MVC Views
├── css/                      # Legacy CSS (for reference)
├── html/                     # Legacy HTML (for reference)
├── js/                       # Legacy JavaScript (for reference)
└── images/                   # Legacy images (for reference)
```

## 🛠️ Installation & Setup

### Prerequisites
- **XAMPP** (Apache + MySQL + PHP)
- **Web Browser** (Chrome, Firefox, Safari, Edge)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/KamalAassab/OulinouWebsite.git
   cd OulinouWebsite
   ```

2. **Start XAMPP Services**
   - Start Apache server
   - Start MySQL server

3. **Database Setup**
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create a new database named `oulinou_parfums`
   - Import the database schema from `database/schema.sql`

4. **Configure Database Connection**
   - Update `pages/database-connection.php` with your database credentials if needed

5. **Access the Website**
   - Navigate to `http://localhost/OulinouWebsite`
   - The website should load with the professional design

## 📱 Pages & Features

### 🏠 Home Page (`index.php`)
- Hero section with animated background
- Featured products showcase
- Professional navigation
- Responsive design

### 🛍️ Products Page (`pages/products.php`)
- Product grid with 4 columns (responsive)
- Product cards with image, title, price
- Add to cart functionality
- Professional filtering

### 🔍 Product Detail Page (`pages/product-detail.php`)
- Detailed product information
- High-quality product images
- Add to cart functionality
- Related products

### 🛒 Shopping Cart (`pages/shopping-cart.php`)
- Cart management
- Quantity updates
- Price calculations
- Checkout process

### 💳 Payment Page (`pages/payment.php`)
- Secure payment form
- Multiple payment methods
- Order summary
- Security badges

### 👤 User Authentication
- **Login** (`pages/login.php`) - Professional login form
- **Signup** (`pages/signup.php`) - User registration
- **Profile** (`pages/profile.php`) - User account management

### 📄 Additional Pages
- **About Us** (`pages/about-us.php`)
- **Privacy Policy** (`pages/privacy-policy.php`)
- **Add Product** (`pages/add-product.php`) - Admin functionality

## 🎨 Design System

### Color Palette
- **Primary Dark**: #0a0a0a
- **Secondary Dark**: #1a1a1a
- **Accent Gold**: #c9a96e
- **Text Primary**: #ffffff
- **Glass Background**: rgba(255, 255, 255, 0.05)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 100-900 (variable)
- **Responsive sizing** with rem units

### Components
- **Glassmorphism Cards** - Modern glass effect
- **Professional Buttons** - Gold accent with hover effects
- **Custom Icons** - Professional SVG icon system
- **Responsive Grid** - CSS Grid and Flexbox layouts

## 🔧 Development

### File Organization
- **Modern Structure**: Organized in `assets/` directory
- **MVC Pattern**: Controllers, Models, Views separation
- **Legacy Support**: Old files preserved for reference
- **Professional Naming**: Kebab-case file naming

### Key Features
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Optimized images and CSS
- **Security**: Input validation and sanitization
- **Accessibility**: Semantic HTML and ARIA labels

## 📊 Database Schema

### Tables
- **users** - User accounts and authentication
- **products** - Product catalog
- **cart** - Shopping cart items
- **orders** - Order management

### Key Relationships
- Users can have multiple cart items
- Products can be in multiple carts
- Orders link users to products

## 🚀 Deployment

### Production Setup
1. **Web Server**: Apache/Nginx with PHP 8.0+
2. **Database**: MySQL 8.0+ with proper configuration
3. **SSL Certificate**: For secure transactions
4. **Domain**: Configure domain and DNS

### Security Considerations
- **HTTPS**: Enable SSL for all transactions
- **Database Security**: Use prepared statements
- **Input Validation**: Server-side validation
- **Session Security**: Secure session management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kamal Aassab**
- GitHub: [@KamalAassab](https://github.com/KamalAassab)
- Project: [OulinouWebsite](https://github.com/KamalAassab/OulinouWebsite)

## 🙏 Acknowledgments

- **Poppins Font** - Google Fonts
- **SVG Icons** - Custom professional icon system
- **Modern CSS** - Glassmorphism and responsive design
- **PHP Community** - Best practices and security guidelines

---

## 📞 Support

For support, email support@oulinouparfums.com or create an issue in the repository.

**Made with ❤️ for luxury perfume enthusiasts**
