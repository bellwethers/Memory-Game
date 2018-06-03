// JS holds functions and deck


/* holds deck of cards and flips cards
/* each card have functions: 'flip',
and 'listener' */
//append an image
//for each cell put a card/img








//list of src for images

var ogDeck = ["img/IMAG1159.jpg", "img/IMAG1162.jpg", "img/IMAG1166.jpg"];

var cloneDeck = ogDeck.slice(0);

var deck = ogDeck.concat(cloneDeck).randomize();





/*
summary:
A nested loop which creates card grid and every
created cell appends an img element. Also itterates
through img list
*/

    //finds the cardCanvas
    const table = document.getElementById("cardCanvas");
    if(table){
      console.log("t here img");
    }else{  console.log("t no here");}
    //the int for my list of imgs
    let x = 0;
    //nested loop
    /*foreach x row make x columns */
    for (let r = 1; r <= 2; r++) {
        //<tr> == row //
        const row = table.insertRow(0);
        console.log("numb of rows: " + r);
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
            console.log("numbers of cells in rows :" + c);
        }
    }





//adds listeners to the cells
  var cards = document.getElementsByClassName("card");
  //for every class add a listener

  /*for each element with the class name 'card' apply a
  function that add an event listener to every img
  and upon img being clicked modify to css of that index
  */
//check if the src's match


  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", showCard(i));
  }

function showCard(index){
  return function(){
    var firstClick = showCard();
    var secondClick;
  cards[index].classList.add("select");

};
}



  console.log("index: " + showCard()+ " equal count: "+firstClick);


















/*function match(x){
return function(){
cards[x].classList.add("select");
console.log("you clicked region number " + x);
    }
  }*/
