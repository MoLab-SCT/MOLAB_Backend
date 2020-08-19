CREATE TABLE announce
(
	an_no INT PRIMARY KEY NOT NULL,
	an_title VARCHAR(45) NOT NULL,
    an_startdate VARCHAR(45) NOT NULL,
    an_enddate VARCHAR(45) NOT NULL,
    field VARCHAR(45) NOT NULL,
    an_content VARCHAR(45) NOT NULL,
    an_img VARCHAR(45) NOT NULL
);

INSERT INTO announce (an_no,an_startdate,an_enddate,an_title,field,an_content,an_img) VALUES ('1','2020-08-17','2020-08-20','스마트시티 교통 리빙랩 포럼','교통안전','스마트시티 교통 리빙랩 포럼에 참여하세요!','../img/2019양주리빙랩-프로젝트과제공모전.jpg');
INSERT INTO announce (an_no,an_startdate,an_enddate,an_title,field,an_content,an_img) VALUES ('2','2020-08-20','2020-08-26','마곡 리빙랩 프로젝트 공모','기타','스마트시티 교통 리빙랩 포럼에 참여하세요!','../img/예비창업패키지-스마트시티분야2019');
