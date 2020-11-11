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
    an_like INT DEFAULT 0,
    url VARCHAR(255),
    PRIMARY KEY (no)
);

INSERT INTO announce (title,startdate,enddate,resultdate,field_thumbnail,field_detail,img,description,qualification,recruitment_number,apply,benefits,questions,url)
 VALUES ('예비창업패키지-스마트시티분야','2020-05-19','2020-05-28','2020-05-29','시민참여','서울시 스마트도시 구현을 위한 정책방향 설정 설문조사 
분야별 정책과제 및 아이디어 의견 수렴 등','서울시.jpg','사람을 중심에 둔 지속가능한 혁신을 통해 글로벌 표준이 되는 스마트시티 서울 구현을 위해 서울시 도시 정책 방향에 맞춘 종합적 마스터플랜 수립, 정책분야별 전략과제 및 아이디어 발굴을 위한 시민 참여단을 모집합니다.',
'서울 시민 누구나',50,'이메일로 참가 신청서 제출 (pdh0630@kmac.ac.kr)','선발인원은 소정의 상품 제공','시민참여단 모집 기관(수행 컨설턴트: 010-1234-5677)','https://www.naver.com/');

INSERT INTO announce (title,startdate,enddate,resultdate,field_thumbnail,field_detail,img,description,qualification,recruitment_number,apply,benefits,questions,url)
 VALUES ('에듀테크','2020-09-03','2020-09-16','2020-10-10','시민참여','스마트시티 국가시범도시에 도입하는 에듀테크 서비스 체험 및 평가','에듀테크.png','시민아이디어/기업해커톤 공모전 평가단 
해당 투표 결과 최종 상격 선정에 반영 예정 (전문가 심사 80%, 평가단 투표 20%)
',
'스마트시티 교육환경에 관심이 있는 시민 누구나
 에듀테크 도입을 통해 교육문제 해결에 관심을 가지고 있는 시민 
 세종 1생활권 주민 누구나  
',100,'접수페이지(http://naver.me/G2h3bPoq)를 통한 온라인 접수
',' 평가 완료시 모바일 상품권(10,000원) 지급 및 기념품 제공 
활동 종료 후 수료증 수여 
에듀테크 서비스 체험 및 교육 행사 초청 등
','http://naver.me/G2h3bPoq로 문의','https://www.naver.com/');

INSERT INTO announce (title,startdate,enddate,resultdate,field_thumbnail,field_detail,img,description,qualification,recruitment_number,apply,benefits,questions,url)
 VALUES ('화성 병점 스마트 시티랩','2020-05-19','2020-05-28','2020-05-29','시민참여','서울시 스마트도시 구현을 위한 정책방향 설정 설문조사 
분야별 정책과제 및 아이디어 의견 수렴 등','화성.png','사람을 중심에 둔 지속가능한 혁신을 통해 글로벌 표준이 되는 스마트시티 서울 구현을 위해 서울시 도시 정책 방향에 맞춘 종합적 마스터플랜 수립, 정책분야별 전략과제 및 아이디어 발굴을 위한 시민 참여단을 모집합니다.',
'서울 시민 누구나',50,'이메일로 참가 신청서 제출 (pdh0630@kmac.ac.kr)','선발인원은 소정의 상품 제공','시민참여단 모집 기관(수행 컨설턴트: 010-1234-5677)','https://www.naver.com/');