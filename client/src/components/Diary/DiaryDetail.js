import React, { useState, useEffect } from "react";
import "../../assets/css/App.css";
import { styled } from "@mui/material/styles";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Typography,
  Button,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
} from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import NoPermissionBlock from "../common/NoPermissionBlock";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { getSession } from "../../redux/user/actions";

const DiaryDetail = ({
  isDetailOpen,
  setIsDetailOpen,
  id,
  title,
  content,
  createdAt,
  user,
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ comment: "" });
  const [isUpdate, setIsUpdate] = useState("false");
  const [updateComment, setUpdateComment] = useState({ comment: "" });
  const [updateTime, setUpdateTime] = useState(false);
  const [countIdx, setCountIdx] = useState(0);
  //======================================================
  const dispatch = useDispatch();
  const hasSidCookie = useSelector((state) => state.hasSidCookie);
  const session = useSelector((state) => state.session);
  //======================================================
  const commentHandle = (e) => {
    const { value } = e.target;
    if (isUpdate) {
      setNewComment({
        ...newComment,
        comment: value,
      });
    } else {
      setUpdateComment({
        ...updateComment,
        comment: value,
      });
    }
  };
  //======================================================
  const submitComment = (id) => {
    if (newComment.comment.length > 0) {
      axios
        .post("http://calac.cafe24app.com/diary/comments/insert", {
          diary_no: id,
          comment: newComment.comment,
          user: session.userInfo.no,
        })
        .then(() => {
          alert("댓글이 등록되었습니다 :)");
          setNewComment({ comment: "" });
        })
        .catch((err) => console.log("err", err));
    } else {
      alert("댓글을 입력해주세요 :(");
    }
  };
  //======================================================
  const commentDelete = (id) => {
    if (window.confirm(`정말 삭제하시겠습니까?`) === true) {
      axios
        .post("http://calac.cafe24app.com/diary/comments/delete", {
          comment_no: id,
        })
        .then(() => alert("삭제되었습니다 :)"))
        .catch((err) => console.log("err", err));
    } else {
      alert("취소되었습니다 :)");
    }
  };
  //======================================================
  const clickUpdateBtn = (id, comment) => {
    setCountIdx(id);
    if (isUpdate) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
      let sendComment =
        updateComment.comment.length === 0 ? comment : updateComment.comment;
      if (window.confirm(`정말 수정하시겠습니까?`) === true) {
        axios
          .post("http://calac.cafe24app.com/diary/comments/update", {
            updateComment: sendComment,
            comment_no: id,
          })
          .then(() => {
            alert("수정되었습니다 :)");
            setUpdateTime(true);
          });
      } else {
        alert("취소되었습니다 :)");
      }
    }
  };
  //======================================================
  useEffect(() => {
    axios
      .post("http://calac.cafe24app.com/diary/comments", {
        diary_no: id,
      })
      .then((res) => {
        setComments(res.data[0]);
      });
  }, [comments]);
  //======================================================
  useEffect(() => {
    dispatch(getSession());
  }, [hasSidCookie]);
  //======================================================
  return (
    <Box>
      <MyDialog
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        aria-labelledby='customized-dialog-title'
      >
        <DialogBox>
          <TitleBox>
            <TitleSmallBox>
              <UserBox>
                <Avatar alt='Remy Sharp' src='/img/avatar.png' />
                <UserTypography>{user}</UserTypography>
              </UserBox>
              <DialogTitle>{title}</DialogTitle>
            </TitleSmallBox>
          </TitleBox>
          <DateTypography>{createdAt}</DateTypography>
          <MyDialogContent dividers>
            <DetailBox>
              <ContentBox>{ReactHtmlParser(content)}</ContentBox>
            </DetailBox>
            <DetailDivider />
            <CommentBox>
              {!hasSidCookie ? (
                <CommentTextField
                  disabled
                  id='outlined-basic-disabled'
                  variant='outlined'
                  defaultValue='로그인을 진행해주세요'
                  size='small'
                />
              ) : (
                <CommentTextField
                  id='outlined-basic'
                  variant='outlined'
                  label='댓글달기'
                  size='small'
                  onChange={commentHandle}
                  value={newComment.comment}
                />
              )}
              <CommentButton onClick={() => submitComment(id)}>
                등록
              </CommentButton>
              <List>
                {comments.map((list) => {
                  return (
                    <ListItem key={list.comment_no}>
                      {isUpdate ? (
                        updateTime ? (
                          <ListItemText
                            primary={`${list.comment} (${
                              list.user_id
                            } ${new Date(list.updatedAt).toLocaleString()})`}
                          />
                        ) : (
                          <ListItemText
                            primary={`${list.comment} (${
                              list.user_id
                            } ${new Date(list.createdAt).toLocaleString()})`}
                          />
                        )
                      ) : countIdx === list.comment_no ? (
                        <CommentTextField
                          id='outlined-basic'
                          variant='outlined'
                          value={updateComment.comment || list.comment}
                          size='small'
                          onChange={commentHandle}
                        />
                      ) : updateTime ? (
                        <ListItemText
                          primary={`${list.comment} (${list.user_id} ${new Date(
                            list.updatedAt
                          ).toLocaleString()})`}
                        />
                      ) : (
                        <ListItemText
                          primary={`${list.comment} (${list.user_id} ${new Date(
                            list.createdAt
                          ).toLocaleString()})`}
                        />
                      )}
                      {hasSidCookie && session.userInfo.no === list.user_no && (
                        <>
                          <CommentUpdate
                            onClick={() =>
                              clickUpdateBtn(list.comment_no, list.comment)
                            }
                          >
                            {isUpdate ? "수정" : "완료"}
                          </CommentUpdate>
                          <CommentDelete
                            onClick={() => commentDelete(list.comment_no)}
                          >
                            삭제
                          </CommentDelete>
                        </>
                      )}
                    </ListItem>
                  );
                })}
              </List>
            </CommentBox>
          </MyDialogContent>
        </DialogBox>
      </MyDialog>
    </Box>
  );
};
// 리덕스 =================================================
const mapStateToProps = (state) => ({
  hasSidCookie: state.hasSidCookie,
});
//style=================================================
const MyDialog = styled(Dialog)({});
const DialogBox = styled(Box)({
  width: 600,
  height: "70vh",
  backgroundColor: "#fff",
  border: "3px solid #07553B",
  boxShadow: 24,
  padding: 20,
  overflowY: "hidden",
});
const TitleBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px 15px 0",
});
const TitleSmallBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});
const UserBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
const UserTypography = styled(Typography)({});
const DateTypography = styled(Typography)({
  fontSize: 15,
  color: "#07553B",
  textAlign: "right",
  marginBottom: 10,
});
const MyDialogContent = styled(DialogContent)({
  height: "50vh",
});
const DetailBox = styled(Box)({
  padding: 20,
});
const ContentBox = styled(Box)({
  fontSize: 20,
  textAlign: "center",
  paddingTop: 30,
});
const DetailDivider = styled(Divider)({});
const CommentBox = styled(Box)({
  paddingTop: 20,
  height: 30,
});
const CommentTextField = styled(TextField)({
  width: "80%",
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

export default connect(mapStateToProps)(DiaryDetail);
