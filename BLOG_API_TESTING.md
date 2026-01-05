# Blog API Testing with Postman

## Authentication
First get auth token:
```
POST http://localhost:5000/api/auth/login
Body (JSON): {"email": "admin@example.com", "password": "password"}
```
Copy the token for authenticated requests.

## Blog APIs

### 1. Create Blog
```
POST http://localhost:5000/api/blogs
Headers: Authorization: Bearer YOUR_TOKEN
Body (form-data):
- title: "My First Blog"
- author: "Admin"
- content: "This is blog content..."
- tags: ["tech", "web"] (as JSON string)
- images: [upload files]
```

### 2. Get All Blogs
```
GET http://localhost:5000/api/blogs
```

### 3. Get Single Blog
```
GET http://localhost:5000/api/blogs/1
```

### 4. Update Blog
```
PUT http://localhost:5000/api/blogs/1
Headers: Authorization: Bearer YOUR_TOKEN
Body (form-data): [same as create]
```

### 5. Delete Blog
```
DELETE http://localhost:5000/api/blogs/1
Headers: Authorization: Bearer YOUR_TOKEN
```

## Comment APIs

### 1. Add Comment
```
POST http://localhost:5000/api/blogs/1/comments
Body (JSON):
{
  "user_name": "John Doe",
  "message": "Great blog post!"
}
```

### 2. Get Blog Comments
```
GET http://localhost:5000/api/blogs/1/comments
```

### 3. Delete Comment
```
DELETE http://localhost:5000/api/blogs/comments/1
Headers: Authorization: Bearer YOUR_TOKEN
```

## Reply APIs

### 1. Add Reply
```
POST http://localhost:5000/api/blogs/comments/1/replies
Body (JSON):
{
  "user_name": "Jane Smith",
  "message": "I agree with your comment!"
}
```

### 2. Delete Reply
```
DELETE http://localhost:5000/api/blogs/replies/1
Headers: Authorization: Bearer YOUR_TOKEN
```

## Test Order
1. Create blog
2. Get all blogs
3. Get single blog
4. Add comment to blog (note the comment ID from response)
5. Get comments
6. Add reply to comment (use actual comment ID)
7. Get comments (with replies)
8. Update blog
9. Delete reply/comment/blog

**Note:** Make sure to use actual IDs from responses, not hardcoded values like 1.