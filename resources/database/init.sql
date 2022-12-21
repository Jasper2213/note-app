CREATE USER 'user' IDENTIFIED BY '1234';
CREATE DATABASE notedb;

GRANT ALL PRIVILEGES ON notedb.* to 'user';

USE notedb;

CREATE TABLE note (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(8000),
    creation_date DATE
);

CREATE TABLE favourite (
    id int,
    foreign key (id) references note(id)
);
