CREATE TABLE com_comment (
  com_no bigint(20) NOT NULL,
  username varchar(45) NOT NULL,
  comment text NOT NULL,
  date varchar(50) NOT NULL,
  comment_no bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (comment_no),
  KEY com_comment_no_idx (com_no),
  CONSTRAINT com_comment_no FOREIGN KEY (com_no) REFERENCES communications (com_no) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8