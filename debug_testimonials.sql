-- Debug testimonials table
USE eitech_db;

-- Check if testimonials table exists and its structure
DESCRIBE testimonials;

-- Check current data
SELECT * FROM testimonials;

-- Check if image column exists
SHOW COLUMNS FROM testimonials LIKE 'image';

-- Insert test data if table is empty
INSERT INTO testimonials (user_name, user_email, message, rating, status, image) VALUES 
('John Doe', 'john@example.com', 'Great service!', 5, 'approved', '["test-image.jpg"]'),
('Jane Smith', 'jane@example.com', 'Excellent work!', 4, 'approved', '[]'),
('Bob Wilson', 'bob@example.com', 'Outstanding quality!', 5, 'pending', '[]');

-- Check data after insert
SELECT * FROM testimonials;