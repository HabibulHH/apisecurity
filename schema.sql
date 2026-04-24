-- PostgreSQL / MySQL both works
CREATE TABLE users (
    id SERIAL PRIMARY KEY,              -- MySQL: INT AUTO_INCREMENT PRIMARY KEY
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,     -- intentionally plain text for demo
    email VARCHAR(100),
    role VARCHAR(20) DEFAULT 'user'
);

-- Sample data (students ei diye attack practice korbe)
INSERT INTO users (username, password, email, role) VALUES
('admin',   'admin123',      'admin@brritto.com',   'admin'),
('hira',    'mypassword',    'hira@innospace.com',  'user'),
('rahim',   'rahim2024',     'rahim@gmail.com',     'user'),
('karim',   'karim_pass',    'karim@gmail.com',     'user'),
('sajib',   'test1234',      'sajib@gmail.com',     'moderator');