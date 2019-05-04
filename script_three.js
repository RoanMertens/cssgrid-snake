// <<<<<<<<<<<................>>>>>>>>>>
//               snake game
// <<<<<<<<<<<................>>>>>>>>>>


// ................
// general functions
// ................

//expects integer
function getRandomInt(max){ // returns random number as integer
  return Math.floor(Math.random() * Math.floor(max));
}

//expects integers
function calcDelay(game_difficulty, candies_eaten){ //returns delay between each step as integer
  return 1000/(game_difficulty + (candies_eaten/100))
}

//expects hash of integers height and width and string with hash or css as type
function calculateGrid(game_field_size, type){ //returns the playing field as array of strings
  const height = Array.from({length: game_field_size.height}, (x,i) => i);
  const width = Array.from({length: game_field_size.width}, (x,i) => i);

  const game_field = height.map( function(h) {
    let game_row = width.map( function(w) {
      return `snake-${h}-${w}`
    });
    return (type === "array" ? game_row : game_row.join(" "));
  });
  return (type === "array" ? game_field.flat() : game_field);
}

function createGrid(game_field_array, game_field_css, game_field_size, elem){
  elem.style.gridTemplateRows = `${game_field_size.width}, ${game_field_size.width}fr`;
  elem.style.gridTemplateColumns = `${game_field_size.height}, ${game_field_size.height}fr`;
  elem.style.gridTemplateAreas = ``;

  game_field_css.map( function(row){
    elem.style.gridTemplateAreas += `"${row}"`;
  })

  const blocks = game_field_array.map( function(b){
    let block = document.createElement("div");
    elem.appendChild(block);
    block.setAttribute('id', b);
    block.style.gridArea = b;
    return block
  });
  return blocks
}

//expects hash of integers height and width
function calcSnakeStartLocation(game_field_size){ //returns start location of snake as array
  const height = Math.round((game_field_size.height-1)/2);
  const width = Math.round((game_field_size.width-1)/2);
  const snake = [createBlock(width, height),
                 createBlock(width-1, height),
                 createBlock(width-2, height)]
  return snake
}

//expects integers
function createBlock(height, width){ //returns one block from the grid as string
  return `snake-${width}-${height}`
}

// expects two array of strings
function calcEmptySpaceGrid(game_field_array, snake_body){ //returns game field without location where snake is as array of strings
  return game_field_array.filter(x => !snake_body.includes(x));
}

// expects string
function findBannedDirectionSnakehead(snake_current_direction){ //returns opposite direction of snake_current_direction as string
    let reverse_direction = {up: "down", down: "up", left: "right", right: "left"}
    return reverse_direction[snake_current_direction]
}

function displaySnake(snake, displayed_blocks){
  displayed_blocks.map( function(block){
    snake.map( function(p){
      if (block.id == p) {
        block.setAttribute('class', 'snake');
        block.style.borderRadius = "10%";
      // } else if (block.attribute.class === 'snake') {
        // block.setAttribute('class', '');
      }
    });
  });
}

function displayCandy(candy_current_location, displayed_blocks){
  displayed_blocks.map( function(block){
      if (block.id == candy_current_location) { block.setAttribute('class', 'candy'); }
  });
}

// expects array of strings, two strings and a hash of integers
function moveSnake(snake_body, snake_current_direction, snake_banned_direction, game_field_size){ // returns new location snake as array of strings
  const new_location_head = calcNewLocationSnakehead(snake_body, snake_current_direction, snake_banned_direction, game_field_size);
  snake_body.pop();
  snake_body.unshift(new_location_head);
  return snake_body;
}

// expects array of strings, two strings and a hash of integers
function calcNewLocationSnakehead(snake_body, snake_current_direction, snake_banned_direction, game_field_size){ // returns new location head as string
  // if user input is same as banned direction change current direction to opposite of the banned direction
  if (snake_current_direction === snake_banned_direction){
    snake_current_direction = findOppositeDirectionSnakehead(snake_current_direction);
  }
  // sets the axis and direction of the step
  const axis = snake_current_direction === "up" || snake_current_direction === "down" ? 1 : 2;
  const direction = snake_current_direction === "down" || snake_current_direction === "right" ? 1 : -1;

  // splits location head in type, and x and y axis
  old_head = snake_body[0].split("-")
  // changes value of one axis by 1 or -1
  old_head[axis] = (parseInt(old_head[axis], 10) + direction).toString();

  let new_head = old_head
  return new_head.join("-");
}





// ................
// css info
// ................
const elem = document.getElementById("field");

// ................
// static'ish' game info
// ................
let game_running = false;
let game_difficulty = 2; //easy1 || medium2 || hard3 || hell4
const game_field_size = { height:10 , width:10 };

// ................
//  dynamic info
// ................
const game_field_css = calculateGrid(game_field_size, "css");
const game_field_array = calculateGrid(game_field_size, "array");

// ................
//  snake info
// ................
const snake_body = calcSnakeStartLocation(game_field_size) // (middle field)
const game_field_empty_space_array = calcEmptySpaceGrid(game_field_array, snake_body);
let snake_current_direction = "right"; //up || right || down || left
let snake_banned_direction = findBannedDirectionSnakehead(snake_current_direction)
let snake_body_size = 3 // grows by eating candies
let snake_distance_moved = 0 //begint op nul (telt een op met elke loop)


let game_rest_blocks_amount = game_field_empty_space_array.length
let random_int = getRandomInt(game_rest_blocks_amount)

// ................
// candy info
// ................
let candies_eaten = 0 //starts at 0 and adds one as the snake eats candies
let candy_current_location = game_field_empty_space_array[random_int];


// ................
// testttttttttttttttttttttttttttttttttttttttt..........................
// ................
displayed_blocks = createGrid(game_field_array, game_field_css, game_field_size, elem);
displaySnake(snake_body, displayed_blocks);
displayCandy(candy_current_location, displayed_blocks)

console.log(displayed_blocks)

moveSnake(snake_body, snake_current_direction, snake_banned_direction, game_field_size)
displaySnake(snake_body, displayed_blocks);



// bij opstarten ................
// na input gebruiker ................
// creeer grid
// plaats grid
// plaats slang
// plaats snoepje


// gebruikers input richting ................altijd.........blijft veranderen
// vraag richting van gebruiker



// start het spel...............................

// neem gebruikers input(richting)
// bereken volgende locatie
// plaats slang op nieuwe locatie
// bereken of item met 2 classes is.
// als 2 keer slang dan stop spel
// als 1 keer snoepje en 1 keer slang dan voeg snoepje toe



// bereken snelheid(moeilijkheids graad + aantal snoepjes)
























