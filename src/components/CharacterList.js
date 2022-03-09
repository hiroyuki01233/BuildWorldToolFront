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

  useEffect(() => {
    console.log("this is project data and project ones");
  }, []);

  const clicked = (projectName) => {
    console.log("clicked chara");
    let pdata = projectData;
    pdata.characterFlg = true;
    pdata.selectChara = projectName;
    setProjectData(pdata);
    console.log(projectData);
    navigate("/project/"+projectData.UserName+"/"+projectData.Name+"/character/"+projectName);
  }

  if (projectData.characters){
    return (
      <div>
        <>
          {projectData.characters.map((data,id)=>{
            return (
            <div key={id}>
              {/* <Link href={"character/"+data.name}> */}
                <Card sx={{ maxWidth: 1000 }} onClick={() => clicked(data.name)}>
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
                        {data.name} {data.fullName}
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