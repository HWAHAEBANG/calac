const express = require('express');
const router = express.Router();
const multer = require('multer');
const {v4:uuid} = require('uuid');
const mime = require("mime-types");
//==============================================

const connectDB = require('../config/connectDB.js');
const db = connectDB.init();
connectDB.open(db);
//==============================================
router.post('/',(req,res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  const user_no = req.body.user_no
  let selectQuery = '';
  if(limit !== undefined || offset !== undefined) {
    selectQuery = `SELECT d.diary_no, d.user_no, u.user_name, d.title, d.content, d.content_parse, d.image, d.createdAt, d.updatedAt FROM diary d INNER JOIN users u ON d.user_no = u.user_no ORDER BY d.diary_no DESC LIMIT ${limit} OFFSET ${offset};`;
  } else {
    selectQuery = `SELECT d.diary_no, d.user_no, u.user_name, d.title, d.content, d.content_parse, d.image, d.createdAt, d.updatedAt FROM diary d INNER JOIN users u ON d.user_no = u.user_no ORDER BY d.diary_no DESC;`;
  }
  db.query(selectQuery, (err, result) => {
    if(err) console.log("err",err);
    else {res.send(result)}
  })
});
//==============================================
router.get('/count',(req,res)=>{
  const countQuery = 'SELECT COUNT(*) FROM diary;'
  db.query(countQuery, (err, result) => {
    if(err) console.log("err",err);
    else {res.send(result)}
  })
})
//==============================================

router.post('/insert',(req,res) => {
  const user_no = req.body.user_no;
  const title = req.body.title;
  const content = req.body.content;
  //content parsing =============================
  const con1 = content.split('<figure class=\"image\">');
  let contentResult = '';
  con1.map(arr => {
    if(arr.includes('</figure>')) {
      const con2 = arr.split('</figure>')
      con2.map(arr2 => {
        if(!arr2.includes('<img')) {
          contentResult += arr2;
        }
      })
    } else {
      contentResult = arr;
    }
  });
  //=============================================
  const image = req.body.image ? req.body.image : 'NULL';
  const insertQuery = `INSERT INTO diary (user_no, title, content, content_parse, image) VALUES (${user_no}, '${title}', '${content}', '${contentResult}', '${image}');`
  db.query(insertQuery, (err, result) => {
    if(err) console.log("err",err);
    else {res.send(result)}
  })
});
//==============================================

router.post('/delete', (req,res) => {
  const id = req.body.id;
  const deleteQuery = `DELETE FROM diary WHERE diary_no=${id}`;
  db.query(deleteQuery, (err, result) => {
    if(err) console.log("err",err);
    else {res.send("삭제완료")}
  })
});
// 이미지 업로드 ==================================
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images/diary/');
  },
  filename: (req, file, callback) => {
    callback(null, `${uuid()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req,file,callback) => {
    if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype))
      callback(null, true);
    else callback(new Error("해당 파일의 형식을 지원하지 않습니다."), false);
  },
  limits : {fileSize : 1024 * 1024 * 50}
});

router.post('/upload', upload.single("file"), (req,res) => {
  res.status(200).json(req.file);
});

//==============================================
router.post('/onePost', (req,res) => {
  const no = req.body.no;
  let selectQuery = `SELECT * FROM diary WHERE diary_no=${no}`;
  db.query(selectQuery, (err,result) => {
    if(err) console.log("err",err);
    else {res.send(result)}
  })
});
//==============================================
router.post('/modify', (req,res) => {
  const no = req.body.no;
  const newTitle = req.body.newTitle;
  const newContent = req.body.newContent;
  //content parsing =============================
  const con1 = newContent.split('<figure class=\"image\">');
  let contentResult = '';
  con1.map(arr => {
    if(arr.includes('</figure>')) {
      const con2 = arr.split('</figure>')
      con2.map(arr2 => {
        if(!arr2.includes('<img')) {
          contentResult += arr2;
        }
      })
    } else {
      contentResult = arr;
    }
  });
  //============================================
  let modifyQuery = `UPDATE diary SET title='${newTitle}', content='${newContent}', content_parse='${contentResult}' WHERE diary_no=${no}`;
  db.query(modifyQuery, (err,result) => {
    if(err) console.log("err",err);
    else {res.send(result)}
  })
});
//==============================================
module.exports = router;