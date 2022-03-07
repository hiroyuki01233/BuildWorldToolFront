import { VFC } from 'react';
import Projects from "./components/Projects"
import Project from "./components/Project"
import CharacterList from "./components/CharacterList"
import Character from "./components/Character"
import Chronology from "./components/Chronology"
import UserList from "./components/UserList"
import axios from 'axios';
import React, { useState, useEffect, Component } from 'react'

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";

class AuthenticatedRoute extends Component {
    render(){
        return (
            <Routes>
                    <Route path="/projects" element={<Projects />}/>
                    <Route path="/user" element={<Projects />}/>
                    
                    <Route exact path="/project/:projectName" element={<Project />}>
                        <Route path="users" element={<UserList />}/>
                        <Route path="characters" element={<CharacterList />}/>
                        <Route path="character/:characterName" element={<Character />}/>
                        <Route path="chronology" element={<Chronology />}/>
                    </Route>
            </Routes>
        );
    };
};

export default AuthenticatedRoute;