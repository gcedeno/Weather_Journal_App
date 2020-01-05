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
    console.log("results data after destructuring:\n ", result); */
    //result["main"]["temp"] //Getting the temp value
    return result["main"]["temp"]
  } catch (e) {
    throw e
  }
};

// POST Request to store date, temp and user input
const saveData = async (path, data) => {
  try {
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (e) {
    throw e
  }
}

// Update UI dynamically
const updateUI = async (temperature, newDate, feelings) => {
  date.innerText = newDate
  temp.innerText = `${temperature} °C`
  content.innerText = feelings
}

// Event listener
button.addEventListener('click', () => {
  //Fetching data and updating the UI
  fetchWeather(baseURL, zip.value, apikey)
    .then(temp => {
      return {date: newDate, temp, content: feelings.value}
    })
    .then(data => {
      saveData('/apidata', data)
      return data
    })
    .then(({temp, date, content}) => updateUI(temp, date, content))
    .catch(e => {
      // There can be proper error handling with UI
      console.error(e)
    })
});
