-- Update services table to match the model expectations
USE eitech_db;

-- Add missing columns to services table
ALTER TABLE services 
ADD COLUMN images JSON,
ADD COLUMN features JSON;

-- Insert some sample data for testing
INSERT INTO services (title, description, icon, images, features) VALUES
('Web Development', 'Custom web solutions for modern businesses', 'web-icon.png', '[]', '["Responsive Design", "SEO Optimized", "Fast Loading"]'),
('Cloud Services', 'Scalable cloud infrastructure and deployment', 'cloud-icon.png', '[]', '["AWS Integration", "Auto Scaling", "24/7 Monitoring"]'),
('Cybersecurity', 'Advanced security solutions and consulting', 'security-icon.png', '[]', '["Threat Detection", "Data Protection", "Compliance"]'),
('IT Consulting', 'Strategic IT guidance for business growth', 'consulting-icon.png', '[]', '["Strategy Planning", "Technology Assessment", "Digital Transformation"]'),
('Data Analytics', 'Business intelligence and data insights', 'analytics-icon.png', '[]', '["Data Visualization", "Predictive Analytics", "Real-time Reports"]'),
('Mobile Apps', 'Cross-platform mobile application development', 'mobile-icon.png', '[]', '["iOS & Android", "React Native", "App Store Deployment"]');