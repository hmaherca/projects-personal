const fs = require('fs');

//default input file name
let fileName = 'pyramid.txt'
//gets the file name from user if they specify one
if(process.argv[2]){
	fileName = process.argv[2];
}

//create name for compressed image file based on input file name
var compName = fileName.slice(0,fileName.indexOf('.txt')) + '_comp.txt'

//read input file
fs.readFile(fileName, 'utf8', (err,data) => {
  	if (err) {
    	return console.log(err);
  	}
  	console.log('Input Data:')
  	console.log(data);

	console.log("Compressing " + fileName + ".");
	const compressedString = compress(data); //compress function compresses the file data and returns compressed string
	console.log('Compressed data:')
	console.log(comp)

	//write compressed data to file
	fs.writeFile(compName, compressedString, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved to "+ compName + "!");

	    //once saved, read compressed file and expand
	  	fs.readFile(compName, 'utf8', (err,data) => {
		  	if (err) {
		    	return console.log(err);
		  	}
		  	console.log("Expanding " + compName + ".")
		  	const expanded = expand(data) //expand function outputs 
		  	console.log("Expanded data:")
			console.log(expanded)
		});
	});
});

function compress(data){
	//variable to hold the compressed data
	let compressedData = "";

    //Split data string into an array of rows
    let rows = data.split('\n');
    //Loop over each row, this allows us to ignore newlines (since we won't be numbering those anyway)
    for(let i = 0; i < rows.length;i++){
        let count = 1; // counter variable to track how many times a given character repeats
        //Loop that moves along the characters in each row
        for(let j = 0; j < rows[i].length; j++){
            if(j === rows[i].length - 1){ //At the end of the row, add current count and character to result string
                compressedData += (count + rows[i][j]);
            } else if (rows[i][j] === rows[i][j+1]){ //If the next character is a repeat, simply increase the count
                count++;
            } else { //If the next character is different, add count and character to result string and restart count
                compressedData += count + rows[i][j]; 
                count = 1;
            }
        }
        compressedData += '\n'; //Add a newline character at the end of each row
    }

    //Alternate method of compressing using regular expressions and String.replace()
    //compressedData = data.replace(/(.)\1*/g, (str) => `${str.length}${str.charAt(0)}` )

	return compressedData;
}

function expand(data){
	//string that will store the expanded data
    let expandedData = '';
	//counter variable for number of character repeats
	let count = '';

	for(let i = 0; i < data.length;i++){
		if(data[i] == '\n'){ // if a newline character is read, simply add it to the expanded str
			expandedData += data[i];
		} 
		else if(data[i].match(/\d/)){ //if a number is found in the data, store the number in the counter variable
			//we take advantage of string concatenation here to simplify handling numbers with more than 1 digit.
			//since the data is a string, adding '4' + '1' = '41'.
			count += data[i];
		} 
		else{
			//when a character is read, repeat character 'count' number of times then reset counter
			//remember to parse count to number form to use in the for loop
			expandedData += data[i].repeat(Number(count)) //using the String.repeat() method;
			// for(let j = 0;j < Number(count);j++){ // can also be done with a simple for loop
			// 	exp += data[i];
			// }
			count = '';
		}
	}

    //Alternate method of decompressing using String.replace() and regular expressions
    // expandedData = data.replace(/\d+\D/g,(str) => {
    //     let num = parseInt(str.slice(0,-1));
    //     return str.charAt(str.length-1).repeat(num);
    // })

	return expandedData;
}