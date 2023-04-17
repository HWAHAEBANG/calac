import React from "react";
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import MapSearch from "./MapSearch";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function EventEditModal({
  updatedEvent,
  setUpdatedEvent,
  openEdit,
  newEvent,
  categoryList,
  onEditChange,
  onCloseEdit,
  onEditModalSubmit,
}) {
  return (
    <Modal
      open={openEdit}
      onClose={onCloseEdit}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography
          fontSize={10}
          id='modal-modal-title'
          variant='h6'
          component='h2'
          marginBottom={2}
          marginY={-0.5}
          marginLeft={0.5}
        >
          EDIT EVNET
        </Typography>
        <Typography
          fontSize={25}
          id='modal-modal-title'
          variant='h6'
          component='h2'
          marginBottom={2}
          marginY={-1}
          color='primary'
        >
          일정 수정하기
        </Typography>
        <TextField
          fullWidth
          id='outlined-basic'
          label='Title'
          name='title'
          onChange={onEditChange}
          sx={{ mt: 1 }}
          error={!updatedEvent.title ? true : false}
          helperText={!updatedEvent.title ? '"Title" is required.' : "Great!"}
          required
          variant='standard'
          value={updatedEvent.title && updatedEvent.title}
        />
        <TextField
          id='outlined-select-currency'
          select
          label='Category'
          defaultValue='EUR'
          fullWidth
          required
          error={!updatedEvent.color ? true : false} // 불안
          helperText={!newEvent.color ? '"Category" is required.' : "Great!"}
          name='color'
          onChange={onEditChange}
          variant='standard'
          value={updatedEvent.color && updatedEvent.color} // 불안
        >
          {categoryList[0] ? (
            categoryList.slice(1).map((option, index) => (
              <MenuItem key={index} value={option.value && option.value}>
                {option.label && option.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem>카테고리 로딩 오류</MenuItem>
          )}
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimeField
            value={updatedEvent.start && dayjs(updatedEvent.start)}
            name='start'
            fullWidth
            disabled
            label='start'
            helperText='Start time can only be modified on the calendar page.'
            variant='standard'
          />
          <DateTimeField
            value={updatedEvent.end && dayjs(updatedEvent.end)}
            name='end'
            fullWidth
            disabled
            label='end'
            helperText='End time can only be modified on the calendar page.'
            variant='standard'
          />
        </LocalizationProvider>
        <Box
          display='flex'
          alignItems='end'
          justifyContent='space-between'
          marginTop={1}
        >
          <TextField
            id='outlined-basic'
            label='Locale'
            name='locale'
            value={updatedEvent.locale && updatedEvent.locale}
            // value={newEvent.locale || ""}
            onChange={onEditChange}
            variant='standard'
            sx={{ width: "230px" }}
          />
          <MapSearch setNewEvent={setUpdatedEvent} />
        </Box>
        <Box sx={{ mt: 5 }}>
          <Button onClick={onCloseEdit}>Close</Button>
          <Button type='submit' onClick={onEditModalSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

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
