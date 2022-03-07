import { Outlet, Navigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
// import React, { useState, useEffect, Component } from 'react'
import React, { useState, useEffect, Component, useRef } from 'react'
import axios from 'axios';
import { For } from 'react-loops'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import LoadingButton from '@mui/lab/LoadingButton';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';

function renderRow(props) {
  const { index, style } = props;

return (
  <ListItem style={style} key={index} component="div" disablePadding>
    <ListItemButton>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItemButton>
  </ListItem>
  );
}

// function createProject(){
//   console.log("test");
// }

export default function Projects() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const intervalRef = useRef(null);
  const [title, setTitle] = React.useState(false);
  const [titleEng, setTitleEng] = React.useState(false);


  const createProject = () => {
    console.log(title);
    console.log(titleEng);
      // axios.post('http://localhost:8080/register', {
      //     username: this.state.username,
      //     password: this.state.password,
      // }, { withCredentials: true })
      // .then(function (response) {
      //   console.log(response.data);
      // })
      // .catch(function (error) {
      //   console.log(error);
      //   console.log("bad request");
      // })
      // .finally(function () {
      // });
  }

  const createProjectBtn = () => {
    handleClick();
    createProject();
    let times = 0;
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      console.log(times);
      times++;
      if (times == 3) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setOpen(false);
      }
    }, 1000);

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleClick() {
    setLoading(true);
  }
  

  return (
    <div>
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新しいプロジェクトを作成する</DialogTitle>
        <DialogContent>
          <DialogContentText>
            タイトル(編集可)を入力してプロジェクトを作成してください。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            アルファベットのプロジェクト名(編集不可)を入力してください。URLの一部になります。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Project Name -no space-"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setTitleEng(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={createProjectBtn}>作成</Button>
          <LoadingButton
            onClick={createProjectBtn}
            loading={loading}
            variant="outlined"
          >
            作成する
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
    </div>
  );
}