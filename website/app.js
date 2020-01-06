/* Global Variables */
// HTML element to listen for click events
const button = document.getElementById('generate')

// HTML elements to get the values
const zip = document.getElementById('zip')
const feelings = document.getElementById('feelings')

// HTML elements to update dynamically
const date = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')

// OpenWeatherApi configuration

const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const apikey = 'a080769c9f130da7b30fd909b8360468'

// Create a new date instance dynamically with JS
let d = new Date()
// day/month/year format(Note:Open Weather API starts counting months from 0)
let newDate = d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear()

// Fetch Weather Data from OpenWeatherApi
const fetchWeather = async (baseURL, zip, apiKey) => {
  try {
    const request = await fetch(
      `${baseURL}?zip=${zip},us&units=metric&APPID=${apiKey}`,
    )
    const result = await request.json();
    //Showing the fetched data from openweather-api
    console.log("original fetched data:\n ", result);
    // destructuring of the result object into interesting parameters
    // idea taken from: https://stackoverflow.com/questions/42475681/using-openweather-json-api-how-to-fetch-the-temperature
    /* const {
      main: {temp,pressure,humidity},
      name
    } = result
    */
    //result["main"]["temp"] //Getting the temp value
    return result
  } catch (e) {
    throw e
  }
};

// POST Request to store date, temp and user input
  const saveData = async (url = '',data = {})=>{
  try{
    console.log("Saving data:",data);
    const response = await fetch(url, {
    //await fetch(path, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), //body type must match "Content-Type" header
    });
  } catch (e) {
    throw e
  };
};
// Update UI dynamically
/*Original code */
/* const updateUI = async (temperature, newDate, feelings) => {
  date.innerText = newDate
  temp.innerText = `${temperature} °C`
  content.innerText = feelings
} */
/*****New Modification to updated the UI from the GET Route *******/
const updateUI = async(url = '')=>{
  const request = await fetch(url);
  try{
    const Data = await request.json();
    console.log("Returned Data when running updateUI:",Data);
    document.getElementById('date').innerText = Data[0].date;
    document.getElementById('temp').innerText = `${Data[0].temp} °C`;
    document.getElementById('content').innerText = Data[0].content;
  } catch(error){
    console.log('error',error);
  };
};

// Event listener
// button.addEventListener('click', () => {
document.getElementById('generate').addEventListener('click',handleClick);
  //Fetching data and updating the UI when clicking on the button
function handleClick (event) {
  fetchWeather(baseURL, zip.value, apikey)
    .then(result => {
      //Using return data and retrieved data from the DOM elements to create the structure of the POST request
      /****Original code ****/
     // return {date: newDate, temp: result["main"]["temp"], content: feelings.value}
      saveData('/apidata', {date: newDate, temp: result["main"]["temp"], content: feelings.value});
      updateUI('/all')
    });
    /* .then(data => {
      saveData('/apidata', data)
      //return data
    })
    /****Original code ****
    .then(({temp, date, content}) => updateUI(temp, date, content))
    .catch(e => {
      // There can be proper error handling with UI
      console.error(e)
    }) 
    .then(updateUI('/all')); //Updating UI using the GET Route coded in server.js */
};
