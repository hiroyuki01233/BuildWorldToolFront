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


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';
axios.defaults.withCredentials = true;

export default function Project() {  
  useEffect(() => {
    
  }, []);



  return (
    <div>
      <h1>test</h1>
    </div>
  );
}