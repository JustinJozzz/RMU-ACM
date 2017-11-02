'use strict';

const https = require("https");
const request = require('request');
const readline = require('readline');
const firebaseURL = 'https://acmchromeextension.firebaseio.com/faculty.json';
const menu = `Please enter one of the following numbers:
    1. Sort Faculty By Overall Quality
    2. Sort Faculty By Level Of Difficulty
    3. Sort Faculty By First Name
    4. Sort Faculty By Last Name
    5. Get Average Faculty Level of Difficulty
    6. Exit`

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
                printFacultyList(sortByOverallQuality(facultyList));
                break;
            case '2':
                printFacultyList(sortByLevelOfDifficulty(facultyList));
                break;
            case '3':
                printFacultyList(sortByFirstName(facultyList));
                break;
            case '4':
                printFacultyList(sortByLastName(facultyList));
                break;
            case '5':
                console.log(averageDifficulty(facultyList));
                break;
            case '6':
                rl.close();
        }
    
        console.log(menu);
    });
});

function printFacultyList(facultyList) {
    for(var faculty of facultyList) {
        console.log(`${faculty.firstName} ${faculty.lastName} Quality: ${faculty.overallQuality} Difficulty: ${faculty.levelOfDifficulty}`);
    }
    console.log('\n');
}

function sortByOverallQuality(facultyList) {
    facultyList.sort(function(a, b){
        return b.overallQuality - a.overallQuality;
    });

    return facultyList;
}

function sortByLevelOfDifficulty(facultyList) {
    facultyList.sort(function(a, b){
        return b.overallQuality - a.overallQuality;
    });

    return facultyList;
}

function sortByFirstName(facultyList) {
    facultyList.sort(function(a, b){
        if(a.firstName.charAt(0) < b.firstName.charAt(0)) return -1;
        if(a.firstName.charAt(0) > b.firstName.charAt(0)) return 1;
        return 0;
    });

    return facultyList;
}

function sortByLastName(facultyList) {
    facultyList.sort(function(a, b){
        if(a.lastName.charAt(0) < b.lastName.charAt(0)) return -1;
        if(a.lastName.charAt(0) > b.lastName.charAt(0)) return 1;
        return 0;
    });

    return facultyList;
}

function averageDifficulty(facultyList) {
    var sum = 0;
    for(var faculty of facultyList) {
        sum += parseInt(faculty.levelOfDifficulty);
    }

    return sum/facultyList.length;
}