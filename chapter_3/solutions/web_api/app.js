const https = require('https');

const API_KEY = "0dfcaf4a385d134eac4db7c957e859dc"
//note the query string at the end of the url to change to SI units
const url = "https://api.darksky.net/forecast/" + API_KEY +"/43.700,-79.5667?units=si"

//using the https module to make a GET request
https.get(url,(res) => {
    //this string stores data as it comes back in the response
    let body = "";

    //every time a chunk of data is received, add it to the body string
    res.on('data',(chunk) => {
        body += chunk;
    });

    //once the response 'end' event is triggered, then we can parse the response body string
    res.on('end',() => {
        var parsed = JSON.parse(body);
        console.log(`Current Weather in ${parsed.timezone}:`);
        console.log(`Temperature: ${parsed.currently.temperature} degrees Celsius`);
        console.log(`Summary: ${parsed.currently.summary}`);    
    });
})