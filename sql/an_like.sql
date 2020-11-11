CREATE TABLE an_like (
  an_like_id INT NOT NULL AUTO_INCREMENT,
  an_no INT NOT NULL,
  username varchar(45) COLLATE utf8_general_mysql500_ci DEFAULT NULL,
  PRIMARY KEY (an_like_id),
  KEY an_no_idx (an_no),
  CONSTRAINT an_no FOREIGN KEY (an_no) REFERENCES announce (no) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci
