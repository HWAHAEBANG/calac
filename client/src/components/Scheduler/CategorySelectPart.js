import React from "react";
import { Box, TextField, Typography, Paper, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function CategorySelectPart({
  setCurrentCategory,
  currentCategory,
  categoryList,
  onOpenCategory,
}) {
  return (
    <Box
      position='absolute'
      top={0}
      left='183px'
      display='flex'
      alignItems='center'
    >
      <TextField
        id='outlined-select-currency'
        select
        label='Category'
        defaultValue='EUR'
        fullWidth
        required
        // helperText={!newEvent.color ? '"Category" is required.' : "Great!"}
        name='color'
        onChange={(e) => setCurrentCategory(e.target.value)}
        // variant='standard'
        variant='outlined'
        size='small'
        value={currentCategory && currentCategory} // 필요 없는듯,..?
        sx={{ width: "200px" }}
      >
        {categoryList[0] ? (
          categoryList.map((option, index) => (
            <MenuItem key={index} value={option.value && option.value}>
              <Box display='flex' alignItems='center'>
                <Paper
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: option.value && option.value,
                  }}
                ></Paper>
                <Typography>
                  &nbsp;&nbsp;{option.label && option.label}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem>카테고리 로딩 오류</MenuItem>
        )}
      </TextField>
      <SettingsIcon
        onClick={onOpenCategory}
        sx={{
          marginLeft: "10px",
          cursor: "pointer",
          "&:hover": {
            transform: "rotate(20deg)",
            // outline: "none",
          },
        }}
      />
    </Box>
  );
}
