const express = require('express');
const router = express.Router();
const mysql = require('../config/db');
const config = require('config');

router.get('/', function (req, res) {
  res.redirect('/announce/page/1');
});

router.get('/page/:page', function (req, res) {
  var page = req.params.page;
  var sql = 'select no, title, enddate, startdate, img from announce';
  mysql.query(sql, function (err, rows) {
    if (err) console.error('err : ' + err);
    console.log(rows.length);
    res.render('page.html', {
      title: '게시판 리스트',
      rows: rows,
      page: page,
      length: rows.length - 1,
      page_num: 4,
      pass: true,
    });
  });
});

router.get('/detail/:idx', function (req, res) {
  let idx = req.params.idx;
  let sql = 'select * from announce where no = ?';
  mysql.query(sql, [idx], function (err, row) {
    if (err) console.log(err);
    res.render('read.html', { title: '글 상세', row: row[0] });
  });
});

module.exports = router;
