import logo from './logo.svg';
import './App.css';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { styled } from '@mui/material/styles';
import React, { useState, useEffect, Component } from 'react'

import Home from "./components/Home"
import Projects from "./components/Projects"
import Project from "./components/Project"
import CharacterList from "./components/CharacterList"
import Character from "./components/Character"
import Chronology from "./components/Chronology"
import Login from "./components/Login"
import Register from "./components/Register"
import UserList from "./components/UserList"
import Idea from "./components/Idea"
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080';

let loggedIn = false;

class App extends Component {
  render() {
      return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route path="/projects" element={<Projects />}/>
            <Route path="/user" element={<Projects />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
          </Route>
          <Route exact path="/project/:username/:projectName" element={<Project />}>
            <Route path="users" element={<Project />}/>
            <Route path="characters" element={<Project />}/>
            <Route path="character/:characterName" element={<Project />}/>
            <Route path="chronology" element={<Project />}/>
            <Route path="idea" element={<Project />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      );
    };
}

export default App;
