// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
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
    console.log(server);
    console.log(`running on localhost: ${port}`);
  };

/* // ROUTES!
app.get('/apidata',(req,res)=>{
    res.send(projectData);
});

// POST route adds data to ProjectData
app.post('/apidata', function (request, response) {
    newEntry = {
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse
    };

    projectData.unshift(newEntry);
}); */
// GET Route to retrieve projectData
app.get('/apidata', (req, res) => {
    res.status(200).send(projectData)
  })
  
  // POST Route to store date, temp and user input in projectData
  app.post('/apidata', (req, res) => {
    const {date, temp, content} = req.body
    projectData[date] = {
      temp,
      content,
    }
    res.status(201).send()
  });
console.log(projectData);