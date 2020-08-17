CREATE TABLE announce
(
	an_no INT PRIMARY KEY NOT NULL,
	an_title VARCHAR(45) NOT NULL,
    an_date VARCHAR(45) NOT NULL,
    field VARCHAR(45) NOT NULL,
    an_content VARCHAR(45)
);


ALTER DATABASE MOLAB DEFAULT CHARACTER SET utf8;

ALTER TABLE announce convert to charset utf8;

INSERT INTO announce (an_no,an_date,an_title,field,an_content) VALUES ('1','2020-08-17','스마트시티 교통 리빙랩 포럼','교통안전','스마트시티 교통 리빙랩 포럼에 참여하세요!');

SHOW VARIABLES WHERE Variable_Name LIKE "%dir"