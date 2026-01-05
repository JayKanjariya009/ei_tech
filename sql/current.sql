USE eitech_db;
 
SHOW CREATE TABLE services;

SHOW CREATE TABLE blog_comment_replies;
SHOW CREATE TABLE blog_comments;
SHOW CREATE TABLE blog_comments;

ALTER TABLE blog_comments
ADD COLUMN user_email VARCHAR(50) NOT NULL AFTER id;



ALTER TABLE blog_comment_replies
ADD COLUMN user_email VARCHAR(50) NOT NULL AFTER id;



ALTER TABLE services
ADD COLUMN images JSON NULL AFTER icon,
ADD COLUMN features JSON NULL AFTER images;

ALTER TABLE testimonials
ADD COLUMN designation VARCHAR(50)  NOT NULL ;
-- ADD COLUMN image JSON NULL AFTER user_email;

DESCRIBE testimonials;

DESCRIBE case_studies;

SELECT * FROM users;

SELECT * FROM testimonials;
SELECT * FROM contact_messages;
SELECT * FROM team;
SELECT * FROM blogs;
SELECT * FROM contact_messages;
SELECT * FROM services;
select * from faqs;
select * from blog_comments;
describe blog_comments;