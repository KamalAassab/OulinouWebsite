# Contributing to Oulinou Parfums Website

Thank you for your interest in contributing to the Oulinou Parfums e-commerce website! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on the GitHub repository page
- Clone your fork locally:
  ```bash
  git clone https://github.com/your-username/OulinouWebsite.git
  cd OulinouWebsite
  ```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Follow the coding standards outlined below
- Test your changes thoroughly
- Update documentation if needed

### 4. Commit Your Changes
```bash
git add .
git commit -m "Add: Brief description of your changes"
```

### 5. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request
- Go to the original repository on GitHub
- Click "New Pull Request"
- Provide a clear description of your changes

## 📋 Coding Standards

### PHP
- Use PSR-12 coding standards
- Follow MVC architecture pattern
- Use meaningful variable and function names
- Add comments for complex logic
- Use prepared statements for database queries

### CSS
- Use BEM methodology for class naming
- Follow mobile-first responsive design
- Use CSS custom properties (variables)
- Organize styles logically
- Use meaningful class names

### JavaScript
- Use ES6+ features
- Follow consistent naming conventions
- Add JSDoc comments for functions
- Use modern DOM manipulation
- Handle errors gracefully

### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels
- Ensure accessibility compliance
- Use meaningful alt text for images
- Follow proper indentation

## 🎨 Design Guidelines

### Color Palette
- **Primary Dark**: #0a0a0a
- **Secondary Dark**: #1a1a1a
- **Accent Gold**: #c9a96e
- **Text Primary**: #ffffff
- **Glass Background**: rgba(255, 255, 255, 0.05)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Responsive sizing** with rem units
- **Consistent line heights**

### Components
- Follow glassmorphism design principles
- Use professional animations
- Maintain consistent spacing
- Ensure mobile responsiveness

## 🧪 Testing

### Before Submitting
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on different screen sizes (mobile, tablet, desktop)
- Verify all functionality works as expected
- Check for console errors
- Test form validation

### Test Cases
- User registration and login
- Product browsing and search
- Shopping cart functionality
- Checkout process
- Payment processing
- User profile management

## 📁 File Organization

### Directory Structure
```
assets/
├── icons/          # SVG icons
├── images/         # Optimized images
├── scripts/        # JavaScript files
└── styles/         # CSS files

pages/              # Main application pages
controllers/        # MVC Controllers
models/             # MVC Models
views/              # MVC Views
config/             # Configuration files
database/           # Database schema
```

### Naming Conventions
- **Files**: kebab-case (e.g., `product-detail.php`)
- **Classes**: PascalCase (e.g., `ProductController`)
- **Functions**: camelCase (e.g., `getProductDetails`)
- **Variables**: camelCase (e.g., `productName`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_PRODUCTS`)

## 🐛 Bug Reports

### When Reporting Bugs
1. **Clear Description**: Explain what the bug is
2. **Steps to Reproduce**: How to reproduce the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Environment**: Browser, OS, PHP version

### Bug Report Template
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: [e.g., Chrome 91]
- OS: [e.g., Windows 10]
- PHP Version: [e.g., 8.0]

## Screenshots
If applicable, add screenshots
```

## ✨ Feature Requests

### When Requesting Features
1. **Clear Description**: What feature you want
2. **Use Case**: Why this feature is needed
3. **Proposed Solution**: How you think it should work
4. **Alternatives**: Other solutions you've considered

### Feature Request Template
```markdown
## Feature Description
Brief description of the feature

## Use Case
Why this feature is needed

## Proposed Solution
How you think it should work

## Alternatives
Other solutions considered
```

## 📝 Documentation

### Code Documentation
- Add comments for complex logic
- Use JSDoc for JavaScript functions
- Document PHP classes and methods
- Include README files for new features

### README Updates
- Update README.md for new features
- Include setup instructions
- Document configuration changes
- Add troubleshooting guides

## 🔒 Security

### Security Guidelines
- Never commit sensitive information (passwords, API keys)
- Use prepared statements for database queries
- Validate and sanitize all inputs
- Follow OWASP security guidelines
- Report security vulnerabilities privately

### Security Issues
If you discover a security vulnerability, please report it privately to:
- Email: security@oulinouparfums.com
- Do not create public issues for security vulnerabilities

## 🎯 Pull Request Guidelines

### PR Requirements
- Clear, descriptive title
- Detailed description of changes
- Reference related issues
- Include screenshots if UI changes
- Ensure all tests pass
- Update documentation

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on multiple browsers
- [ ] Tested on different screen sizes
- [ ] All existing tests pass
- [ ] New tests added if needed

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🏷️ Issue Labels

### Bug Labels
- `bug` - Something isn't working
- `critical` - Critical bug affecting functionality
- `minor` - Minor bug with workaround

### Feature Labels
- `enhancement` - New feature or request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed

### Priority Labels
- `high` - High priority
- `medium` - Medium priority
- `low` - Low priority

## 📞 Getting Help

### Questions?
- Check existing issues and discussions
- Create a new issue with the "question" label
- Join our community discussions

### Contact
- **Email**: support@oulinouparfums.com
- **GitHub**: [@KamalAassab](https://github.com/KamalAassab)

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

---

**Thank you for contributing to Oulinou Parfums! 🎉**

Made with ❤️ for luxury perfume enthusiasts
