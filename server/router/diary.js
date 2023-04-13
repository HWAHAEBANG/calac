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
router.get('/',(req,res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  let selectQuery = '';
  if(limit !== undefined || offset !== undefined) {
    selectQuery = `SELECT * FROM diary ORDER BY diary_no DESC LIMIT ${limit} OFFSET ${offset};`;
  } else {
    selectQuery = `SELECT * FROM diary ORDER BY diary_no DESC;`;
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
  const insertQuery = `INSERT INTO diary (user_no, title, content, content_parse, image) VALUES (1, '${title}', '${content}', '${contentResult}', '${image}');`
  db.query(insertQuery, (err, result) => {
    if(err) console.log("err",err);
    else {res.send(result)}
  })
});
//==============================================

router.post('/delete', (req,res) => {
  const id = req.body.id;
  console.log("id",id)
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
  let modifyQuery = `UPDATE diary SET title=${newTitle} WHERE diary_no=${no}`;
  db.query(modifyQuery, (err,result) => {
    if(err) console.log("err",err);
    else {res.send(result)}
  })
});
//==============================================
module.exports = router;