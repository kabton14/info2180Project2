/*INFO 2180 Project 2
  ID# 620040594

  +++++++++++++++++
  ADDITIONAL FEATURES IMPLEMENTED:
  -Custom background

*/


"use strict";

var tiles; // Variable to store tile divs.
var empty_tile; // Variable to store position of empty tile
var moveable; //Variable to store whether clicked tile is movable or not

window.onload = function(){

  tiles = $("puzzlearea").getElementsByTagName("div"); //getting list of tiles (divs).

  start();

  $("shufflebutton").onclick = shuffle;

  selectView();

  $("change_btn").onclick = setBackground;

};

/*The below function loads the tiles, tile image, and sets the event listeners*/

function start() {

  var a = "url('http://i187.photobucket.com/albums/x37/kabton14/info2180%20project/smurf_zpsd17fd548.jpg')";
  var b = "url('http://i187.photobucket.com/albums/x37/kabton14/info2180%20project/quarry_zpsc410258d.jpg')";
  var c = "url('http://i187.photobucket.com/albums/x37/kabton14/info2180%20project/Crimson-Staff_avatar_zps061aa7fc.png')";
  var d = "url('http://i187.photobucket.com/albums/x37/kabton14/info2180%20project/anthony-burrill-owl_zps3863e809.png')";
  var e = "url('background.jpg')";
  var background = [a,b,c,d,e];
  var rand_background = background[Math.floor(Math.random() * (background.length - 1))];



    var top = 0, left = 0; // position variables of each tile.
    var b_y = 0, b_l = 0; //position of the background image

      for(var i = 0; i < tiles.length; i++){

        tiles[i].addClassName("puzzlepiece"); //adding the puzzle piece class to each div in the puzzle area.

        tiles[i].style.left = left + "px"; //adding left position to current tile.
        tiles[i].style.top =  top + "px"; //adding top position to current tile.
        tiles[i].style.backgroundImage = rand_background;

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

function moveTile(){

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

  var main = document.getElementById("puzzlearea");
  var divs = main.children;
  var frag = document.createDocumentFragment();

    while (divs.length) {
      frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
    }
    main.appendChild(frag);


  start();

}









/* Function insert area to change background*/
function selectView(){

  var x = document.getElementById("overall");
  var select = document.createElement("select");
  select.id = "b_select";
  var option1 = document.createElement("option");
  var option2 = document.createElement("option");
  var option3 = document.createElement("option");
  var option4 = document.createElement("option");

  option1.text= "Background1";
  option1.id = "option1";
  option2.text= "Background2";
  option2.id = "option2";
  option3.text= "Background3";
  option3.id = "option3";
  option4.text= "Background4";
  option4.id = "option4";

  select.appendChild(option1);
  select.appendChild(option2);
  select.appendChild(option3);
  select.appendChild(option4);

  x.appendChild(select);

  var btn = document.createElement("button");
  btn.id = "change_btn";
  var t = document.createTextNode("Change Background");
  btn.appendChild(t);
  x.appendChild(btn);




}

/* Function to set background*/
function setBackground(){

  var background = $("b_select").value;

  switch(background){

    case "Background1":
      for(var x = 0; x < tiles.length; x++)tiles[x].style.backgroundImage = "url('http://i187.photobucket.com/albums/x37/kabton14/info2180%20project/smurf_zpsd17fd548.jpg')";
      break;

    case "Background2":
      for(var x = 0; x < tiles.length; x++)tiles[x].style.backgroundImage = "url('http://i187.photobucket.com/albums/x37/kabton14/info2180%20project/quarry_zpsc410258d.jpg')";
      break;

    case "Background3":
      for(var x = 0; x < tiles.length; x++)tiles[x].style.backgroundImage = "url('http://i187.photobucket.com/albums/x37/kabton14/info2180%20project/Crimson-Staff_avatar_zps061aa7fc.png')";
      break;

    case "Background4":
      for(var x = 0; x < tiles.length; x++)tiles[x].style.backgroundImage = "url('http://i187.photobucket.com/albums/x37/kabton14/info2180%20project/anthony-burrill-owl_zps3863e809.png')";
      break;

    default:
      for(var x = 0; x < tiles.length; x++)tiles[x].style.backgroundImage = "url('background.jpg')";

  }

}
