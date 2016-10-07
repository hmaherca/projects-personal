//JavaScript restaurant
//use the generateMenu() function to get a menu object when you need it

// This is a test order. It should take 8 seconds and should cost $65.
// You can also test your restaurant functions with other menu items.
order('Lobster','Wild Rice','Wine')

// WRITE YOUR CODE BELOW
// Order Function
function order (main,sides,drinks){
    //check if main, sides, and drinks are all defined
    //if more than 3 items are ordered, they are ignored for now
    if(main && sides && drinks){
        console.log(`You have ordered ${main}, with ${sides} and ${drinks}`)
        cook(main,sides,drinks)
    } else {
        console.log('You have not ordered 3 items!')
    }
}

// Cook Function
function cook (main, sides, drinks){
    let prepTime = 0;
    let menu = generateMenu();//get menu array from the generateMenu() function

    // loop through the menu and search for matches for any of the 3 parameters
    for(let i = 0; i < menu.length; i++){
        // if match is found, add their time to total prep time
        if(menu[i].name === main || menu[i].name === sides || menu[i].name === drinks){
            prepTime += menu[i].time;
        }
    }

    console.log('The chef is preparing your food.')
    console.log(`It will take ${prepTime} seconds.`)

    // setTimeout function that will wait to simulate cooking
    // delay is prepTime * 1000 because setTimeout expects time in milliseconds
    setTimeout(() => {
        serve(main, sides,drinks);
    }, prepTime * 1000)

}

// Serve Function
function serve (main, sides, drinks){
    console.log('Your meal is ready! Enjoy!')

    // get menu again from generateMenu();
    let menu = generateMenu();
    let totalPrice = 0;

    // just like in the cook function, loop through to find matches in menu
    for(let i = 0; i < menu.length; i++){
        if(menu[i].name === main || menu[i].name === sides || menu[i].name === drinks){
            totalPrice += menu[i].price; // this time, add price instead of time
        }
    }
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