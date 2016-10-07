//Array of people, there is no need to change this
const PERSONDATA = [{
    name:"Michael",
    rank:4,
    age:19,
    score: 66
},{
    name:"Emily",
    rank:7,
    age:22,
    score: 37
},{
    name:"Sam",
    rank:2,
    age:23,
    score:80
},{
    name:"William",
    rank:10,
    age:26,
    score:11
},{
    name:"James",
    rank:8,
    age:26,
    score:28
},{
    name:"Mia",
    rank:5,
    age:28,
    score:54
},{
    name:"Isabella",
    rank:1,
    age:31,
    score:100
},{
    name:"Alex",
    rank:3,
    age:34,
    score:75
},{
    name:"Olivia",
    rank:6,
    age:36,
    score:42
},{
    name:"Geoff",
    rank:9,
    age:41,
    score:19
}]

search("James",PERSONDATA)  // Should log that James was found at position #5
search("Eric",PERSONDATA)   // Should log that Eric was not found.

console.log('People who scored over 50:')
console.log(filter(PERSONDATA, 50)) // Should display an array of everyone with a score greater than 50

// DIVING DEEPER
const sortedArr = bubbleSortRank(PERSONDATA);
console.log('Sorted by Rank:');
console.log(sortedArr);
console.log('Sorted by Name:');
console.log(bubbleSort(sortedArr,'name'));
console.log('Sorted by Age:');
console.log(arraySort(sortedArr,'age'));
console.log('People who scored over 50:');
console.log(arrayFilter(PERSONDATA,'score',50));

// search function
function search (name, people){
    let index;
    for (let i = 0;i < people.length;i++){
        //convert names to lowercase so that search is case-insensitive
        if(people[i].name.toLowerCase() == name.toLowerCase()){
            index = i; //save position of person if their name matches
        }
    }
    //display results; if index remains undefined it means that the name was not found
    if(index){
        console.log(`${name} is in the list, at position #${index + 1}`)
    } else {
        console.log(`${name} is not in the list.`)
    }
    return index;
}

// filter function
function filter (people, num){
    let filterArr = []; // this array stores the people who have been filtered
    for(let i = 0; i < people.length; i++){
        if(people[i].score > num){
            filterArr.push(people[i]) // if they meet the criteria, push into array
        }
    }
    return filterArr; // return the filtered array
}

//DIVING DEEPER
//This sorting function uses the 'Bubble Sort' method, there are many other ways of sorting an array
function bubbleSortRank (people){
    let l = people.length;
    let swapped; //variable to track when sorting has been completed

    //this loop terminates when an iteration completes without any swaps being performed (meaning elements are in the correct order)
    do {
        swapped = false;
        for(let i = 1; i < l; i++){
            //compare each adjacent pair of people, swaps them if they are in the wrong order
            if(people[i].rank < people[i-1].rank){
                //store person in temporary variable while swapping
                let temp = people[i]; 
                people[i] = people[i-1];
                people[i-1] = temp;
                //flag that a swap has been performed in this iteration
                swapped = true; 
            }
        }
        //optimization: nth iteration will always place nth-largest element at the end, so only need to sort n-1 elements on next iteration
        //try logging the array after each loop to confirm this happens
        l--;
    } while (swapped === true)
    return people;
}

// sorting function modified to sort by any given property
function bubbleSort (people,property){
    let l = people.length;
    let swapped;

    do {
        swapped = false;
        for(let i = 1; i < l; i++){
            // notice that we use [property] notation here to allow for variable object keys
            if(people[i][property] < people[i-1][property]){
                let temp = people[i]; 
                people[i] = people[i-1];
                people[i-1] = temp;
                swapped = true; 
            }
        }
        l--;
    } while (swapped === true)
    return people;
}

// This is an example of a sorting function using the 'Insertion Sort' method
function insertionSort (originalArray, property){
    let array = originalArray.slice(); //make a copy of the original array so that this function doesn't modify the original array
    let newArray  = []; //this stores the sorted array

    //repeat while the original array still has elements inside
    while(array[0]){
        // variables for tracking the maximum of the array
        let max = array[0][property];
        let maxIndex = 0;

        // this loop finds the element of the array with the highest property value
        array.forEach((elem, index) => {
            if(elem[property] > max){
                max = elem[property];
                maxIndex = index; 
            }
        })

        // the maximum element is pushed into the new array, and is removed from the original
        newArray.push(array[maxIndex])
        array.splice(maxIndex,1)
    }
    // when original array is empty (so all elements have been sorted), return sorted array
    return newArray;
}


// Using array methods instead of loops:
// Now that you understand the logic behind sorting and filtering, 
// We can look at JavaScript's built-in methods for sorting and filtering arrays.

// sort function done using Array.sort();
function arraySort(array, property){
    array.sort(function(prev, next){
        return prev[property] > next[property];
    })
    return array;
}

// filter function done using Array.filter();
function arrayFilter(array, property, num){
    let filteredArray = array.filter(function(element, index){
        return element[property] >= num;
    })
    return filteredArray;
}