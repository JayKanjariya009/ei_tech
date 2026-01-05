# Testimonial API Testing Guide

## Import Postman Collection
1. Open Postman
2. Click "Import" button
3. Select `Testimonial_APIs.postman_collection.json`
4. Collection will be imported with all endpoints

## Setup Environment Variables
1. Set `baseUrl` to `http://localhost:5000`
2. Get JWT token by calling Login endpoint
3. Set `token` variable with the JWT token

## Complete API Testing Steps

### Step 1: Authentication
**Login to get JWT Token**
- **Method**: POST
- **URL**: `{{baseUrl}}/api/auth/login`
- **Body** (raw JSON):
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```
- **Expected Response**: JWT token
- **Action**: Copy token and set in `token` variable

### Step 2: Test Public Endpoints (No Auth Required)

#### Get Approved Testimonials (Public)
- **Method**: GET
- **URL**: `{{baseUrl}}/api/testimonials`
- **Headers**: None required
- **Expected**: Array of approved testimonials only
- **Note**: Returns empty array if no approved testimonials exist

### Step 3: Test Admin Endpoints (Auth Required)

#### Get All Testimonials (Admin)
- **Method**: GET
- **URL**: `{{baseUrl}}/api/testimonials/admin/all`
- **Headers**: `Authorization: Bearer {{token}}`
- **Expected**: Array of all testimonials (approved + pending)

#### Add New Testimonial (Without Images)
- **Method**: POST
- **URL**: `{{baseUrl}}/api/testimonials`
- **Headers**: `Authorization: Bearer {{token}}`
- **Body** (form-data):
```
user_name: John Doe
user_email: john@example.com
message: Excellent service! Highly recommended.
rating: 5
```
- **Expected**: Success message with testimonial ID
- **Status**: Creates testimonial with status "pending"

#### Add New Testimonial (With Images)
- **Method**: POST
- **URL**: `{{baseUrl}}/api/testimonials`
- **Headers**: `Authorization: Bearer {{token}}`
- **Body** (form-data):
```
user_name: Jane Smith
user_email: jane@example.com
message: Great experience working with this team!
rating: 4
image: [Select 1-5 image files]
```
- **File Requirements**:
  - Formats: JPEG, PNG, WebP, JPG
  - Max size: 5MB per image
  - Max count: 5 images

#### Get Single Testimonial
- **Method**: GET
- **URL**: `{{baseUrl}}/api/testimonials/1`
- **Headers**: None required
- **Expected**: Single testimonial object with parsed image array

#### Update Testimonial (Message Only)
- **Method**: PUT
- **URL**: `{{baseUrl}}/api/testimonials/1`
- **Headers**: `Authorization: Bearer {{token}}`
- **Body** (form-data):
```
message: Updated testimonial message - even better experience!
```
- **Expected**: Success message
- **Note**: Keeps existing images

#### Update Testimonial (With New Images)
- **Method**: PUT
- **URL**: `{{baseUrl}}/api/testimonials/1`
- **Headers**: `Authorization: Bearer {{token}}`
- **Body** (form-data):
```
message: Updated message with new images
image: [Select new image files]
```
- **Expected**: Success message
- **Note**: Replaces existing images with new ones

#### Approve Testimonial
- **Method**: PUT
- **URL**: `{{baseUrl}}/api/testimonials/1/approve`
- **Headers**: `Authorization: Bearer {{token}}`
- **Body**: None
- **Expected**: Success message
- **Action**: Changes status from "pending" to "approved"

#### Delete Testimonial
- **Method**: DELETE
- **URL**: `{{baseUrl}}/api/testimonials/1`
- **Headers**: `Authorization: Bearer {{token}}`
- **Expected**: Success message
- **Action**: Deletes testimonial and associated image files

## Testing Workflow

### Complete Test Sequence:
1. **Login** → Get token
2. **Check admin testimonials** → See all existing data
3. **Add testimonial without images** → Test basic creation
4. **Add testimonial with images** → Test file upload
5. **Check admin testimonials again** → Verify new testimonials (status: pending)
6. **Check public testimonials** → Should be empty (no approved yet)
7. **Approve a testimonial** → Change status to approved
8. **Check public testimonials again** → Should show approved testimonial
9. **Update testimonial** → Test message/image updates
10. **Get single testimonial** → Test individual retrieval
11. **Delete testimonial** → Test cleanup

## Troubleshooting

### Empty Array Response
- Check if testimonials exist: Use admin endpoint
- Check testimonial status: Only approved show in public endpoint
- Check server logs for debug information

### Image Upload Issues
- Verify file format (JPEG, PNG, WebP, JPG)
- Check file size (max 5MB per image)
- Ensure form-data content type
- Max 5 images per testimonial

### Authentication Errors
- Verify JWT token is valid
- Check Authorization header format: `Bearer {token}`
- Token expires - get new token if needed

## Response Formats

### Success Response
```json
{
  "id": 1,
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "message": "Excellent service!",
  "rating": 5,
  "image": ["1234567890-image.jpg"],
  "status": "pending",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### Error Response
```json
{
  "message": "All fields are required"
}
```

## Image Access
- **URL Pattern**: `http://localhost:5000/uploads/testimonials/{filename}`
- **Example**: `http://localhost:5000/uploads/testimonials/1234567890-profile.jpg`
- **Note**: Images are publicly accessible once uploaded

## Database Debug
If testimonials are empty, run the SQL debug script:
```sql
-- Check testimonials table
SELECT * FROM testimonials;

-- Insert test data if needed
INSERT INTO testimonials (user_name, user_email, message, rating, status, image) VALUES 
('Test User', 'test@example.com', 'Test message', 5, 'approved', '[]');
```