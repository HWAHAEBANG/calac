import React, { useState } from "react";
import colorPicker from "../../assets/images/colorPicker.png";
import { Box, Paper, Avatar, TextField, Button } from "@mui/material";
import { SketchPicker } from "react-color";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import "../../assets/css/App.css";

export default function CategoryEditModalInput({
  setPickedAddColor,
  pickedAddColor,
  categoryText,
  setCategoryText,
  onAddCategory,
}) {
  const [tempColor, setTempColor] = useState("#fff");
  const [addColorPickerVisible, setAddColorPickerVisible] = useState(false); // 컬리픽커 보이기 토글 (삽입용)
  return (
    <Box display='flex' alignItems='center' marginTop={2} gap={2}>
      <AddIcon color='#5A5353' />
      <Box>
        <Paper
          sx={{
            width: "10px",
            height: "10px",
            // backgroundColor: "red",
            backgroundColor: pickedAddColor ? pickedAddColor : "#fff",
          }}
        ></Paper>
      </Box>
      <TextField
        fullWidth
        variant='standard'
        label='Category Name'
        value={categoryText}
        onChange={(e) => setCategoryText(e.target.value)}
        size='small'
        sx={{ marginBottom: "10px" }}
      ></TextField>
      {/*  */}
      <Box position='relative'>
        <Avatar
          alt='colorPicker'
          src={colorPicker}
          sx={{
            height: "20px",
            width: "20px",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.2)",
            },
            // position: "absolute",
            top: "0",
            left: "0",
          }}
          onClick={() => {
            setAddColorPickerVisible((prev) => !prev);
            setPickedAddColor("");
          }}
        />
        <Box
          className={
            addColorPickerVisible
              ? "colorPickerVisible"
              : "colorPickerInvisible"
          }
        >
          <CloseIcon
            sx={{
              position: "absolute",
              right: "0",
              top: "-30px",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.2)",
                // outline: "none",
              },
            }}
            onClick={() => {
              setAddColorPickerVisible((prev) => !prev);
              setPickedAddColor("");
            }}
          />
          <SketchPicker
            color={tempColor}
            onChange={(e) => setTempColor(e.hex)}
            onChangeComplete={(e) => setPickedAddColor(e.hex)}
          />
          <Paper
            sx={{
              position: "absolute",
              bottom: "-40px",
              right: 0,
              width: "60px",
              borderRadius: "20px",
              textAlign: "center",
              fontSize: "12px",
              backgroundColor: "#07553B",
              color: "#fff",
              padding: "5px 10px",
              cursor: "pointer",
              "&:hover": {
                filter: "brightness(0.8)",
                // outline: "none",
              },
            }}
            onClick={() => {
              setAddColorPickerVisible(false);
            }}
          >
            확인
          </Paper>
        </Box>
      </Box>
      {/*  */}
      <Button variant='contained' onClick={onAddCategory}>
        추가
      </Button>
    </Box>
  );
}
