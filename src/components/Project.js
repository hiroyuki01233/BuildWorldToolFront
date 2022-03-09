import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
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
  Box,
  Switch
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
import CharacterList from "./CharacterList";

import Login from "./Login"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const drawerWidth = 240;


function test(){
  return (
    <p>test</p>
  )
}

export default function Project(props) {  
  const navigate = useNavigate();
  const nowLocation = useLocation();
  const urlSplit = nowLocation.pathname.split('/');
  const adminName = urlSplit[2];
  const projectName = urlSplit[3];
  const [projectData, setProjectData] = React.useState(false);
  const [textBox, setTextBox] = React.useState(false);
  const [isCharacterPage, setIsCharacterPage] = React.useState(false);
  let projectCharaData = [];
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const getCharactersData = (id) => {
    axios.get('http://localhost:8080/restricted/characters',{
      params: {
        projectId: id,
      }
    })
    .then(function (response) {
      console.log("this is getcharacter func")
      projectCharaData["characters"]=response.data;
      projectCharaData["characterFlg"]=false;
      projectCharaData["selectChara"]="";
      setProjectData(projectCharaData);
    })
    .catch(function (error) {
      console.log(error);
      console.log("bad request");
    })
    .finally(function () {
    });
  }

  useEffect(() => {
    console.log(urlSplit);
    setIsCharacterPage(false);
    let testList = {"test":"unko"};
    axios.get('http://localhost:8080/restricted/project',{
      params: {
        adminName: adminName,
        projectName: projectName,
      }
    })
    .then(function (response) {
      setProjectData(response.data);
      getCharactersData(response.data.Id);
      projectCharaData = response.data;
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
      console.log("bad request");
    })
    .finally(function () {
    });
  }, []);

  const clicked = (text) => {
    let sidebarList = {'メイン':"", 'キャラクター':"/characters", 'アイディア':"/idea", '年表':"/chronology"}
    let sidebarListForData = {'メイン':"MainText", 'アイディア':"Idea", '年表':"Chronology"}
    let sidebarChara = {'キャラ:メイン':"", 'キャラ:アイディア':"/idea", 'キャラ:年表':"/chronology"}
    if (text == "他のプロジェクト"){
      navigate("/projects")
    } else if (text in sidebarChara){
      navigate("character/"+projectData.selectChara+sidebarChara[text]);
    } else{
      let pdata = projectData;
      pdata.characterFlg = false;
      setProjectData(pdata);
      navigate("/project/"+adminName+"/"+projectName+sidebarList[text]);
    }
  }
  
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              {projectData.Title}
            </Typography>
            <Switch
              color="default"
              size="big"
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography variant="h6" noWrap component="div">
              編集する
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {['他のプロジェクト'].map((text, index) => (
                <ListItem button key={text} onClick={() => clicked(text)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['メイン', 'キャラクター', 'アイディア', '年表'].map((text, index) => (
                <ListItem button key={text} onClick={() => clicked(text)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            {projectData.characterFlg ? (<List>
              {['キャラ:メイン', 'キャラ:アイディア', 'キャラ:年表'].map((text, index) => (
                <ListItem button key={text} onClick={() => clicked(text)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>): (false)}
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
            <Grid>
            {urlSplit.length == 4 ? (
              <Box sx={{ width: '100%', maxWidth: 500 }}>
                {checked ? (
                  <div>
                    <TextField
                      id="standard-multiline-static"
                      label="編集中 メインテキスト"
                      multiline
                      rows={4}
                      defaultValue={projectData.MainText}
                      variant="standard"
                    />
                  </div>
                ): (
                  <Typography variant="body1" gutterBottom>
                    {projectData.MainText}
                  </Typography>
                )}
              </Box>
            ): (<Outlet context={[projectData, setProjectData]}/>)}
            </Grid>
        </Box>
      </Box>
    </div>
  );
}