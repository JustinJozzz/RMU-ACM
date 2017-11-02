'use strict';

const https = require("https");
const request = require('request');
const readline = require('readline');
const firebaseURL = /*firebase URL*/;
const menu = `Please enter one of the following numbers:
    1. Highest Overall Quality
    2. Highest Level Of Difficulty
    3. Lowest Overall Quality
    4. Lowest Level Of Difficulty
    5. Get Average Overall Quality
    6. Get Average Level of Difficulty
    7. Exit`

const rl = readline.createInterface({
    input: process.stdin,
    ouput: process.stdout
});

request(firebaseURL, function(err, response, body){
    if(err)
        throw err;

    body = JSON.parse(body);

    var facultyList = Object.keys(body).map(key => {
                            return body[key];
                        });
    
    console.log(menu);

    rl.on('line', function(input){
        switch (input) {
            case '1':
                printItem(overallQuality(facultyList, 'high'), 'Highest Overall Quality');
                break;
            case '2':
                printItem(levelOfDifficulty(facultyList, 'high'), 'Highest Level Of Difficulty');
                break;
            case '3':
                printItem(overallQuality(facultyList), 'Lowest Overall Quality');
                break;
            case '4':
                printItem(levelOfDifficulty(facultyList), 'Lowest Level Of Difficulty');
                break;
            case '5':
                printItem(averageRatings(facultyList, 'quality'), 'Average Quality');
                break;
            case '6':
                printItem(averageRatings(facultyList), 'Average Level of Difficulty');
                break;
            case '7':
                rl.close();
        }
    
        console.log(menu);
    });
});

function printItem(item, caption) {
    var output = caption + '\n';

    if(typeof(item) === 'object') {
        for(var property in item) {
            output += property+ ': '+ item[property] + ' ';
        }
    } else if(typeof(item) === 'number') {
        output += item.toFixed(3);
    }

    console.log(output + '\n');
}
  
function overallQuality(facultyList, category = 'low') {
    var result = facultyList[0];

    for(var faculty of facultyList) {
        if(category === 'low' && faculty.overallQuality < result.overallQuality) {
            result = faculty;
        } else if(category === 'high' && faculty.overallQuality > result.overallQuality) {
            result = faculty;
        }
    }

    return result;
}

function levelOfDifficulty(facultyList, category = 'low') {
    var result = facultyList[0];

    for(var faculty of facultyList) {
        if(category === 'low' && faculty.levelOfDifficulty < result.levelOfDifficulty) {
            result = faculty;
        } else if(category === 'high' && faculty.levelOfDifficulty > result.levelOfDifficulty) {
            result = faculty;
        }
    }

    return result;
}

function averageRatings(facultyList, category = 'difficulty') {
    var sum = 0;

    for(var faculty of facultyList) {
        sum += (category === 'difficulty') ? parseInt(faculty.levelOfDifficulty) : parseInt(faculty.overallQuality);
    }

    return sum/facultyList.length;
}