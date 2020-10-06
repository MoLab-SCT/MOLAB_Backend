CREATE TABLE user (
  id varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  birth_date date NOT NULL,
  name varchar(45) NOT NULL,
  reg_data int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (reg_data)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8