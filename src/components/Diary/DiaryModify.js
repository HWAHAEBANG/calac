import React,{useState,useEffect} from 'react'
import "../../assets/css/App.css";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Divider, TextField, Dialog, DialogTitle, DialogContent, Avatar} from "@mui/material";
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import NoPermissionBlock from "../common/NoPermissionBlock";
import { connect } from "react-redux";

const DiaryModify = ({isModify,setIsModify,diary_no,hasSidCookie}) => {
  //======================================================
  const [getPost, setGetPost] = useState({
    title : '',
    content : '',
    image : ''
  });
  const [newContent,setNewContent] = useState({
    title:'',
    content:''
  })
  //======================================================
  const titleModify = (e) => {
    console.log(e.target.value)
    const {name, value} = e.target;
    setNewContent({
      ...newContent,
      [name]:value
    })
  }
  //======================================================
  const modify = (no) => {
    if(newContent.title.length === 0) {
      alert('변경된 내용이 없어 수정이 불가합니다.');
      setIsModify(false);
    }else {
      console.log("new",newContent.title)
      axios.post('http://localhost:5000/diary/modify',{
        no : no,
        newTitle : newContent.title
      })
      .then(res=>{
        alert('수정되었습니다 :)');
        setIsModify(false);
      })
    }
  }
  //======================================================
  useEffect(()=>{
    axios.post("http://localhost:5000/diary/onePost", {no:diary_no})
    .then(res=>{
      setGetPost({
        title : res.data[0].title,
        content : res.data[0].content_parse,
        image : res.data[0].image
      })
    });
  },[])
  //======================================================
  return (
    <Box>
      <MyDialog
        open={isModify}
        onClose={()=>setIsModify(false)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogBox>
          <TitleBox>
            <Avatar alt="Remy Sharp" src="/images/avatar.png"></Avatar>
            <TitleTextField
              id="standard-helperText"
              defaultValue={getPost.title}
              helperText="update Title"
              variant="standard"
              onChange={titleModify}
            />
          </TitleBox>
          <MyDialogContent dividers>
            <EditorBox>
              <CKEditor
                style={{paddingTop:'20px'}}
                editor={ClassicEditor}
                config={{
                  placeholder: "내용을 입력하세요 :)"
                }}
                onReady={editor=>{
                  // console.log('Editor is ready to use!', editor);
                }}
                onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                }}
              />
            </EditorBox>
          </MyDialogContent>
          {hasSidCookie ? (
            <BtnBox>
              <ModifyButton fullWidth variant="outlined" onClick={()=>modify(diary_no)}>Modify</ModifyButton>
            </BtnBox>
          ):(
            <NoPermissionBlock
              menu='Diary 수정(은)'
            />
          )}
        </DialogBox>
      </MyDialog>
    </Box>
  )
};
// 리덕스 =================================================
const mapStateToProps = (state) => ({
  hasSidCookie: state.hasSidCookie,
});
//style=================================================
const MyDialog = styled(Dialog)({
})
const DialogBox = styled(Box)({
  width: 600,
  height: '70vh',
  backgroundColor: '#fff',
  border: '3px solid #07553B',
  boxShadow: 24,
  padding: 20,
  overflowY :'hidden',
})
const TitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '15px 15px 20px',
})
const TitleTextField = styled(TextField)({
  paddingLeft : 15,
})
const MyDialogContent = styled(DialogContent)({
  height: '43vh',
  padding: '35px 24px 0'
});
const EditorBox = styled(Box)({
  height: 290
});
const BtnBox = styled(Box)({
  padding: 20,
});
const ModifyButton = styled(Button)({
  border: '1px solid #07553B',
  "&:hover":{backgroundColor: '#07553B', color: '#fff'}
});
//======================================================
export default connect(mapStateToProps)(DiaryModify)