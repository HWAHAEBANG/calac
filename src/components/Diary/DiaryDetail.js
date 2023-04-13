import React,{useState,useEffect} from 'react'
import "../../assets/css/App.css";
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemText, CardMedia, Typography, Button, Divider, TextField, Dialog, DialogTitle, DialogContent, Avatar} from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import axios from 'axios';
import NoPermissionBlock from "../common/NoPermissionBlock";
import { connect } from "react-redux";

const DiaryDetail = ({isDetailOpen,setIsDetailOpen,id,title,content,createdAt,hasSidCookie}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState ({comment: ''})
  const [isUpdate, setIsUpdate] = useState('false');
  const [updateComment, setUpdateComment] = useState('')
  const [updateTime, setUpdateTime] = useState(false);
  //======================================================
  const commentHandle = (e) => {
    const data = e.target.value;
    if(isUpdate) {
      setNewComment({
        ...newComment,
        comment : data
      })
    } else {
      setUpdateComment({
        ...updateComment,
        comment : data
      })
    }
  }
  //======================================================
  const submitComment = (id) => {
    if(newComment.comment.length > 0){
      axios.post('http://localhost:5000/comments/insert',{
        diary_no : id,
        comment : newComment.comment
      })
      .then(()=>alert('댓글이 등록되었습니다 :)'))
      .catch(err=>console.log("err",err))
      setNewComment({comment:''})
    } else {
      alert('댓글을 입력해주세요 :(');
    }
  }
  //======================================================
  const commentDelete = (id) => {
    if(window.confirm(`정말 삭제하시겠습니까?`) === true) {
      axios.post('http://localhost:5000/comments/delete' , {
        comment_no : id
      })
      .then(()=>alert("삭제되었습니다 :)"))
      .catch(err=>console.log("err",err))
    } else {
      alert("취소되었습니다 :)")
    }
  }
  //======================================================
  const clickUpdateBtn = (id) => {
    if(isUpdate) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
      if(window.confirm(`정말 수정하시겠습니까?`) === true) {
        axios.post('http://localhost:5000/comments/update', {
          updateComment : updateComment.comment,
          comment_no : id
        })
        .then(()=>{
          alert("수정되었습니다 :)")
          setUpdateTime(true); 
        })
      } else {
        alert ("취소되었습니다 :)");
      }
    }
  }

  //======================================================
  useEffect(()=>{
    axios.post('http://localhost:5000/comments', {
      diary_no : id
    })
    .then(res=>{setComments(res.data[0])});
  },[comments])
  //======================================================
  return (
    <Box>
      <MyDialog
        open={isDetailOpen}
        onClose={()=>setIsDetailOpen(false)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogBox>
          <TitleBox>
            <TitleSmallBox>
              <Avatar alt="Remy Sharp" src="/images/avatar.png">
                <UserTypography>{id}</UserTypography>
              </Avatar>
              <DialogTitle>{title}</DialogTitle>
            </TitleSmallBox>
          </TitleBox>
          <DateTypography>{createdAt}</DateTypography>
          <MyDialogContent dividers>
            <DetailBox>
              <ContentBox>
                {ReactHtmlParser(content)}
              </ContentBox>
            </DetailBox>
            <DetailDivider/>
            <CommentBox>
              {!hasSidCookie ? (
                <CommentTextField
                  disabled
                  id="outlined-basic-disabled" 
                  variant="outlined" 
                  defaultValue="로그인을 진행해주세요" 
                  size="small" 
                />
              ):(
                <CommentTextField 
                  id="outlined-basic" 
                  variant="outlined" 
                  label="댓글달기" 
                  size="small" 
                  onChange={commentHandle}
                />
              )}
              <CommentButton onClick={()=>submitComment(id)}>등록</CommentButton>
              <List>
                {comments.map(list => {
                  return (
                    <ListItem key={list.comment_no}>
                      {isUpdate ? (
                        updateTime ? (
                          <ListItemText
                            primary={`${list.comment} (${list.user_id} ${new Date(list.createdAt).toLocaleString()})`}
                          />
                        ):(
                          <ListItemText
                            primary={`${list.comment} (${list.user_id} ${new Date(list.updatedAt).toLocaleString()})`}
                          />
                        )
                      ):(
                        <CommentTextField 
                          id="outlined-basic" 
                          variant="outlined" 
                          label={list.comment}
                          size="small" 
                          onChange={commentHandle}
                        />
                      )}
                      {hasSidCookie && (
                        <>
                          <CommentUpdate onClick={()=>clickUpdateBtn(list.comment_no)}>{isUpdate ? "수정" : "완료"}</CommentUpdate>
                          <CommentDelete onClick={()=>commentDelete(list.comment_no)}>삭제</CommentDelete>
                        </>
                      )}
                    </ListItem>
                  )
                })}
              </List>
            </CommentBox>
          </MyDialogContent>
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
  justifyContent: 'space-between',
  padding: '15px 15px 0',
})
const TitleSmallBox = styled(Box)({
  display:'flex',
  alignItems:'center',
})
const UserTypography = styled(Typography)({
  padding: 0,
  marginLeft: 13,
})
const DateTypography = styled(Typography)({
  fontSize: 15,
  color: '#07553B',
  textAlign: 'right',
  marginBottom: 10,
})
const MyDialogContent = styled(DialogContent)({
  height: '50vh',
});
const DetailBox = styled(Box)({
  padding: 20,
});
const ContentBox = styled(Box)({
  fontSize: 20,
  textAlign: 'center',
  paddingTop: 30,
});
const DetailDivider = styled(Divider)({
});
const CommentBox = styled(Box)({
  paddingTop: 20,
  height:30
});
const CommentTextField = styled(TextField)({
  width: '80%',
});
const CommentButton = styled(Button)({
  left: 26,
});
const CommentUpdate = styled(Button)({
  left: 26,
});
const CommentSubmit = styled(Button)({
  left: 26,
});
const CommentDelete = styled(Button)({
  left: 26,
});
//======================================================

export default connect(mapStateToProps)(DiaryDetail)