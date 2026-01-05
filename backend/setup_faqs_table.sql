CREATE TABLE IF NOT EXISTS faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO faqs (category, question, answer) VALUES
('General', 'What services do you offer?', 'We offer web development, mobile app development, and digital marketing services.'),
('Technical', 'What technologies do you use?', 'We use modern technologies like React, Node.js, Python, and cloud services.'),
('Pricing', 'How do you calculate project costs?', 'Project costs are calculated based on complexity, timeline, and required features.');