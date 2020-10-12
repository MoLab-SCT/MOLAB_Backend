CREATE TABLE communications (
  com_no bigint(20) NOT NULL AUTO_INCREMENT,
  com_profile LONGBLOB, 
  com_name varchar(45) NOT NULL, 
  com_date varchar(255) NOT NULL,
  com_title varchar(255) NOT NULL,
  com_simpleInfo varchar(255) NOT NULL,
  com_detailInfo longtext  NOT NULL,
  com_category varchar(45) NOT NULL,
  PRIMARY KEY (com_no)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8

INSERT INTO communications (com_name,com_date,com_title,com_simpleInfo,com_detailInfo,com_category,recommend_num,comment_num) VALUES ('김민수','2020-08-17',"청년을 위한 공간 마련 필요","청년들을 위한 스터디 공간 제공", "[ 문제 해결의 필요성 : 왜 문제에 관심을 가지게 되었고, 왜 해결되어야 하는가?] 대학생 공모전 출품을 위해 평균 10회의 오프라인 회의를 진행. 엔제리너스, 할리스 등 24시 카페를 개인 사비로 충당. 금액적 부담감이 있는 상황 [문제와 관련된 이해관계자] 카페 사장, 대학생 [실행 계획]- 동성로 인근에는 카페가 많은데 카페측과 협의하여 휴무일을 활용해, 카페 대관형식으로 청년들에게 스터디 공간을 제공하면 어떨까?- 카페 홍보에도 도움이 될 것이다.- 대관 행사를 통해 스터디 공간은 물론 다른 방식(플리마켓, 원데이클래스 등)으로 활용가능","복지",2,2);
INSERT INTO communications (com_name,com_date,com_title,com_simpleInfo,com_detailInfo,com_category,recommend_num,comment_num) VALUES ('김선영','2020-08-17',"청년을 위한 공간 마련 필요","청년들을 위한 스터디 공간 제공", "[ 문제 해결의 필요성 : 왜 문제에 관심을 가지게 되었고, 왜 해결되어야 하는가?] 대학생 공모전 출품을 위해 평균 10회의 오프라인 회의를 진행. 엔제리너스, 할리스 등 24시 카페를 개인 사비로 충당. 금액적 부담감이 있는 상황 [문제와 관련된 이해관계자] 카페 사장, 대학생 [실행 계획]- 동성로 인근에는 카페가 많은데 카페측과 협의하여 휴무일을 활용해, 카페 대관형식으로 청년들에게 스터디 공간을 제공하면 어떨까?- 카페 홍보에도 도움이 될 것이다.- 대관 행사를 통해 스터디 공간은 물론 다른 방식(플리마켓, 원데이클래스 등)으로 활용가능","복지",2,2);

