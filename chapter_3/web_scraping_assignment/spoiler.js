const cheerio = require ('cheerio'),
      request = require ('request');



let movie = [];
let seconds = [];
let API = ['46b2502c5bbf9676b203d2ec4c8066e2'];
//whatever is not a number push it into the movie array
// whatever is a number push it into the seconds array
// this will define the movie title and the number of seconds for the spoiler
for (i=2; i < process.argv.length; i++){
    if(isNaN(process.argv[i])){
        movie.push(process.argv[i]);

    }
    else if(!isNaN(process.argv[i])){
        parseInt(process.argv[i]);
        seconds.push(process.argv[i]);

    }
}

console.log("**SPOILER WARNING** about to spoil " + movie + " in " + seconds + " seconds");

//TMDB SPOILER FOR MOVIE

request('https://api.themoviedb.org/3/search/movie?api_key='+API+'&query=' + movie, +"film", function (error, response, body) {
    if(error){
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    }

    else if(!error){
    //parse the body of the results so we can access it as an object
    // load the body that is an object now
    let tmdb= JSON.parse(body);
    const $ = cheerio.load(body);
    //timer to display spoiler
    setTimeout(function(){
        console.log('SPOILER ' + tmdb.results[0].overview)
    }, seconds*1000);
    }
 });


// google results of movie name

let pages = [];
request('https://www.google.ca/search?q=' + movie, function (error, response, body) {
if (!error){
    const $ =cheerio.load(body);
    let googleTitles = $(".r a");

    googleTitles.each(function(i,element){
        let page =$(element).text();
        pages.push(page);
        console.log(page)
    })

}
})


