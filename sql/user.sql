CREATE DATABASE IF NOT EXISTS MOLAB;

USE MOLAB;

CREATE TABLE IF NOT EXISTS user (
  id VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  birth_date DATE NOT NULL,
  name varchar(45) NOT NULL,
  reg_data INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (reg_data)
);

INSERT INTO user (id, password, birth_date, name) VALUES ('euna', '1234', "2000-01-13", '이은아');
INSERT INTO user (id, password, birth_date, name) VALUES ('euna1', '12345', "2000-01-13", '이은아1');
INSERT INTO user (id, password, birth_date, name) VALUES ('euna2', '123456', "2000-01-13", '이은아2');

SELECT password FROM user WHERE id='euna';