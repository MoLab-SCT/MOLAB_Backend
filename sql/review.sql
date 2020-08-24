CREATE TABLE `reviews` (
  review_no int(11) NOT NULL AUTO_INCREMENT,
  review_title varchar(45) NOT NULL,
  review_date varchar(45) NOT NULL,
  field varchar(45) NOT NULL,
  review_content varchar(200) DEFAULT NULL,
  review_img varchar(45) NOT NULL,
  PRIMARY KEY (review_no)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8

insert INTO reviews(review_no, review_title,review_date,field,review_content,review_img) values (1,'시민 연구의 힘을 발견했어요!','2020.08.17','energy','실현에 대한 자신과 용기가 있다 그러므로 그들은 이상의 보배를 능히 품으며 그들의 이상은 아름답고 소담스러운 열매를 맺어 우리 인생을 풍부하게 하는 것이다 보라 청춘을! 그들의 몸이 얼마나 튼튼하며 그들의 피부가 얼마나 실현에 대한 자신과 용기가 있다 그러므로 그들은 이상의 보배를 능히 품으며 그들의 이상은 아름답고 소담스러운 열매를 맺어 우리 인생을','/review1.png');
insert INTO reviews(review_no, review_title,review_date,field,review_content,review_img) values (2,"문제해결을 위한 워크숍 교육, 희망드로잉 26+",'2020.08.18','welfare','실현에 대한 자신과 용기가 있다 그러므로 그들은 이상의 보배를 능히 품으며 그들의 이상은 아름답고 소담스러운 열매를 맺어 우리 인생을 풍부하게 하는 것이다 보라 청춘을! 그들의 몸이 얼마나 튼튼하며 그들의 피부가 얼마나 실현에 대한 자신과 용기가 있다 그러므로 그들은 이상의 보배를 능히 품으며 그들의 이상은 아름답고 소담스러운 열매를 맺어 우리 인생을','/review2.png');
insert INTO reviews(review_no, review_title,review_date,field,review_content,review_img) values (3,'시민 연구의 힘을 발견했어요!','2020.08.18','welfare',"실현에 대한 자신과 용기가 있다 그러므로 그들은 이상의 보배를 능히 품으며 그들의 이상은 아름답고 소담스러운 열매를 맺어 우리 인생을 풍부하게 하는 것이다 보라 청춘을! 그들의 몸이 얼마나 튼튼하며 그들의 피부가 얼마나 실현에 대한 자신과 용기가 있다 그러므로 그들은 이상의 보배를 능히 품으며 그들의 이상은 아름답고 소담스러운 열매를 맺어 우리 인생을",'/review1.png');

