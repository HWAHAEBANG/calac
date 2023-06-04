import { Box } from "@mui/system";
import React from "react";
import FullCalendarLib from "./FullCalendarLib";
import NoPermissionBlock from "../common/NoPermissionBlock";
import { useSelector } from "react-redux";

const SchedulerSection = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <Box height='100vh' padding={5} position='relative'>
      {isLoggedIn ? "" : <NoPermissionBlock menu='스케줄러' />}
      <FullCalendarLib />
    </Box>
  );
};

export default SchedulerSection;
