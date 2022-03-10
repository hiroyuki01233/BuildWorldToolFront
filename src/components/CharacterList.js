import { Outlet, Navigate, useNavigate, useLocation, useOutletContext } from "react-router-dom";
import {
  Avatar,
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
  CardActions,
  Box
} from "@mui/material";
// import React, { useState, useEffect, Component } from 'react'
import React, { useState, useEffect, Component, useRef } from 'react'
import axios from 'axios';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';
axios.defaults.withCredentials = true;

export default function CharacterList() {
  const [projectData, setProjectData] = useOutletContext();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const intervalRef = useRef(null);
  const [name, setName] = React.useState(false);
  const [fullName, setFullName] = React.useState(false);
  const [userData,setUserData]=useState([])
  let successFlg = false;
  let responseData = null;
  let responseCharaData = null;
  

  useEffect(() => {
    console.log("this is character list");
  }, []);


  const createChara = () => {
    axios.post('http://localhost:8080/restricted/character', {
        "projectId": String(projectData.Id),
        "name": name,
        "fullName": fullName,
    })
    .then(function (response) {
      successFlg = true;
      let pdata = projectData;
      pdata.characters.push(response.data);
      pdata.characterFlg = true;
      pdata.selectChara = response.data.name;
      setProjectData(pdata);
      responseCharaData = response.data;
    })
    .catch(function (error) {
      console.log(error);
      console.log("bad request");
    })
    .finally(function () {
    });
}

  const createCharaBtn = () => {
    handleClick();
    createChara();
    let times = 0;
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      times++;
      if (times == 2) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setOpen(false);
        if(successFlg){
          navigate("/project/"+projectData.UserName+"/"+projectData.Name+"/character/"+responseCharaData.full_name);
        } else{
          navigate("/");
        }
      }
    }, 1000);

  }


  const clickedChara = (characterName) => {
    let pdata = projectData;
    pdata.characterFlg = true;
    pdata.selectChara = characterName;
    setProjectData(pdata);
    navigate("/project/"+projectData.UserName+"/"+projectData.Name+"/character/"+characterName);
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



  if (projectData.characters){
    return (
      <div>
        <Box>
        <Button variant="outlined" onClick={handleClickOpen}>
        新規キャラクター
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>新しいキャラクターを作成する</DialogTitle>
          <DialogContent>
            <DialogContentText>
              名前(編集可)を入力してキャラクターを作成してください。
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="text"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => setName(event.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              アルファベットのキャラクター名(編集不可)を入力してください。URLの一部になります。
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="text"
              label="Character Name -no space-"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => setFullName(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <LoadingButton
              onClick={createCharaBtn}
              loading={loading}
              variant="outlined"
            >
              作成する
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Box>

        <>
          {projectData.characters.map((data,id)=>{
            return (
            <div key={id}>
              {/* <Link href={"character/"+data.name}> */}
                <Card sx={{ maxWidth: 1000 }} onClick={() => clickedChara(data.full_name)}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://images.pexels.com/photos/8589272/pexels-photo-8589272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        alt="shumbnail"
                        to="/tset"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {data.name} {data.full_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {data.subTitle}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                </Card>
              {/* </Link> */}
            </div>
            )
          })}
        </>
      </div>
    )
  } else{
    return (<div></div>)
  }
}