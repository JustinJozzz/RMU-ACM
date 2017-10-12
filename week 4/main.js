/*
This program gets a list of faculty members from the rmu website,
looks them up on ratemyprofessor, and adds their rating to a json object.
Then writes that object to a file.
*/
const request = require("request"); //makes http get requests to get html of website
const jsonfile = require('jsonfile') //write json object directly to file
const jsdom = require("jsdom"); //lets us take the html we get and manipulate it
const { JSDOM } = jsdom; //pulls the JSDOM constructor out of the package

var facultyUrl = 'https://sentry.rmu.edu/web/cms/Pages/faculty-profile-list.aspx';//url of the faculty profile list

/*
makes HTTP GET Request to get the html of the faculy profile list page
*/
request(facultyUrl, function(error, response, body) {
    if (error) {
        return console.error('upload failed:', error);
    }

    const facultyPage = new JSDOM(body);
    var faculty = [];

    /*
    All faculty names share the same class, b10, get all elements with that class
    and loop through them pushing javascript objects containing their first and last name to
    the faculty array.
    */
    var elements = facultyPage.window.document.getElementsByClassName('b10');
    for(elm of elements) {
        faculty.push({
            //split method splits string into an array based on index of the give substring argument
            firstName: elm.innerHTML.split(', ')[1].split(' ')[0],
            lastName: elm.innerHTML.split(', ')[0]
        });
    }

    //loop through all faculty and get their rating and write it to the json file
    for(var i = 0; i < faculty.length; i++) {
        getFacultyRating(faculty, i);
    }
});

/*
Takes faculty array and index as arguments.
Looks faculty up on ratemyprofessor using their first and last names.
If there are results for those professors at RMU, then go to their page and get their rating.
Write object containg first name, last name, and rating to json file.
*/
function getFacultyRating(faculty, index) {
    //make url for search using first name and last name.
    var rmpUrl = 'http://www.ratemyprofessors.com/search.jsp?query='+faculty[index].firstName + '+' + faculty[index].lastName;
    request(rmpUrl, function(error, response, body){
        //make html into JSDOM object so we can manipulate it
        var searchPage = new JSDOM(body);

        /*
        All search results have the class 'listing' and 'PROFESSOR'.
        Use function querySelectorAll which takes a css selector as
        arguments to get all elements matching this description.
        */
        var results = searchPage.window.document.querySelectorAll('.listing.PROFESSOR');

        if(results.length > 0) {
            //querySelectorAll returns a node last, use Array.from to conver it to an array
            var rmuResults = Array.from(results).filter(function(element){
                /*
                The div containing university name has class 'sub'.
                In each of the results, get the first element with class 'sub'.
                Check if that element contains Robert Morris University, and add it to array if it does.
                */
                return element.getElementsByClassName('sub')[0].innerHTML.indexOf('Robert Morris University') >= 0;
            });
            
            if(rmuResults.length > 0) {
                /*
                For the first element in the filtered array, get the location that its link is going to.
                Navigate to that location and get the HTML.
                */
                request('http://www.ratemyprofessors.com' + rmuResults[0].getElementsByTagName('a')[0].href, function(error, response, body) {
                    var rmpPage = new JSDOM(body);

                    //all ratings have the class grade. Since it returns an array take only the first element.
                    var rating = rmpPage.window.document.getElementsByClassName('grade')[0].textContent;

                    //if some do not have a rating, their entire profile may return, filter them out
                    if(rating.length < 5) {
                        //if we got their rating, set the rating property of this faculty
                        faculty[index].rating = rating;

                        /*
                        First argument is file location, next is the object to write, then options, then callback function.
                        Flag 'a' means append to file if it exists. Changes EOL to comma and then newline so we can
                        easily make and array out of it.
                        */
                        jsonfile.writeFile('./facultyRating.json', faculty[index], {flag: 'a', EOL: ',\n'}, function (err) {
                            if(error)console.error(err);
                        });
                    }
                });
            }
        }
    });
}