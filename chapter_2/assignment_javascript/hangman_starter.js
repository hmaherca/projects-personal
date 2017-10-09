const readlineSync = require('readline-sync');

// this array holds all the possible words that can be the answer
// feel free to change the words here to words you find interesting! :)

let words = [
	'hey',
	'person',
	'you',
	'think',
	'youre',
	'better',
	'than',
	'me'
];

let answer; 
let nWrong; 
let pastGuesses = ['l',];
let pastGames = [{nWrong},{pastGuesses}];
let cont = true;
let correctGuesses = []

function Game(nWrong,pastGuesses){
    this.pastGuesses = pastGuesses;
    this.nWrong = nWrong;
}




/*
PART 1

Write the pseudocode that represents your game logic here.
# evalute the letter the player entered
# store that letter in pastGuesses array
# if that letter has already been guessed, dont store it and inform player
# we need to add to the the nWrong counter to keep track of how many guesses the player has left
# make a loop for answer array and compare each guess with each index of that array
# if the guess does not match any of the indexes increment the counter by 1 
# make an if statement that ends the game if the nWrong counter reaches 6 or greater
# make another array with a counter to keep track of correct guesses
# make a for loop that goes through the the answer array and another for loop within it going through pastGuesses
# compare each letter from the answer array through the entire pastGuesses array anytime there is a match increase the correct match counter by 1
# once the loop is done, check if the correct match counter has the same value as the total number of indexes in the answer array.
# if the counter and answer array match the player win and end the game.

*/

function startGame() {
	setUpGame();
	while (!checkGameOver()) {
		printGameState();
		const guess = readlineSync.question("please enter a guess: ");
		console.log('guess is', guess);
		/*
			PART 2

			Write the logic that will check whether or not the guess the user entered
			was valid here.


		*/

		if(pastGuesses.length===0){
			pastGuesses.push(guess)
		}
		if(guess.length != 1 || !isNaN(guess)){
			console.log('please enter a valid single character')
		}
		console.log(guess);
		console.log(pastGuesses.length);
		console.log('your past guesses', pastGuesses);
		var alreadyGuessed = false
		console.log('WORKING UP TO HERE')
		for(let i = 0; i < pastGuesses.length; i++){
			if (pastGuesses[i] === guess){
				alreadyGuessed = true
				console.log('already guessed')
			}
			else if(i===pastGuesses.length-1 && !alreadyGuessed){
				console.log('we are pushing')
				pastGuesses.push(guess)
			}

			}
			guessMatch=false
			for (let i = 0; i < answer.length; i++){
				if (guess === answer[i]){
						guessMatch =  true
					}
					else if(i == answer.length-1 && !guessMatch){
						nWrong = nWrong +1
					}
				
			}
			
		}
	
			
		
			



	//printGameState();

	/*
		PART 3	

		Log whether or not the game was won or lost here!

	*/
	
		
}

function checkGameOver(){
	// WRITE CODE FOR PART 3 BELOW
	// var answerArray = [];
	// for (var i = 0; i < answer.length; i++) {
	// answerArray[i] = "_";
	// }

	// for (var i = 0; i <	answer.length; i++)
	// if(answer[i] === guess){
		
	
	// }
	if(nWrong >= 6){
		console.log ('sorry you lost');
		return true
		let pastGameRecord = new Game(nWrong, pastGuesses);

	}
	
	let letterMatch=0
	for(let i=0; i<answer.length; i++){
		for(let j=0; j<pastGuesses.length; j++){
			if(answer[i] === pastGuesses[j]){
				letterMatch++
			}
			
		}
		
	}
	if(letterMatch===answer.length){
		console.log('you win');
		return true

		let pastGameRecord = new Game(nWrong, pastGuesses)

	}
	
	


	
	
		
}


function printGameState(){
	//Add a console.log here to print the previous guesses.
	// console.log(alreadyGuessed)
	console.log('\n');
	let str = "";
	
	// for each letter in the target word
	for(let i = 0; i < answer.length; i++){
		let found = false;
		// loop through the pastGuesses
		for(let j = 0; j < pastGuesses.length; j++){
			// and check each element of past guesses to see if it matches the
			if(answer[i] === pastGuesses[j]){
				found = true;
			}
		}
		if(found){
			str += answer[i];
			str += "\t";
		}
		else{
			str += "_\t";
		}
	}
	console.log(str);
		
	console.log('\n');
	printHangMan(nWrong);	
	console.log('\n\n');
}

/* 
 =========================================================================================
 	Below are functions that may help with your logic, but do not need any modification
 =========================================================================================
*/

function getRandomWord(){
	const index = Math.floor(Math.random()*words.length);
	return words[index];
}

function printHangMan(nWrong){
	//Don't worry about the syntax you see here.  The ? operator is a succinct way to write an
	//if statement that has two results. Think of it as:
	// statement_that_is_true_or_false ? happens_if_true : (OR) happens_if_false 
	const headSpot = (nWrong > 0) ? "O" : " ";
	const bodySpot = (nWrong > 1) ? "|" : " ";
	const leftArm = (nWrong > 2) ? "/": " ";
	const rightArm = (nWrong > 3) ? "\\" : " ";
	const leftLeg = (nWrong > 4) ? "/" : " ";
	const rightLeg = (nWrong > 5) ? "\\" : " ";
	
	let str = "";
	console.log(" ___ ");
	console.log(" |  | ");
	console.log(" |  " +  headSpot + " ");
	console.log(" | " + leftArm + bodySpot + rightArm);
	console.log(" | " + leftLeg + " " + rightLeg);
	return;
}

function setUpGame(){
	// choose a new word
	answer = getRandomWord().split('');
	// reset the total of wrong guesses
	nWrong = 0;
	// empty our array of previously guessed letters
	pastGuesses = []; 
}

startGame()

while(cont){
	let answer = readlineSync.question('Would you like to play again? y/n')
	if(answer.toLowerCase() === 'y'){
		startGame();
	}
	else if(answer.toLowerCase() === 'n'){
		cont = false;
		console.log('Good game!')
	}
	else {
		console.log('Please enter either y (yes) or n (no).')
	}
}
