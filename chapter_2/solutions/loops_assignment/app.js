const arr1 = [5,8,2,1,5,7,3,4,5,8,1,2,4,8,3,1,4,5]; // should log 8,2,4,8,2,4,8,4
const arr2 = [15,26,74,12,3,6,9,1,2,5]; // should log 26,74,12,6,2
const stringArr = ['The','Quick','Brown','Fox'];

//Ex 1
logEvens(arr1);
logEvens(arr2);
//Ex 2
findMax(arr1);
findMax(arr2);
//Ex 3
printNums(8);
//Ex 4
printTri(5);
//Ex 5 
printPyramid(6);
//Ex 6
printFrame(stringArr)

//Exercise 1
function logEvens (arr){
    let output = "";
    for(let i = 0;i < arr.length; i++){
        if(arr[i] % 2 === 0){
            output += arr[i] + ","
        }
    }
    output = output.slice(0,-1); //remove the last comma
    console.log(output) 
}

//Exercise 2
function findMax(arr){
    let max = arr[0]; //max starts with the value of first element in the array
    for(let i = 1; i < arr.length; i++){
        if(arr[i] > max){
            max = arr[i]; //gets new value if a greater value is found in the array
        }
    }
    console.log(max);

    //Bonus ES6 Shortcut for finding the max in one line!
    console.log(Math.max(...arr));
}

//Exercise 3
function printNums(num){
    let output = "";
    //loop over each number from 1 to num
    for(let i = 1; i <= num ; i++){
        //add each number that amount of times
        for(let j = 0; j < i; j++){
            output += `${i},`;
        }
    }
    //slice off the last comma
    output = output.slice(0,-1);
    console.log(output);
}

//Exercise 4
function printTri(num){
    let output = "";
    //loop over each number from 1 to num
    for(let i = 1; i <= num ; i++){
        //add each number that amount of times
        for(let j = 0; j < i; j++){
            output += i;
        }
        output += '\n';
    }
    console.log(output);
}

//DIVING DEEPER
//Exercise 5
function printPyramid(num){
    let output = "";
    for(let i = 1; i <= num; i++){
        //This loop adds the spaces to each row before the numbers start
        for(let j = 0; j < num - i; j++){
            output += " ";
        }
        //This loop adds the numbers that make up the pyramid
        for(let j = 0; j < i; j++){
            output += i + " ";
        }
        output += '\n'
    }
    console.log(output)
}

//Exercise 6
function printFrame(arr){
    let max = arr[0].length;
    //First, find length of longest word in array
    for(let i = 1; i < arr.length; i++){
        if(arr[i].length > max){
            max = arr[i].length;
        }
    }
    //Define height and width of frame based on max and array length
    const width = max + 4;
    const height = arr.length + 2;
    let output= "";
    //Use loop to create each row of the frame
    for(let i = 0; i < height; i++){
        //At the top and bottom, just print a row of asterisks
        if(i === 0 || i === height - 1){
            for(let j = 0; j < width; j++){
                output += '*';
            }
        } else {
            //add a word from the array
            output += `* ${arr[i-1]}`;
            //this loop adds extra spaces after shorter words to make the frame a nice rectangle
            for(let j = arr[i-1].length; j < max; j++){
                output += " ";
            }
            output += " *";
        }
        output += '\n';
    }
    console.log(output);
}