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

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const drawerWidth = 240;

export default function Chronology(props) {  
  const navigate = useNavigate();
  const sampleLocation = useLocation();
  const urlSplit = sampleLocation.pathname.split('/');
  const adminName = urlSplit[2];
  const projectName = urlSplit[3];
  const [projectData, setProjectData] = React.useState(false);

  useEffect(() => {
    let testList = {"test":"unko"};
    console.log(testList["test"]);
    console.log(sampleLocation);

    axios.get('http://localhost:8080/restricted/project',{
      params: {
        adminName: adminName,
        projectName: projectName,
      }
    })
    .then(function (response) {
      console.log(response.data);
      console.log("accessed!");
      setProjectData(response.data)
    })
    .catch(function (error) {
      console.log(error);
      console.log("bad request");
    })
    .finally(function () {
    });

  }, []);

  const clicked = (text) => {
    let sidebarList = {'メイン':"", 'キャラクター':"characters", 'アイディア':"idea", '年表':"chronology"}
    if (text == "他のプロジェクト"){
      navigate("/projects")
    } else{
      navigate("/project/"+adminName+"/"+projectName+"/"+sidebarList[text])
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
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Typography paragraph>
            {projectData.Chronology}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}