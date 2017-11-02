'use strict';

//request lets you make http request to get list from firebase
const request = require('request');
//readline lets you get input from the console
const readline = require('readline');
const firebaseURL = /*'https://{firebase name here}.firebaseio.com/faculty.json'*/;

//define the menu variable using a string template
const menu = `Please enter one of the following numbers:
    1. Highest Overall Quality
    2. Highest Level Of Difficulty
    3. Lowest Overall Quality
    4. Lowest Level Of Difficulty
    5. Get Average Overall Quality
    6. Get Average Level of Difficulty
    7. Exit`

//sets up the input and output for readline library
const rl = readline.createInterface({
    input: process.stdin,
    ouput: process.stdout
});

//http GET request to firebase
request(firebaseURL, function(err, response, body){
    if(err)
        throw err;

    //the body is returned as a string, so we convert it to a JSON Object
    body = JSON.parse(body);

    //the body object was an object containing objects {{..}, {..}, ...} this converts it to
    //an array of objects [{..}, {..}, ...]
    var facultyList = Object.keys(body).map(key => {
                            return body[key];
                        });
    
    //Output the menu when program starts
    console.log(menu);

    //anytime some hits enter in the console run this callback function
    rl.on('line', function(input){
        //depending on what number they entered run these functions
        switch (input) {
            case '1':
                // uncomment printItem line when printItem function is implemented, and comment out console.log
                // printItem(overallQuality(facultyList, 'high'), 'Highest Overall Quality');
                console.log(overallQuality(facultyList, 'high'));
                break;
            case '2':
                // uncomment printItem line when printItem function is implemented, and comment out console.log
                // printItem(levelOfDifficulty(facultyList, 'high'), 'Highest Level Of Difficulty');
                console.log(levelOfDifficulty(facultyList, 'high'));
                break;
            case '3':
                // uncomment printItem line when printItem function is implemented, and comment out console.log
                // printItem(overallQuality(facultyList), 'Lowest Overall Quality');
                console.log(overallQuality(facultyList));
                break;
            case '4':
                // uncomment printItem line when printItem function is implemented, and comment out console.log
                // printItem(levelOfDifficulty(facultyList), 'Lowest Level Of Difficulty');
                console.log(levelOfQuality(facultyList));
                break;
            case '5':
                // uncomment printItem line when printItem function is implemented, and comment out console.log
                printItem(averageRatings(facultyList, 'quality'), 'Average Quality');
                // console.log(averageRatings(facultyList, 'quality'));
                break;
            case '6':
                // uncomment printItem line when printItem function is implemented, and comment out console.log
                // printItem(averageRatings(facultyList), 'Average Level of Difficulty');
                console.log(averageRatings(facultyList));
                break;
            case '7':
                rl.close();
        }
        
        //after executing the chosen command, print the menu again
        console.log(menu);
    });
});

/**
 * Print formatted object or number
 * @param {Object or Number} item 
 * @param {String} caption
 * Create an output variable and put the caption string in it first. 
 * Check the type of the item parameter, use typeof(item).
 * typeof(item) will === 'object' if it is an object, or === 'number' if it is a number.
 * If it is an object, loop through each of the properties, add them to the output variable and then add their values to the output variable.
 * Else if it is a number just add it to the output variable
 * Console.log(output);
 */
function printItem(item, caption) {

}

/**
 * Find highest or lowest overall quality
 * @param {Array of Objects} facultyList
 * @param {String} category
 * category defaults to 'low', but also handle the case where 'high' is entered.
 * if category === 'low', find the faculty with the lowest overall quality
 * else if category === 'high', find the faculty with the highest overall quality
 * You will probably use improved for loop ex. for(var faculty in facultyList)
 * Remember that faculty are objects, so to get their properties use faculty.overallQuality
 */
function overallQuality(facultyList, category = 'low') {
    console.log("hi");
}

/**
 * Find highest or lowest level of difficulty
 * @param {Array of Objects} facultyList
 * @param {String} category
 * category defaults to 'low', but also handle the case where 'high' is entered.
 * if category === 'low', find the faculty with the lowest level of difficulty
 * else if category === 'high', find the faculty with the highest level of difficulty
 * You will probably use improved for loop ex. for(var faculty in facultyList)
 * Remember that faculty are objects, so to get their properties use faculty.levelOfDifficulty
 */
function levelOfDifficulty(facultyList, category = 'low') {

}

/**
 * Find average difficulty or quality
 * @param {Array of Objects} facultyList
 * @param {String} category
 * category defaults to 'difficulty'
 * if category === 'difficulty' find the average level of difficulty of the faculty list
 * else if category === 'quality' find the average quality of the faculty list
 * You will probably use improved for loop ex. for(var faculty in facultyList)
 * Remember that faculty are objects, so to get their properties use faculty.levelOfDifficulty or faculty.overallQuality
 */
function averageRatings(facultyList, category = 'difficulty') {

}