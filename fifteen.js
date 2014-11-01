"use strict";

var tiles; // Variable to store tile divs.
var empty_tile; // Variable to store position of empty tile
var moveable; //Variable to store whether clicked tile is movable or not

window.onload = function(){

tiles = $("puzzlearea").getElementsByTagName("div"); //getting list of tiles (divs).

start();

$("shufflebutton").onclick = shuffle;

};

/*The below function loads the tiles, tile image, and sets the event listeners*/

function start() {

    var top = 0, left = 0; // position variables of each tile.
    var b_y = 0, b_l = 0; //position of the background image

      for(var i = 0; i < tiles.length; i++){

        tiles[i].addClassName("puzzlepiece"); //adding the puzzle piece class to each div in the puzzle area.

        tiles[i].style.left = left + "px"; //adding left position to current tile.
        tiles[i].style.top =  top + "px"; //adding top position to current tile.

        tiles[i].style.backgroundPosition =  b_l + "px " + b_y + "px";



        left += 100; //incrementing left position by 100 (new column -- assuming each column is 100px).
        b_l += -100; //pull background image to left

        if (left === 400){ // if 4th column is reached:

        left = 0; //go back to first column.
        b_l = 0;
        top += 100; //go to second row.
        b_y += -100;//pull background image up

        }

        empty_tile = {x:300, y:300};

        tiles[i].onmouseover = canBeMoved;
        tiles[i].onclick = moveTile;

    }

}

/* Function to move tile that is beside empty space*/

function moveTile(tile){

    var top_pos = parseInt(this.getStyle("top")); //getting current position of tile
    var left_pos = parseInt(this.getStyle("left"));

    if(moveable){
          /*Move tile up*/
        if(top_pos - empty_tile.y === 100 && top_pos != 0 ){
          this.style.top = top_pos - 100 + "px";
          empty_tile.y += 100;
        }
          /*Move tile down*/
        else if(top_pos - empty_tile.y === -100 && top_pos != 300){
          this.style.top = top_pos + 100 + "px";
          empty_tile.y -= 100;
        }
          /*Move tile left*/
        else if(left_pos - empty_tile.x === 100 && left_pos != 0){
          this.style.left = left_pos - 100 + "px";
          empty_tile.x += 100;
        }
          /*Move tile right*/
        else if(left_pos - empty_tile.x === -100 && left_pos != 300){
           this.style.left = left_pos + 100 + "px";
           empty_tile.x -= 100;
         }

      }
}

/* Function to determine if tile is beside empty space*/
function canBeMoved(){

  var top_pos = parseInt(this.getStyle("top"));
  var left_pos = parseInt(this.getStyle("left"));
  var y_diff = Math.abs(( top_pos - empty_tile.y)), x_diff = Math.abs(( left_pos - empty_tile.x));

    // Checking if the tile if next to empty space;

  if(y_diff === 100 && x_diff === 0){

    this.addClassName("movablepiece");
    moveable = true;
    return true;

  }

  else if(x_diff === 100 && y_diff === 0){

    this.addClassName("movablepiece");
    moveable = true;
    return true;
  }

  else{
    this.removeClassName("movablepiece");
    moveable = false;
    return false;
  }


}

/* Function to return at tile given x/y values*/
function findTile(top,left){
  for(var x = 0; x < tiles.length; x++){
    if(top == parseInt(tiles[x].getStyle("top")) && left == parseInt(tiles[x].getStyle("left")) ){
      return tiles[x];
    }
  }
}

/* Function to shuffle tiles*/
function shuffle(){
  var neighbours = [];
  for (var i = 0; i < 1000; i++){
    for(var x=0; x < tiles.length; x++){
      if(tiles[x].canBeMoved()){
        neighbours.push(tiles[x]);
      }
    }
  }
    //randomly choose an element i from neighbors.
    var chosen_one = neighbours[Math.floor(Math.random() * (neighbours.length - 1))];


    //move neighbors[i] to the location of the empty square.
    if(neighbours !== null){
    var top = chosen_one.getStyle("top");
    var left = chosen_one.getStyle("left");

    chosen_one.style.top = empty_tile.y;
    chosen_one.style.left = empty_tile.x;

    empty_tile.x = left;
    empty_tile.y = top;

  }

}


/*

  var main = document.getElementById("puzzlearea");
  var divs = main.children;
  var frag = document.createDocumentFragment();

    while (divs.length) {
      frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
    }
    main.appendChild(frag);


}*/

/* Function to change background*/
