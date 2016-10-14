const request = require('request');
const cheerio = require('cheerio');

const urls = [
    'https://www.reddit.com/r/all',
    'https://www.reddit.com/r/all/?count=25&after=t3_57aftk',
    'https://www.reddit.com/r/all/?count=50&after=t3_579o56'
]

//loop through your array of urls and send a request for each one
for(let i = 0; i < 3; i++){
    requestPage(urls[i],i)
}

//This function handles sending requests and displaying the titles for each page
function requestPage(url, pageNum){
    request(url, (error, response, body) => {
        if(!error){
            //load body of response into cheerio
            const $ = cheerio.load(body);
            //use cheerio to create an object containing all the DOM elements that match our criteria of ('.title a.title')
            const titles = $('.title a.title');

            console.log(`Page ${pageNum + 1}:`);
            //Use cheerio's .each() method to loop through titles and display each one
            titles.each((index,title) => {
                console.log(`${25*pageNum+index+1}: ${$(title).text()}`);
            })
            console.log(`End of Page ${pageNum + 1}`)
        }
    })
}

// NOTE: this solution displays all the titles from the first 3 pages with the appropriate rank, but the 3 pages are not displayed in order.
// This is fine for what we expect for this assignment.
// Check out the solution for the diving deeper to see some examples of how to handle multiple asynchronous requests and display the results in order.