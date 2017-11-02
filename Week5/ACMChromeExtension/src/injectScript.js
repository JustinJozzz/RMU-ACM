var config = {
    //firebase config goes here
};

var bubbles = [];
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');      

var tableCells = document.getElementsByTagName('td');

for (var i = 0; i < tableCells.length; i++) {
    if (tableCells[i].innerHTML == "Instructor: ") {

        tableCells[i+1].addEventListener("mouseover", function() {
            bubbleDOM.innerHTML = 'No Data Found';  
            var _this = this;
            if (!firebase.apps.length) {
                firebase.initializeApp(config);
            }
            var db = firebase.database().ref("faculty");
            db.orderByChild("lastName")
              .equalTo(_this.lastChild.innerHTML)
              .limitToFirst(1).once('value')
              .then(function(snapshot){
                    snapshot.forEach(function(result) {
                        bubbleDOM.innerHTML = "First Name: " + result.val().firstName + "<br>" +
                                              "Last Name: " + result.val().lastName + "<br>" +
                                              "Level Of Difficulty: " + result.val().levelOfDifficulty + "<br>" +
                                              "Overall Quality: " + result.val().overallQuality + "<br>";
                    });
                    
                    _this.prepend(bubbleDOM);
                    var rect = getOffset(_this);
                    renderBubble(rect.left - 25, rect.top - 330);
              });
        });

        tableCells[i+1].addEventListener("mouseout", function() {
            bubbleDOM.style.display = 'none';
        });
    }
}

function getOffset(element) {
    element = element.getBoundingClientRect();
    return {
      left: element.left + window.scrollX,
      top: element.top + window.scrollY
    }
}

function renderBubble(left, top) {
  bubbleDOM.style.left = left;
  bubbleDOM.style.top = top;
  bubbleDOM.style.display = 'block';
}