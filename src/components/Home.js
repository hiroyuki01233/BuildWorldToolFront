import { Outlet } from "react-router-dom";
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
import React, { useState, useEffect, Component } from 'react'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: ""};
    this.testBtnClicked = this.testBtnClicked.bind(this);
  }

testBtnClicked() {
    console.log("test");
    axios.get('http://localhost:8080/restricted/user',{ withCredentials: true })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
      console.log("bad request");
    })
    .finally(function () {
    });
}
render() {
    return (
      <Grid>
        <Outlet />
      </Grid>
    );
  };
}

export default Home;