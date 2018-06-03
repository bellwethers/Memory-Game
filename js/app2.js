//list of src for images
var ogDeck = ["img/IMAG1159.jpg", "img/IMAG1162.jpg", "img/IMAG1166.jpg"];
var cloneDeck = ogDeck.slice(0);
var deck = ogDeck.concat(cloneDeck);
new_deck = shuffle(deck);



function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
summary:
A nested loop which creates card grid and every
created cell appends an img element. Also itterates
through img list
*/

//finds the cardCanvas
const table = document.getElementById("cardCanvas");
//the int for my list of imgs
let x = 0;
//nested loop
/*foreach x row make x columns */
for (let r = 1; r <= 2; r++) {
    //<tr> == row //
    const row = table.insertRow(0);
    //console.log("numb of rows: " + r);
    for (let c = 1; c <= 3; c++) {
        //<td> == column //
        var column = row.insertCell(0);
        //create img element
        const img = document.createElement("img");
        img.className = "card";
        //the image address is in the list
        img.src = deck[x];
        //moves through img lis
        x++;
        //adds the image element to every column/ appendChild is for JS
        column.appendChild(img);
      //  console.log("numbers of cells in rows :" + c);
    }
}




var cards_img = document.querySelectorAll(".card");
var firstClick = null;
var secondClick = null;
var matched = [];
var selected_list = 0;
var turn = 0;



cards_img.forEach(function(click_card) {
    click_card.addEventListener("click", listen);
});

function listen(selected_card) {

    let clicked = selected_card.target;

    if (selected_list < 2) {
        selected_list++;
        moveCount();
        var score = document.getElementById("moves").innerHTML = turn;
        //console.log("amount of clicks:" + turn);
        if (selected_list === 1) {
            firstClick = clicked.getAttribute("src");
            clicked.classList.add("select");
            clicked.removeEventListener("click", listen);
            //console.log("first: " + firstClick);
        } else {
            secondClick = clicked.getAttribute("src");
            clicked.classList.add("select");
            //console.log(" second: " + secondClick);
        }
        if (firstClick !== null && secondClick !== null) {
            if (firstClick == secondClick) {
                matched_card();
            }
            setTimeout(reset_guess, 1156);

            //console.log("in list : " + matched.length);
        }
    }
}

var stars = document.querySelectorAll('.star');
var starCount = stars.length;

function starStyle(){
for(var w = 0; w < starCount; w++){
  stars[w].style.filter = "none";
}
}

var y = -1;

function moveCount(){
  turn++;

  /*create a list of three stars then remove
  if turns become too much remove
  */
  if(turn == 10 || turn == 17 || turn == 27){
  y++;
    
    stars[y].style.filter = "brightness(0%)";
    //change style to black
  }
}

//handles matched card
function matched_card() {
    //console.log("success");
    matched.push(firstClick, secondClick);
    var cards_picked = document.querySelectorAll(".select");
    cards_picked.forEach(card => {
        card.classList.add("matched");
        card.removeEventListener("click", listen);
    });
    firstClick = null;
    secondClick = null;
    setTimeout(win_message, 119);

}

//resets wrong guess
function reset_guess() {
    firstClick = null;
    secondClick = null;
    selected_list = 0
    //console.log("reset");
    var cards_picked = document.querySelectorAll(".select");
    cards_picked.forEach(card => {
        card.classList.remove("select");
        card.addEventListener("click", listen);
    });



}





function win_message() {
if (matched.length == deck.length) {
  var score = document.getElementById("moves").innerHTML = turn;
    alert("You win!! Your score is: "+score+ "turns.");
  }
}



var refresh_button = document.getElementById("repeat_img");
refresh_button.addEventListener('click',restart);

//restart game if button is pressed.
function restart() {
      turn = 0;
      counter = 0;
      y = -1;
      starStyle();
        var cards_picked = document.querySelectorAll(".matched");
        cards_picked.forEach(card => {
            card.classList.remove("matched");
            matched.splice(0);
          //  console.log("removed: " + matched.toString());
        });
        cards_img.forEach(function(click_card) {
            click_card.addEventListener("click", listen);
        });
}

setInterval(timer, 2000);
var counter = 0;
//timer
function timer(){
  if(turn != 0 && matched.length != deck.length){
counter++;
var time = document.getElementById("time").innerHTML = counter;
//console.log("counter: "+counter);
}
}
