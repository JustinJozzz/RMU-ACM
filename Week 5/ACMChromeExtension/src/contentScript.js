// Add bubble to the top of the page.
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
bubbleDOM.innerHTML = 'hi';

var tableCells = document.getElementsByTagName('td');

for (var i = 0; i < tableCells.length; i++) {
    if (tableCells[i].innerHTML == "Instructor: ") {
        document.body.insertBefore(bubbleDOM, tableCells[i+1].parentNode.parentNode);
        tableCells[i+1].addEventListener("mouseover", function() {
            var rect = this.getBoundingClientRect();
            console.log(rect);
            console.log(rect.x);
            renderBubble(rect.left, rect.top);
        });

        tableCells[i+1].addEventListener("mouseout", function() {
            bubbleDOM.style.visibility = 'hidden';
        });
    }
}

function renderBubble(mouseX, mouseY) {
  bubbleDOM.style.top = mouseY;
  bubbleDOM.style.left = mouseX;
  bubbleDOM.style.visibility = 'visible';
  console.log(bubbleDOM);
}