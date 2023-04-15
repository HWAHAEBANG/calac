import { Box } from "@mui/system";
import React from "react";
import FullCalendarLib from "./FullCalendarLib";
import NoPermissionBlock from "../common/NoPermissionBlock";
import { useSelector } from "react-redux";

const SchedulerSection = () => {
  const hasSidCookie = useSelector((state) => state.hasSidCookie);
  return (
    <Box height='100vh' padding={5} position='relative'>
      {hasSidCookie ? (
        ""
      ) : (
        <NoPermissionBlock
          menu='스케줄러'
          /* comment='여기에 개별 멘트를 주가할 수 있습니다.' */
        />
      )}
      <FullCalendarLib />
    </Box>
  );
};

export default SchedulerSection;
