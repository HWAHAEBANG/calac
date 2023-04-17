import React, { useState } from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import colorPicker from "../../assets/images/colorPicker.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { SketchPicker } from "react-color";
import CloseIcon from "@mui/icons-material/Close";

export default function CategoryEditModalList({
  categoryList,
  colorPickerVisible,
  setColorPickerVisible,
  setPickedColor,
  onUpdateColor,
  onDeleteCategory,
}) {
  const [tempColor, setTempColor] = useState("#fff");
  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      width='95%'
      margin='auto'
    >
      {categoryList[0] &&
        categoryList.slice(1).map((option, index) => (
          <Box key={index} value={option.value && option.value}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Paper
                sx={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: option.value && option.value,
                }}
              ></Paper>
              <Typography sx={{ flex: 1 }}>
                &nbsp;&nbsp;{option.label && option.label}
              </Typography>
              <Box position='relative' display='flex' alignItems='center'>
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
                    const newVisible = [...colorPickerVisible];
                    newVisible[index] = !newVisible[index];
                    setColorPickerVisible(newVisible);
                  }}
                />
                <Box
                  className={
                    colorPickerVisible[index]
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
                      const newVisible = [...colorPickerVisible];
                      newVisible[index] = !newVisible[index];
                      setColorPickerVisible(newVisible);
                      setPickedColor("");
                    }}
                  />
                  <SketchPicker
                    color={tempColor}
                    onChange={(e) => setTempColor(e.hex)}
                    onChangeComplete={(e) => setPickedColor(e.hex)}
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
                      onUpdateColor(option);
                      const newVisible = [...colorPickerVisible];
                      newVisible[index] = !newVisible[index];
                      setColorPickerVisible(newVisible);
                    }}
                  >
                    확인
                  </Paper>
                </Box>
                <DeleteIcon
                  sx={{
                    color: "#5A5353",
                    marginLeft: "10px",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.2)",
                      // outline: "none",
                    },
                  }}
                  onClick={() => onDeleteCategory(option)}
                />
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
}
