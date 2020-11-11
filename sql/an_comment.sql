CREATE TABLE an_comment (
  an_no INT NOT NULL,
  username varchar(45) NOT NULL,
  comment text NOT NULL,
  date varchar(50) NOT NULL,
  comment_no INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (comment_no),
  KEY an_comment_no_idx (an_no),
  CONSTRAINT an_comment_no FOREIGN KEY (an_no) REFERENCES announce (no) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8