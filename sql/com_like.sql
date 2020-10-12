CREATE TABLE com_like (
  com_like_id bigint(20) NOT NULL AUTO_INCREMENT,
  com_no bigint(20) NOT NULL,
  username varchar(45) COLLATE utf8_general_mysql500_ci DEFAULT NULL,
  PRIMARY KEY (com_like_id),
  KEY com_no_idx (com_no),
  CONSTRAINT com_no FOREIGN KEY (com_no) REFERENCES communications (com_no) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci