import React, { useState, useEffect } from "react";
import "../../assets/css/App.css";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Modal,
  Fade,
  Typography,
  Backdrop,
  Divider,
  TextField,
  Hidden,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import NoPermissionBlock from "../common/NoPermissionBlock";
import { useSelector, useDispatch } from "react-redux"; // 1. useSelector, useDispatch 가져오기

const WriteDiary = () => {
  const [open, setOpen] = useState(false);
  const [allContent, setAllContent] = useState({
    title: "",
    content: "",
  });
  const [uploadImg, setUploadImg] = useState("");
  const [flag, setFlag] = useState(false);
  //=======================================================
  const dispatch = useDispatch(); // 3. dispatch변수에 useDispatch() 함수 할당
  // 4. 쿠키 여부 상태가 저장되는 변수임. boolean타입을 반환함
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // 5. 세션 객체가 저장되는 변수임. 객체타입 {success: true userInfo: {no: 1 ...}} 을 반환함.
  const userInfo = useSelector((state) => state.userInfo);
  //=======================================================
  const imgLink = "http://calac-env.eba-pyefrphs.ap-northeast-2.elasticbeanstalk.com/api/images/diary";
  // ckeditor img upload ==================================
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append("name", file.name);
            data.append("file", file);

            axios
              .post("http://calac-env.eba-pyefrphs.ap-northeast-2.elasticbeanstalk.com/api/diary/upload", data)
              .then((res) => {
                if (!flag) {
                  setFlag(true);
                  setUploadImg(res.data.filename);
                }
                resolve({
                  default: `${imgLink}/${res.data.filename}`,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };
  // 화살표함수로 하니까 오류나는데...이유를 모르겠다....
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }
  // ======================================================
  const getValue = (e) => {
    const { name, value } = e.target;
    setAllContent({
      ...allContent,
      [name]: value,
    });
  };
  //======================================================
  const ckHandle = (e, editor) => {
    const data = editor.getData();
    setAllContent({
      ...allContent,
      content: data,
    });
  };
  //======================================================
  const onReset = () => {
    setAllContent({
      title: "",
      content: "",
    });
    setUploadImg("");
  };
  //======================================================
  const submit = () => {
    if (allContent.title.length === 0 || allContent.content.length === 0) {
      alert("제목 또는 내용을 입력해주세요 !");
    } else {
      axios
        .post("http://calac-env.eba-pyefrphs.ap-northeast-2.elasticbeanstalk.com/api/diary/insert", {
          user_no: userInfo.userInfo.no,
          title: allContent.title,
          content: allContent.content,
          image: uploadImg,
        })
        .then((res) => {
          alert("등록되었습니다 :)");
          onReset();
          setOpen(false);
        });
    }
  };
  //======================================================
  return (
    <Box>
      <Button
        variant='outlined'
        startIcon={<CreateIcon />}
        onClick={() => setOpen(true)}
      >
        {" "}
        Write
      </Button>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <ModalBox>
            <TitleTypography>Write Diary</TitleTypography>
            <Divider />
            <TitleBox>
              <TextField
                id='standard success'
                color='success'
                variant='standard'
                fullWidth
                label='제목'
                multiline
                name='title'
                onChange={getValue}
              />
            </TitleBox>
            <EditorBox>
              <CKEditor
                style={{ paddingTop: "20px" }}
                editor={ClassicEditor}
                config={{
                  placeholder: "내용을 입력하세요 :)",
                  extraPlugins: [uploadPlugin],
                }}
                onReady={(editor) => {
                  // console.log('Editor is ready to use!', editor);
                }}
                onChange={ckHandle}
                onBlur={(event, editor) => {
                  // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  // console.log('Focus.', editor);
                }}
              />
            </EditorBox>
            {isLoggedIn.isLoggedIn ? (
              <BtnBox>
                <SubmitButton fullWidth variant='outlined' onClick={submit}>
                  Submit
                </SubmitButton>
              </BtnBox>
            ) : (
              <NoPermissionBlock menu='Diary 작성(은)' />
            )}
          </ModalBox>
        </Fade>
      </Modal>
    </Box>
  );
};
//style=================================================
const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "57%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "70vh",
  backgroundColor: "#fff",
  border: "3px solid #07553B",
  boxShadow: 24,
  padding: 37,
  overflowY: "auto",
});
const TitleTypography = styled(Typography)({
  fontSize: 30,
  color: "#07553B",
});
const TitleBox = styled(Box)({
  padding: 20,
});
const EditorBox = styled(Box)({
  height: 290,
});
const BtnBox = styled(Box)({
  padding: 20,
});
const SubmitButton = styled(Button)({
  border: "1px solid #07553B",
  "&:hover": { backgroundColor: "#07553B", color: "#fff" },
});
//======================================================

export default WriteDiary;
