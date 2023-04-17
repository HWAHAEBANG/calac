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

export default function EventAddModal({
  newEvent,
  categoryList,
  setNewEvent,
  open,
  onChange,
  onClose,
  onModalSubmit,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
          ADD EVNET
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
          일정 추가하기
        </Typography>
        <TextField
          fullWidth
          id='outlined-basic'
          label='Title'
          name='title'
          onChange={onChange}
          sx={{ mt: 1 }}
          error={!newEvent.title ? true : false}
          helperText={!newEvent.title ? '"Title" is required.' : "Great!"}
          required
          variant='standard'
        />
        <TextField
          id='outlined-select-currency'
          select
          label='Category'
          defaultValue='EUR'
          fullWidth
          required
          error={!newEvent.color ? true : false}
          helperText={!newEvent.color ? '"Category" is required.' : "Great!"}
          value={newEvent.color}
          name='color'
          onChange={onChange}
          variant='standard'
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
            value={newEvent.start && dayjs(newEvent.start)}
            fullWidth
            disabled
            name='start'
            label='start'
            helperText='Start time can only be modified on the calendar page.'
            variant='standard'
          />
          <DateTimeField
            value={newEvent.end && dayjs(newEvent.end)}
            fullWidth
            disabled
            name='end'
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
            value={newEvent.locale}
            // value={newEvent.locale || ""}
            onChange={onChange}
            variant='standard'
            sx={{ width: "230px" }}
          />
          <MapSearch setNewEvent={setNewEvent} />
        </Box>
        <Box sx={{ mt: 5 }}>
          <Button onClick={onClose}>Close</Button>
          <Button type='submit' onClick={onModalSubmit}>
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
