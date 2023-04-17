import React from "react";
import CategoryEditModalList from "./CategoryEditModalList";
import CategoryEditModalInput from "./CategoryEditModalInput";
import { Box, Modal, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";

export default function CategoryEditModal({
  openCategory,
  onCloseCategory,
  categoryList,
  colorPickerVisible,
  setColorPickerVisible,
  setPickedColor,
  setPickedAddColor,
  onUpdateColor,
  onDeleteCategory,
  pickedAddColor,
  categoryText,
  setCategoryText,
  onAddCategory,
}) {
  return (
    <Box>
      <Modal
        open={openCategory}
        onClose={onCloseCategory}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box display='flex' justifyContent='space-between'>
            <Box>
              <Typography
                fontSize={10}
                id='modal-modal-title'
                variant='h6'
                component='h2'
                marginBottom={2}
                marginY={-0.5}
                marginLeft={0.5}
              >
                EDIT CATEGORY
              </Typography>
              <Typography
                id='modal-modal-title'
                variant='h6'
                component='h2'
                color='primary'
                fontWeight={700}
              >
                카테고리 편집
              </Typography>
            </Box>
            <CloseIcon
              onClick={onCloseCategory}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.1)",
                  // outline: "none",
                },
              }}
            />
          </Box>
          <Box
            display='flex'
            alignItems='center'
            color='#D10505'
            marginBottom={2}
          >
            <WarningAmberIcon fontSize='12px' />
            <Typography fontSize='12px'>
              &nbsp;카테고리를 삭제 시, 포함된 이벤트들도 일괄 삭제됩니다.
            </Typography>
          </Box>
          {/* list */}

          <CategoryEditModalList
            categoryList={categoryList}
            colorPickerVisible={colorPickerVisible}
            setColorPickerVisible={setColorPickerVisible}
            setPickedColor={setPickedColor}
            onUpdateColor={onUpdateColor}
            onDeleteCategory={onDeleteCategory}
          />
          {/* list */}
          {/* //===================================== */}
          <CategoryEditModalInput
            setPickedAddColor={setPickedAddColor}
            pickedAddColor={pickedAddColor}
            categoryText={categoryText}
            setCategoryText={setCategoryText}
            onAddCategory={onAddCategory}
          />
          {/* //===================================== */}
        </Box>
      </Modal>
    </Box>
  );
}

//style=================================================
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  // focus 스타일 설정
  "&:focus": {
    border: "none",
    outline: "none",
  },
};
//=======================================================
