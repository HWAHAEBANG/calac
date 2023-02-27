import React, {useState} from 'react'
import { styled } from "@mui/material/styles";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText  } from "@mui/material";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const DiaryMoreButton = (post,setPost) => {
  //======================================================
  const onDelete = (id) => {
    window.confirm(`정말 삭제하시겠습니까?`);
    post.setPost(post.post.filter(item => item.id !== id));
  }
  //======================================================
  return (
    <TabBox>
      <List>
        <ListItem disablePadding>
          <ListItemButtonIcon>
            <AutoFixNormalIcon />
            <ListItemText primary="modify"/>
          </ListItemButtonIcon>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButtonIcon onClick={()=>onDelete(post.id)}>
            <DeleteOutlineIcon />
            <ListItemText primary="delete" />
          </ListItemButtonIcon>
        </ListItem>
      </List>
    </TabBox>
  )
};
//style=================================================
const TabBox = styled(Box)({
  maxWidth: 200, 
  position: 'absolute',
  top: -7,
  left: 35
});
const ListItemButtonIcon = styled(ListItemButton)({
  padding: 0
});
//======================================================

export default DiaryMoreButton