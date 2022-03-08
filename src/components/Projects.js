import { Outlet, Navigate, useNavigate } from "react-router-dom";
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
  Typography,
  CardActionArea,
  CardActions
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

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';
axios.defaults.withCredentials = true;

function renderRow(props) {
  const { index, style } = props;

  // axios.get('http://localhost:8080/restricted/projects')
  // .then(function (response) {
  // })
  // .catch(function (error) {
  //   console.log(error);
  //   console.log("bad request");
  // })
  // .finally(function () {
  // });

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
    );
    
}

// function projectsDom(props){
//   return (
//     <ListItem>
//       <ListItemButton>
//         <ListItemText primary={`unko`} />
//       </ListItemButton>
//     </ListItem>
//     );

// }



export default function Projects() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const intervalRef = useRef(null);
  const [title, setTitle] = React.useState(false);
  const [name, setName] = React.useState(false);
  const [userData,setUserData]=useState([])

  let successFlg = false;
  let responseData = null;
  
  useEffect(() => {
    axios.get('http://localhost:8080/restricted/projects')
    .then(function (response) {
      setUserData(response.data)
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
      console.log("bad request");
    })
    .finally(function () {
    });

    
  }, []);


  const createProject = () => {
      axios.post('http://localhost:8080/restricted/project', {
          title: title,
          name: name,
      })
      .then(function (response) {
        successFlg = true;
        responseData = response.data;
      })
      .catch(function (error) {
        console.log(error);
        console.log("bad request");
      })
      .finally(function () {
      });
  }
  const navigate = useNavigate();

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
      if (times == 2) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setOpen(false);
        if(successFlg){
          navigate("/project/"+responseData.adminName+"/"+responseData.projectName);
        } else{
          navigate("/");
        }
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

  if (userData){
    return (
      <div>
        <>
          {userData.map((data,id)=>{
            return (
            <div key={id}>
              <Card sx={{ maxWidth: 1000 }}>
                  <CardActionArea>
                    <Link href={"/project/"+data["admin_name"]+"/"+data.name}>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://images.pexels.com/photos/8589272/pexels-photo-8589272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        alt="shumbnail"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {data.name} {data.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {data.detail}
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
              </Card>
            </div>
            )
          })}
        </>
  
      <Box>
        <Button variant="outlined" onClick={handleClickOpen}>
        新規プロジェクト
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
              onChange={(event) => setName(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
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
  } else {
  return (
    <div>
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        新規プロジェクト
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
            onChange={(event) => setName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
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
}