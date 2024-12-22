import { ProgressBar } from "./ProgressBar";
import React,{ useState, useEffect } from 'react';
import ProfileIcon from './ProfileIcon'

function App(){
    return <div className="App">Progress</div>;
}

export default App;

const express = require('express')
const bcrypt = require('bcrypt')
var cors = require('cors')
const jwt = require('jsonwebtoken')
var low = require ('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('./database.json')
var db = low(adapter)

//Initialize Express app
const app = express()

//Define a JWT secret key. This should be isolated by using env variables for security.
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg'

//Set up CORS and JSON middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Dynamic Navbar 

import { useState } from "react";
import { generateId } from "./util/generate";
import { useState } from "react";

function App() {
    const defaultVal = [
        {
            id: generateId(),
            title:"First Menu",
            content:"This is content 1"
        },
        {
            id: generateId(),
            title:"Second Menu",
            content:"This is content 2"
        },
        {
            id: generateId(),
            title:"Three Menu",
            content:"This is content 3"
        },
    ]
}
const [menu, setMenu] = useState(defaultVal)

//Clickable profile icon
const App = () => {
    const [user, setUser] = useState(null);

    useEffect (() => {
    //Replace this with actual authentication logic
    const loggedInUser = {
        username: 'John_Doe',
        profilePicture: ''
    };
    setUser(loggedInUser);
}, []);

return (
    <div className="app">
        <header>
            <ProfileIcon user={user}/>
        </header>
        {/*Rest of platform*/}
    </div>
)

export default App;