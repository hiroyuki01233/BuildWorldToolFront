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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { teal } from "@mui/material/colors";
import React, { useState, useEffect, Component } from 'react'
import axios from 'axios';
import { Outlet, Navigate, useNavigate } from "react-router-dom";

// let textInput = React.createRef();

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';
axios.defaults.withCredentials = true;
// axios.defaults.headers.withCredentials = true;

export default function Register() {
    const [username, setUsername] = React.useState(false);
    const [password, setPassword] = React.useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
    }, []);
  
    const registerClicked = () => {
        console.log(username);
        console.log(password);
        axios.post('http://localhost:8080/register', {
            name: username,
            password: password,
        })
        .then(function (response) {
          console.log(response.data);
          navigate("/projects");
        })
        .catch(function (error) {
          console.log(error);
          console.log("bad request");
        })
        .finally(function () {
        });
    }

    return (
        <Grid>
        <Paper
            elevation={3}
            sx={{
            p: 4,
            height: "70vh",
            width: "280px",
            m: "20px auto"
            }}
        >
            <Grid
            container
            direction="column"
            justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
            alignItems="center"
            >
            <Avatar sx={{ bgcolor: teal[400] }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant={"h5"} sx={{ m: "30px" }}>
            Register
            </Typography>
            </Grid>
            <TextField label="Username" variant="standard" fullWidth required onChange={e => setUsername(e.target.value)} />
            <TextField
            type="password"
            label="Password"
            variant="standard"
            fullWidth
            required
            onChange={e => setPassword(e.target.value)}
            />
            {/* ラベルとチェックボックス */}
            <Box mt={3}>
            <Button type="button" color="primary" variant="contained" fullWidth id="test" onClick={registerClicked}>
                登録
            </Button>

            <Typography variant="caption" display="block" sx={{ m: "20px" }}>
                アカウントを持っていますか？
                <Link href="login">ログイン</Link>
            </Typography>
            </Box>
        </Paper>
        </Grid>
    );

};
