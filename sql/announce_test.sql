CREATE DATABASE IF NOT EXISTS MOLAB;

USE MOLAB;

CREATE TABLE IF NOT EXISTS announce (
    no INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    startdate DATE,
    enddate DATE,
    resultdate DATE,
    field_thumbnail VARCHAR(255),
    field_detail VARCHAR(255),
    img VARCHAR(255),
    description VARCHAR(255),
    qualification VARCHAR(255),
    recruitment_number INT,
    apply VARCHAR(255),
    benefits VARCHAR(255),
    questions VARCHAR(255),
    PRIMARY KEY (no)
);

INSERT INTO announce (title,startdate,enddate,resultdate,field_thumbnail,field_detail,img,description,qualification,recruitment_number,apply,benefits,questions)
 VALUES ('스마트시티 서울 시민 참여단 모집 공고','2020-05-19','2020-05-28','2020-05-29','시민참여','서울시 스마트도시 구현을 위한 정책방향 설정 설문조사 
분야별 정책과제 및 아이디어 의견 수렴 등',"/images/서울시.jpg",'사람을 중심에 둔 지속가능한 혁신을 통해 글로벌 표준이 되는 스마트시티 서울 구현을 위해 서울시 도시 정책 방향에 맞춘 종합적 마스터플랜 수립, 정책분야별 전략과제 및 아이디어 발굴을 위한 시민 참여단을 모집합니다.',
'서울 시민 누구나',50,'이메일로 참가 신청서 제출 (pdh0630@kmac.ac.kr)','선발인원은 소정의 상품 제공','시민참여단 모집 기관(수행 컨설턴트: 010-1234-5677)');




