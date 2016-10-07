//JavaScript restaurant
//use the generateMenu() function to get a menu object when you need it

// This is a test order. It should take 8 seconds and should cost $65.
// You can also test your restaurant functions with other menu items.
order('Lobster','Wild Rice','Wine','Steak','Burger','Beer','Chicken');


// WRITE YOUR CODE BELOW
// Order Function
function order (...args){
    // This function uses the ES6 spread operator to take in all arguments as an array named args.
    // You could do something similar using the arguments object with the line of code below:
    // let args = Array.prototype.slice.call(arguments);
    // OR
    // let args = [...arguments];
    console.log(`Your order: ${args}`);

    // get menu
    let menu = generateMenu();
    
    // loop through each item ordered by the user
    for(let i = 0; i < args.length; i++){
        // this 'found'' variable will be created for each ordered item and starts as false
        let found = false;

        //for each ordered item, loop through the menu and try to find it
        for(let j = 0; j < menu.length; j++){
            // if item is found, change found to true;
            if(args[i] === menu[j].name){
                found = true;
            }
        }

        //if the loop completes and found is still false, then that means the item was not found in the menu
        if (!found){
            console.log(`${args[i]} is not on the menu!`);
            return; //exits function as soon as one item is not found
        } 
    }
    console.log('Your order is on the menu!')
    cook(args);
}

// Cook Function
function cook (args){
    //The serve function has already converted the user's ordered items into an array, so no need to do it again
    let prepTime = 0;
    let menu = generateMenu();

    // Here we use the Array.forEach() method to shorten writing out the for loop.
    // See below for the same logic done using plain for loops
    args.forEach((item) => {
        menu.forEach((menuItem) => {
            if(menuItem.name === item){
                prepTime += menuItem.time;
            }
        })
    })

    // Using for loops:
    // for(let i = 0; i < args.length; i++){
    //     for(let j = 0; j < menu.length; j++){
    //         if(args[i] === menu[j].name){
    //             prepTime += menu[i].time;
    //         }
    //     }
    // }

    console.log('The chef is preparing your food.')
    console.log(`It will take ${prepTime} seconds.`)

    // setTimeout function that will wait to simulate cooking
    // delay is prepTime * 1000 because setTimeout expects time in milliseconds
    setTimeout(() => {
        serve(args);
    }, prepTime * 1000)

}

// Serve Function
function serve (args){
    console.log('Your meal is ready! Enjoy!')
    let menu = generateMenu();
    let totalPrice = 0;

    // loops that calculate total price of meal
    args.forEach((item) => {
        menu.forEach((menuItem) => {
            if(menuItem.name === item){
                totalPrice += menuItem.price;
            }
        })
    })

    console.log(`The bill is $${totalPrice}.`)
}


// function that returns a menu array, no need to modify this function
function generateMenu (){
    return [{
        name:'Steak',
        time:5,
        price:40
    },{
        name:'Burger',
        time:4,
        price:15
    },{
        name:'Shawarma',
        time:4,
        price:20
    },{
        name:'Pizza',
        time:3,
        price:10
    },{
        name:'Sushi',
        time:3,
        price:15
    },{
        name:'Lobster',
        time:5,
        price:50
    },{
        name:'Carpaccio',
        time:5,
        price:25
    },{
        name:'Chicken',
        time:4,
        price:10
    },{
        name:'Wild Rice',
        time:2,
        price:5
    },{
        name:'Fries',
        time:1,
        price:5
    },{
        name:'Baked Potato',
        time:1,
        price:5
    },{
        name:'Salad',
        time:1,
        price:5
    },{
        name:'Coffee',
        time:1,
        price:0
    },{
        name:'Tea',
        time:1,
        price:0
    },{
        name:'Pop',
        time:1,
        price:0
    },{
        name:'Beer',
        time:1,
        price:5
    },{
        name:'Wine',
        time:1,
        price:10
    }]
}