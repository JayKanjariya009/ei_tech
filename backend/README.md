# Backend Documentation 📚

A complete guide to understanding this Node.js backend from scratch.

## 🚀 What is This Backend?

This is a **REST API** (like a waiter that takes orders and brings food) built with **Node.js** and **Express.js**. It handles data for a portfolio/business website with features like:
- User authentication (login/register)
- Contact form submissions
- Project portfolio management
- Services showcase
- Customer testimonials

## 📁 Project Structure

```
backend/
├── config/          # Database connection setup
├── controllers/     # Business logic (what happens when someone makes a request)
├── models/         # Database operations (talking to MySQL)
├── routes/         # URL endpoints (like /api/users, /api/projects)
├── middleware/     # Security and validation helpers
├── uploads/        # File storage for images
├── utils/          # Helper functions
├── .env           # Secret keys and passwords
├── package.json   # Project info and dependencies
└── server.js      # Main app entry point
```

## 🔧 How It Works (Simple Explanation)

Think of it like a restaurant:

1. **Routes** = Menu (what you can order)
2. **Controllers** = Chef (prepares your order)
3. **Models** = Kitchen storage (gets ingredients from database)
4. **Database** = Pantry (stores all the food/data)

### Request Flow:
```
User Request → Route → Controller → Model → Database
                ↓
User Response ← Route ← Controller ← Model ← Database
```

## 📋 Main Features

### 1. **Authentication System** 🔐
- **Register**: Create new user accounts
- **Login**: Verify user credentials and get access token
- **JWT Tokens**: Secure way to stay logged in

### 2. **Contact Management** 📧
- Save contact form submissions
- View all messages (admin only)
- Delete messages

### 3. **Project Portfolio** 🎨
- Add new projects with images
- Update project details
- Set projects as active/inactive
- Delete projects

### 4. **Services Management** ⚙️
- Create service offerings
- Update service information
- Toggle service availability
- Remove services

### 5. **Testimonials** ⭐
- Add customer reviews
- Approve/reject testimonials
- Display approved testimonials only

### 6. **User Management** 👥
- View all users (admin)
- Update user profiles
- Change passwords
- Delete users

## 🗂️ File Breakdown

### `server.js` - The Main File
```javascript
// This starts everything
// Sets up the web server
// Connects routes
// Connects to database
```

### `config/db.js` - Database Connection
```javascript
// Connects to MySQL database
// Like plugging in the power cord
```

### Controllers (The Chefs)
Each controller handles one type of data:

- **authController.js** - Login/Register logic
- **userController.js** - User management
- **contactController.js** - Contact form handling
- **projectController.js** - Portfolio projects
- **serviceController.js** - Business services
- **testimonialController.js** - Customer reviews

### Models (The Storage Workers)
Each model talks to database tables:

- **userModel.js** - Users table operations
- **contactModel.js** - Contact messages table
- **projectModel.js** - Projects table
- **serviceModel.js** - Services table
- **testimonialModel.js** - Testimonials table

### Routes (The Menu)
Each route file defines what URLs are available:

- **authRoutes.js** - `/api/auth/login`, `/api/auth/register`
- **userRoutes.js** - `/api/users/*`
- **contactRoutes.js** - `/api/contacts/*`
- **projectRoutes.js** - `/api/projects/*`
- **serviceRoutes.js** - `/api/services/*`
- **testimonialRoutes.js** - `/api/testimonials/*`

## 🛠️ How to Use

### 1. **Setup**
```bash
# Install dependencies
npm install

# Create .env file with:
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_secret_key
PORT=5000

# Start the server
npm start
```

### 2. **Making Requests**
Use tools like Postman or your frontend to make HTTP requests:

```javascript
// Example: Get all projects
GET http://localhost:5000/api/projects

// Example: Create new project
POST http://localhost:5000/api/projects
{
  "title": "My Project",
  "description": "Project description",
  "image": "project.jpg"
}
```

## 🔒 Security Features

### **JWT Authentication**
- Users get a token when they login
- Token must be included in requests to protected routes
- Token expires after 7 days

### **Password Hashing**
- Passwords are encrypted using bcrypt
- Never stored as plain text

### **CORS Protection**
- Controls which websites can access the API

## 📊 Database Tables

### Users Table
```sql
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- role (admin/user)
- created_at
```

### Projects Table
```sql
- id (Primary Key)
- title
- description
- image
- status (active/inactive)
- created_at
```

### Services Table
```sql
- id (Primary Key)
- title
- description
- icon
- status (active/inactive)
- created_at
```

### Contact Messages Table
```sql
- id (Primary Key)
- name
- email
- subject
- message
- created_at
```

### Testimonials Table
```sql
- id (Primary Key)
- user_name
- user_email
- message
- rating
- status (pending/approved/rejected)
- created_at
```

## 🚨 Common Issues & Solutions

### **Module Import Errors**
```
Error: Module does not provide export named 'functionName'
```
**Solution**: Check that function names match between controllers and models.

### **Database Connection Failed**
```
Error: Access denied for user
```
**Solution**: Check .env file has correct database credentials.

### **Port Already in Use**
```
Error: EADDRINUSE :::5000
```
**Solution**: Change PORT in .env or kill process using port 5000.

## 🎯 API Endpoints Quick Reference

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Users (Protected)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (Protected)
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project (Protected)
- `DELETE /api/projects/:id` - Delete project (Protected)

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (Protected)
- `GET /api/services/:id` - Get single service
- `PUT /api/services/:id` - Update service (Protected)
- `DELETE /api/services/:id` - Delete service (Protected)

### Contact
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all messages (Protected)
- `GET /api/contacts/:id` - Get single message (Protected)
- `DELETE /api/contacts/:id` - Delete message (Protected)

### Testimonials
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials` - Submit testimonial
- `GET /api/testimonials/:id` - Get single testimonial (Protected)
- `PUT /api/testimonials/:id` - Update testimonial (Protected)
- `DELETE /api/testimonials/:id` - Delete testimonial (Protected)

## 🎓 Learning Path

1. **Start with** `server.js` - understand how the app starts
2. **Look at** simple routes like `authRoutes.js`
3. **Follow the flow**: Route → Controller → Model → Database
4. **Practice** making API requests with Postman
5. **Modify** existing endpoints before creating new ones

## 💡 Tips for Beginners

- **Read error messages carefully** - they usually tell you exactly what's wrong
- **Use console.log()** to debug and see what data you're getting
- **Test one endpoint at a time** - don't try to build everything at once
- **Check the database** to see if your data is actually being saved
- **Use Postman** to test your API before connecting a frontend

---

**Remember**: This backend is like a smart assistant that stores and retrieves information. Each file has a specific job, and they all work together to create a complete system! 🚀