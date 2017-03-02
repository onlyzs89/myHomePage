CREATE DATABASE home;
USE home;
CREATE TABLE msg(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	access_time TIMESTAMP NOT NULL,
	content VARCHAR(64) NOT NULL,
	ip_addr VARCHAR(128),
	user_agent TEXT,
	memo TEXT,
	flag BOOLEAN DEFAULT 0
);

CREATE USER 'xxxxx'@'localhost' IDENTIFIED BY 'xxxxx';
GRANT ALL ON home.* TO xxxxx;

