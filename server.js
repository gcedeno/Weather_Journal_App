// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
/* Dependencies */
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 8000;
// Spin up the server
const server = app.listen(port, listening);
 function listening(){
    //console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// ROUTES!
// GET Route to retrieve projectData
//Respond with JS object when a GET request is made to the homepage
app.get('/apidata', (req, res) => {
    /*console.log(req)//information from a GET request */
    res.send(projectData)
  });
  
  // POST Route to store date, temp and user input in projectData
 /*  app.post('/apidata', (req, res) => {
    const {date, temp, content} = req.body
    projectData[date] = {
      temp,
      content,
    }
    res.send()
  }); */
app.post('/apidata', (req, res) => {
    projectData = req.body //Structure of the req.body created in app.js (line74)
    res.send()
  });

console.log("Initial Project Data when starting the server: ",projectData);
