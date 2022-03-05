import logo from './logo.svg';
import './App.css';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { styled } from '@mui/material/styles';

import Home from "./components/Home"
import Projects from "./components/Projects"
import Project from "./components/Project"
import CharacterList from "./components/CharacterList"
import Character from "./components/Character"
import Chronology from "./components/Chronology"
import Login from "./components/Login"
import Register from "./components/Register"
import UserList from "./components/UserList"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path="/projects" element={<Projects />}/>
        <Route path="/user" element={<Projects />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>

        <Route exact path="/project/:projectName" element={<Project />}>
          <Route path="users" element={<UserList />}/>
          <Route path="characters" element={<CharacterList />}/>
          <Route path="character/:characterName" element={<Character />}/>
          <Route path="chronology" element={<Chronology />}/>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
