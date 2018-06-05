//list of src for images
//DECK ARRAY//
var srcList = ["img/IMAG1159.jpg", "img/IMAG1162.jpg", "img/IMAG1166.jpg"];
var imgCopy = srcList.slice(0);
var deck = srcList.concat(imgCopy);
var newDeck = shuffle(deck);

//CARD SELECTION SECTION//
var firstClick = null;
var secondClick = null;
var matched = [];
//selected cards//
var selected_list = 0;
var turn = 0;

//STAR MANAGER//
var stars = document.querySelectorAll('.star');
var starCount = stars.length;

createBoard();

//SHUFFLE DECK//
// Shuffle function from http://stackoverflow.com/a/2450976
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
function createBoard() {
    newDeck = shuffle(deck);


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
            img.src = newDeck[x];
            //console.log(deck[x]);
            //moves through img lis
            x++;
            //adds the image element to every column/ appendChild is for JS
            column.appendChild(img);
            //  console.log("numbers of cells in rows :" + c);
        }
    }




    //CARD LISTENER SECTION//
    var cards_img = document.querySelectorAll(".card");

    cards_img.forEach(function(click_card) {
        click_card.addEventListener("click", listen);
    });
}

//CARD SELECTION SECTION//
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

            console.log("in list : " + matched.length);
        }
    }
}


//STAR MANAGER//
function starStyle() {
    for (var w = 0; w < starCount; w++) {
        stars[w].style.filter = "none";
    }
}

var y = -1;

function moveCount() {
    turn++;

    /*create a list of three stars then remove
    if turns become too much remove
    */
    if (turn == 10 || turn == 17 || turn == 27) {
        y++;

        stars[y].style.filter = "brightness(0%)";
        //change style to black
    }
}

//CARD MATCHES SECTION //
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

//RESETS WRONG GUESSES//
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



//WIN MESSAGE//
function win_message() {
    if (matched.length == deck.length) {
        var score = document.getElementById("moves").innerHTML = turn;
        alert("You win!! Your score is: " + score + " turns and you have lost " + y + " stars!");
    }
}


//RESETS THE GAME(shuffles deck)//
var refresh_button = document.getElementById("repeat_img");
refresh_button.addEventListener('click', restart);

//restart game if button is pressed.
function restart() {
    turn = 0;
    counter = 0;
    y = -1;
    starStyle();
    matched = [];
    $("#cardCanvas tr").remove();
    createBoard();
    var cards_picked = document.querySelectorAll(".matched");
    cards_picked.forEach(card => {
        card.classList.remove("matched");
        matched.splice(0);
        //  console.log("removed: " + matched.toString());
    });

}

//COUNTER (starts on first card selection)//
setInterval(timer, 2000);
var counter = 0;
//timer
function timer() {
    if (turn !== 0 && matched.length != deck.length) {
        counter++;
        var time = document.getElementById("time").innerHTML = counter;
        //console.log("counter: "+counter);
    }
}
