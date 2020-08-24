CREATE TABLE announces (
  an_no bigint(20) NOT NULL AUTO_INCREMENT,
  an_title varchar(255) NOT NULL,
  an_startdate varchar(255) NOT NULL,
  an_enddate varchar(255) NOT NULL,
  field varchar(255) NOT NULL,
  an_content varchar(255) NOT NULL,
  an_img varchar(255) DEFAULT NULL,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  PRIMARY KEY (an_no)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8

INSERT INTO announce (an_startdate,an_enddate,an_title,field,an_content,an_img) VALUES ('2020-08-17','2020-08-20','스마트시티 교통 리빙랩 포럼','교통안전','스마트시티 교통 리빙랩 포럼에 참여하세요!','../img/2019양주리빙랩-프로젝트과제공모전.jpg');
INSERT INTO announce (an_startdate,an_enddate,an_title,field,an_content,an_img) VALUES ('2020-08-20','2020-08-26','마곡 리빙랩 프로젝트 공모','기타','스마트시티 교통 리빙랩 포럼에 참여하세요!','../img/예비창업패키지-스마트시티분야2019');
