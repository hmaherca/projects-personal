//This solution adds a few extra functions to the challenge.
//The first argument specifies the year to get movies from, while the 2nd argument is the letter to filter movie titles by.
//For example, to get the movies in 2016 that start with 'C', you would run this program like this:
//"node movies.js 2016 c"

const request = require('request');
const cheerio	= require('cheerio');
const args 	= process.argv.slice(2);

//if the user specifies a year, set year; default is 2015
let year = '2015';
if(args[0]){
  year = args[0];
}

//url is split before and after the page number so we can change the page # in our code
const url1 = "http://www.boxofficemojo.com/yearly/chart/?page=";
const url2 = "&view=releasedate&view2=domestic&yr=" + year + "&p=.htm";

let movieCount; // variable to store number of movies in a specified year
let pageCount = 0; // counter for tracking how many page requests have returned
let movieArray = []; // array for storing movies from all requests

getMaxPages(year);

//this function finds the number of movies in the specified year to calculate the number of page requests to make
function getMaxPages(year){
	request("http://www.boxofficemojo.com/yearly/", (error, response, body) => {
    	if(error){
    		console.log(error)
    	}
	    else {
	        const $ = cheerio.load(body);
	        //scrapes the number of movies released in the specified year
	        movieCount = Number($("table:nth-child(2) tr:contains("+year+") td:nth-child(6)").text());
	        console.log("Number of movies: " + movieCount);
	        
	        //calculate the number of pages needed to get all the movies in the year
	        const pages = Math.ceil(movieCount/100);
	        console.log("Number of pages: " + pages)
	        console.log("Scraping...")
	        //call getMovies function for each page
	        for(var i = 1; i <= pages; i++){
	        	getMovies(i,pages);
	        }
	    }
    });
}

function getMovies(page, max){
	//assemble the url using the provided page number and send the request
	request(url1 + page + url2, (err, response, body) => {
		if(err){
			console.log(err)
		}
		else{
			const $ = cheerio.load(body);
			const rows = $('table[cellpadding="5"] tr').not(':first-child').slice(0,-4); //remove first header row and summary rows from end
			
			//map() runs the given function for row in the array (and each row is a movie)
			rows.map((i,row) => {
				// get the rank, title and gross from each movie
				let rank = $(row).children('td:nth-child(1)').text();
				let title = $(row).children('td:nth-child(2)').text();
				let gross = $(row).children('td:nth-child(4)').text();
				/* Note: Here we're taking advantage of the rank property and inserting each movie into the array at the appropriate position.
				This means we don't have to worry about the list of movies being out of order, since the 200th movie will automatically be in the 200th spot in the array,
				regardless of when the response for that movie arrives.
				*/
				movieArray[Number(rank)] = { rank, title, gross };
			})

			pageCount++; // when a request has returned and has been process, increase the page counter;

			// when the number of completed requests is equal to the number of total pages requested
			if(pageCount === max){
				movieArray.splice(0,1) //since there's no movie with rank 0, remove the first item
				displayMovies();
			}
		}
	})
}

//function that displays the result of the web scraping
function displayMovies(){
	//if no filter is applied, default to movieArray
	let filteredArray = movieArray;
	let letter;

	//if the user specifies a letter to filter the movies with:
	if(args[1]){
		//if the argument is a single letter
		if(args[1].length == 1 && args[1].match(/[a-z0-9]/i)){
			letter = args[1].toUpperCase();
			const reg = new RegExp(`\^${letter}`,'i') //construct a regular expression using specified letter and add start boundary
			console.log("Showing only movies that start with the letter: " + letter)
			
			//use Array.filter() to remove movies that don't start with the correct letter
			filteredArray = movieArray.filter((movie) => {
				return movie.title.match(reg)
			})
		}
		else{
			console.log('This is not a valid letter.')
		}
	}

	//go through filteredArray and display each movie in order
	filteredArray.map((movie) => {
		console.log(`#${movie.rank}: ${movie.title} ${movie.gross}`);
	})

	//calculate the total gross
	// first, we use .map() to create a new array of just the grosses of the movies.
	// Then we just a .reduce() with a simple sum function to add up all the grosses.
	const totalGross = movieArray.map((movie) => {
		//replace any character that's not a digit (like $ or ,) so you can add the grosses
		return Number(movie.gross.replace(/\D/g,""));
	}).reduce((a,b) => {
		//adds all the grosses from the map operation
		return a+b;
	})

	console.log("Total Gross of Movies in " + year + ": $" + totalGross);
	console.log("Average Gross of Movies in " + year + ": $" + Math.ceil(totalGross/movieCount));

	//if the user specifies a letter to filter the movies with:
	if(args[1]){
		// calculate the total gross of filtered movies
		const filteredGross = filteredArray.map((movie) => {
			//replace any character that's not a digit (like $ or ,) so you can add the grosses
			return Number(movie.gross.replace(/\D/g,""));
		}).reduce((a,b) => {
			//adds all the grosses from the map operation
			return a+b;
		})

		console.log("Total Gross of Movies in " + year + " that start with " + letter + ": $" + filteredGross);
		console.log("Average Gross of Movies in " + year + " that start with " + letter + ": $" + Math.ceil(filteredGross/filteredArray.length));
	}
}