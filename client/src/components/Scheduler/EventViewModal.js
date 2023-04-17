import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
export default function EventViewModal({
  updatedEvent,
  detailLocation,
  openDetail,
  onEventDelete,
  onOpenEdit,
  onCloseDetail,
}) {
  return (
    <Paper
      elevation={5}
      sx={
        openDetail
          ? {
              position: "fixed",
              top: detailLocation.y,
              left: detailLocation.x,
              width: "300px",
              zIndex: 99,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: "50px 10px 10px 10px",
            }
          : { display: "none" }
      }
    >
      <Box
        bgcolor={updatedEvent && updatedEvent.color}
        position='absolute'
        top={0}
        left={0}
        height='40px'
        width='100%'
        padding={1}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography color='secondary'>
          {updatedEvent.title && updatedEvent.title}
        </Typography>
        <Box color='#fff'>
          <DeleteIcon
            onClick={onEventDelete}
            sx={{
              marginRight: "5px",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
          <EditIcon
            onClick={onOpenEdit}
            sx={{
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
          <CloseIcon
            onClick={onCloseDetail}
            sx={{
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Box>
      </Box>

      <Typography>
        시작일시 : &nbsp;
        {updatedEvent.start && updatedEvent.start.slice(0, 10)}&nbsp;&nbsp;
        {updatedEvent.start && updatedEvent.start.slice(11, 16)}
      </Typography>
      <Typography>
        종료일시 : &nbsp;
        {updatedEvent.end && updatedEvent.end.slice(0, 10)}&nbsp;&nbsp;
        {updatedEvent.end && updatedEvent.end.slice(11, 16)}
      </Typography>
      <Typography>
        카테고리 : &nbsp;
        {updatedEvent.category && updatedEvent.category}
      </Typography>
      <Typography>
        장&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소 : &nbsp;
        {updatedEvent.locale ? updatedEvent.locale : "장소 정보 없음"}
      </Typography>
    </Paper>
  );
}
