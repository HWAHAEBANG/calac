import React, { useState, useEffect } from "react";
import "../../assets/css/App.css";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import NoPermissionBlock from "../common/NoPermissionBlock";
import { connect } from "react-redux";

const DiaryModify = ({ isModify, setIsModify, diary_no, hasSidCookie }) => {
  //======================================================
  const [getTitle, setGetTitle] = useState("");
  const [getContent, setGetContent] = useState("");
  const [newContent, setNewContent] = useState({
    title: "",
    content: "",
  });
  //======================================================
  const titleModify = (e) => {
    const { value } = e.target;
    setNewContent({
      ...newContent,
      title: value,
    });
  };
  //======================================================
  const contentModify = (e, editor) => {
    const value = editor.getData();
    setNewContent({
      ...newContent,
      content: value,
    });
  };
  //======================================================
  const modify = (no) => {
    let postTitle = newContent.title.length === 0 ? getTitle : newContent.title;
    axios
      .post("http://calac.cafe24app.com/diary/modify", {
        no: no,
        newTitle: postTitle,
        newContent: newContent.content,
      })
      .then((res) => {
        alert("수정되었습니다 :)");
        setIsModify(false);
      });
  };
  //======================================================
  useEffect(() => {
    axios
      .post("http://calac.cafe24app.com/diary/onePost", { no: diary_no })
      .then((res) => {
        setGetTitle(res.data[0].title);
        setGetContent(res.data[0].content);
      });
  }, []);
  //======================================================
  return (
    <Box>
      <MyDialog
        open={isModify}
        onClose={() => setIsModify(false)}
        aria-labelledby='customized-dialog-title'
      >
        <DialogBox>
          <TitleBox>
            <Avatar alt='Remy Sharp' src='/img/avatar.png'></Avatar>
            <TitleTextField
              id='standard-helperText'
              value={newContent.title || getTitle}
              helperText='Update Title'
              variant='standard'
              onChange={titleModify}
            />
          </TitleBox>
          <MyDialogContent dividers>
            <EditorBox>
              <CKEditor
                style={{ paddingTop: "20px" }}
                editor={ClassicEditor}
                data={getContent}
                onChange={(e, editor) => {
                  contentModify(e, editor);
                }}
                onReady={(editor) => {
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
              <ModifyButton
                fullWidth
                variant='outlined'
                onClick={() => modify(diary_no)}
              >
                Modify
              </ModifyButton>
            </BtnBox>
          ) : (
            <NoPermissionBlock menu='Diary 수정(은)' />
          )}
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
  padding: "15px 15px 20px",
});
const TitleTextField = styled(TextField)({
  paddingLeft: 15,
});
const MyDialogContent = styled(DialogContent)({
  height: "43vh",
  padding: "35px 24px 0",
});
const EditorBox = styled(Box)({
  height: 290,
});
const BtnBox = styled(Box)({
  padding: 20,
});
const ModifyButton = styled(Button)({
  border: "1px solid #07553B",
  "&:hover": { backgroundColor: "#07553B", color: "#fff" },
});
//======================================================
export default connect(mapStateToProps)(DiaryModify);
