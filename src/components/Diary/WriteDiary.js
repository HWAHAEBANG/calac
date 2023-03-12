import React,{useState} from 'react'
import "../../assets/css/App.css";
import { styled } from "@mui/material/styles";
import { Box, Button, Modal, Fade, Typography, Backdrop, Divider, TextField } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const WriteDiary = () => {
  const [open, setOpen] = useState(false);
  const [allContent, setAllContent] = useState({
    title : '',
    content : '',
    image : ''
  })
  // ======================================================
  const getValue = (e) => {
    const {name, value} = e.target;
    setAllContent({
      ...allContent,
      [name]:value
    })
  }
  //======================================================
  const ckHandle = (e, editor) => {
    const data = editor.getData();
    // console.log({e,editor, data})
    setAllContent({
      ...allContent,
      content : data
    })
  }
  //======================================================
  const handleBtnClick = () => {

  }
  //======================================================
  const handleChange = () => {
    
  }
  //======================================================
  const imgInput = () => {

  }
  //======================================================
  const submit = () => {
    axios.post('http://localhost:5000/dairy/insert', {
      title : allContent.title,
      content : allContent.content,
      image : allContent.img
    })
    .then(()=>{
      alert('등록되었습니다 :)');
      setOpen(false);
    })
  }
  //======================================================

  return (
    <Box>
      <Button 
        variant="outlined" 
        startIcon={<CreateIcon />}
        onClick={()=>setOpen(true)}
      > Write
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={()=>setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <ModalBox>
            <TitleTypography>Write Diary</TitleTypography>
            <Divider/>
            <TitleBox>
              <TextField
                id="standard success" 
                color="success"
                variant="standard" 
                fullWidth 
                label="제목" 
                multiline 
                name="title"
                onChange={getValue}
              />
            </TitleBox>

            <EditorBox>
              <CKEditor
                style={{paddingTop:'20px'}}
                editor={ClassicEditor}
                config={{placeholder: "내용을 입력하세요 :)"}}
                onChange={ckHandle}
              />
            </EditorBox>

            <Button onClick={handleBtnClick}>이미지업로드</Button>
            <input ref={imgInput} onChange={handleChange} type="file" id="fileUpload" style={{display:"none"}}/>
            <BtnBox>
              <SubmitButton fullWidth variant="outlined" onClick={submit}>Submit</SubmitButton>
            </BtnBox>
          </ModalBox>
        </Fade>
      </Modal>
    </Box>
  )
};
//style=================================================
const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '57%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: '60vh',
  backgroundColor: '#fff',
  border: '3px solid #07553B',
  boxShadow: 24,
  padding: 37,
  overflowY: 'auto'
});
const TitleTypography = styled(Typography)({
  fontSize: 30,
  color: '#07553B',
});
const TitleBox = styled(Box)({
  padding: 20,
});
const EditorBox = styled(Box)({
  height: 290
});
const BtnBox = styled(Box)({
  padding: 20,
});
const SubmitButton = styled(Button)({
  border: '1px solid #07553B',
  "&:hover":{backgroundColor: '#07553B', color: '#fff'}
});
//======================================================

export default WriteDiary