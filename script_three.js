// <<<<<<<<<<<................>>>>>>>>>>
//               functions
// <<<<<<<<<<<................>>>>>>>>>>


// ................
// candy functions
// ................

// expects integer
// returns random number as integer
function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

// expects two array of strings
// returns game field without location where snake is as array of strings
function calcEmptySpaceGrid(game_field_array, snake_body){
  return game_field_array.filter(x => !snake_body.includes(x));
}

function displayCandy(candy_location){
  candy_location.setAttribute('class', 'candy');
}


// ................
// game functions
// ................

// expects integers
// returns delay between each step as integer
function calcDelay(game_difficulty, candies_eaten){
  return 1000/(game_difficulty + (candies_eaten/100))
}


// ................
// grid functions
// ................

// expects hash of integers height and width and string with hash or css as type
// returns the playing field as array of strings
function calculateGrid(game_field_size, type){
  const height = Array.from({length: game_field_size.height}, (x,i) => i);
  const width = Array.from({length: game_field_size.width}, (x,i) => i);

  const game_field = height.map( function(h) {
    let game_row = width.map( function(w) {
      return createBlock(h, w);
    });
    return (type === "array" ? game_row : game_row.join(" "));
  });
  return (type === "array" ? game_field.flat() : game_field);
}

function displayGrid(game_field_array, game_field_css, game_field_size, elem){
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

// expects integers
// returns one block from the grid as string
function createBlock(height, width){
  return `snake-${height}-${width}`
}


// ................
// snake start functions
// ................

// expects hash of integers height and width
// returns start location of snake as array
function calcSnakeStartLocation(game_field_size){
  const height = Math.round((game_field_size.height-1)/2);
  const width = Math.round((game_field_size.width-1)/2);
  const snake = [createBlock(height, width),
                 createBlock(height, width-1),
                 createBlock(height, width-2),
                 createBlock(height, width-3)]
  return snake
}

function createSnake(snake_location, game_field){
  const new_snake_body = []
  snake_location.map( function(part){
    game_field.map( function(block){
      if (block.id === part){
        block.setAttribute('class', 'snake');
        new_snake_body.push(block);
      }
    });
  });
  return new_snake_body
}


// ................
// snake move functions
// ................

function removeSnakeTail(snake_body){
  snake_body[snake_body.length-1].className = '';
  snake_body.pop();
  return snake_body;
}

function addSnakeHead(snake_body, game_field, snake_head){
  game_field.map( function(block){
    if (block.id === snake_head && block.classList.contains('candy')) {
      block.setAttribute('class', 'candy-snake');
      snake_body.unshift(block);
    } else if (block.id === snake_head){
      block.setAttribute('class', 'snake');
      snake_body.unshift(block);
    }
  })
  return snake_body
}

// expects string
//returns opposite direction of snake_current_direction as string
function findOppositeDirectionSnakehead(snake_current_direction){
    let reverse_direction = {up: "down", down: "up", left: "right", right: "left"}
    return reverse_direction[snake_current_direction]
}


// expects array of strings, two strings and a hash of integers
function moveSnake(snake_body, snake_current_direction, game_field_size){ // returns new location snake as array of strings
  snake_body = removeSnakeTail(snake_body);
  const snake_head = calcNewLocationSnakehead(snake_body, snake_current_direction, game_field_size);
  snake_body = addSnakeHead(snake_body, game_field, snake_head);
  return snake_body;
}

// expects array of strings, two strings and a hash of integers
function calcNewLocationSnakehead(snake_body, snake_current_direction, game_field_size){ // returns new location head as string

  // sets the axis and direction of the step
  const axis = snake_current_direction === 'up' || snake_current_direction === 'down' ? 1 : 2;
  let direction = snake_current_direction === 'down' || snake_current_direction === 'right' ? 1 : -1;
  old_head = snake_body[0].id.split("-");

  if (snake_current_direction === 'up' && old_head[1] === "0"){
    old_head[axis] = (parseInt(old_head[axis], 10) + (game_field_size.height - 1)).toString();
  } else if (snake_current_direction === 'down' && old_head[1] === (game_field_size.height-1).toString()){
    old_head[axis] = (parseInt(old_head[axis], 10) - (game_field_size.height - 1)).toString();
  } else if (snake_current_direction === 'left' && old_head[2] === "0"){
    old_head[axis] = (parseInt(old_head[axis], 10) + (game_field_size.height - 1)).toString();
  } else if (snake_current_direction === 'right' && old_head[2] === (game_field_size.width-1).toString()) {
    old_head[axis] = (parseInt(old_head[axis], 10) - (game_field_size.height - 1)).toString();
  } else {
    old_head[axis] = (parseInt(old_head[axis], 10) + direction).toString();
  }

  let new_head = old_head

  new_head = new_head;

  if (snake_body[1].id === new_head.join("-")){
    snake_current_direction = findOppositeDirectionSnakehead(snake_current_direction)
    new_head = calcNewLocationSnakehead(snake_body, snake_current_direction, game_field_size)
    return new_head;
  } else {
    return new_head.join("-");
  }
}

// <<<<<<<<<<<................>>>>>>>>>>
//           setting variable
// <<<<<<<<<<<................>>>>>>>>>>


// ................
// css info
// ................
const elem = document.getElementById("field");

// ................
// static'ish' game info
// ................
// let game_running = false;
// let game_difficulty = 2; //easy1 || medium2 || hard3 || hell4
const game_field_size = { height:10 , width:10 };

// ................
//  dynamic info
// ................
const game_field_css = calculateGrid(game_field_size, "css");
const game_field_array = calculateGrid(game_field_size, "array");
// let snake_body_size = 3 // grows by eating candies
// let snake_distance_moved = 0 //begint op nul (telt een op met elke loop)
let snake_current_direction = 'right'

// create array active elements
const game_field = displayGrid(game_field_array, game_field_css, game_field_size, elem);

// ................
//  snake info
// ................
const snake_start_location = calcSnakeStartLocation(game_field_size) // (middle field)
// get active elements from array and create snake body
let snake_body = createSnake(snake_start_location, game_field);


  // console.log("hi");
document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '37') {
    // left arrow
    snake_current_direction = 'left'
  } else if (e.keyCode == '39') {
    // right arrow
    snake_current_direction = 'right'
  } else if (e.keyCode == '38') {
    // up arrow
    snake_current_direction = 'up'
  } else if (e.keyCode == '40') {
    // down arrow
    snake_current_direction = 'down'
  }
}
setInterval(function() {
  snake_body = moveSnake(snake_body, snake_current_direction, game_field_size);
}, 600);



const game_field_empty_space_array = calcEmptySpaceGrid(game_field_array, snake_body);


without_snake = calcEmptySpaceGrid(game_field, snake_body)
random_number = getRandomInt(without_snake.length-1)
console.log(without_snake[random_number]);
displayCandy(without_snake[random_number])
// ................
// candy info
// ................
// let game_rest_blocks_amount = game_field_empty_space_array.length
// let random_int = getRandomInt(game_rest_blocks_amount)
// let candies_eaten = 0 //starts at 0 and adds one as the snake eats candies
// let candy_current_location = game_field_empty_space_array[random_int];


// ................
// testttttttttttttttttttttttttttttttttttttttt..........................
// ................
// displayed_blocks = displayGrid(game_field_array, game_field_css, game_field_size, elem);
// displaySnake(snake_body, displayed_blocks);
// displayCandy(candy_current_location, displayed_blocks)

// moveSnake(snake_body, snake_current_direction, snake_banned_direction, game_field_size)

// moveSnake(snake_body, snake_current_direction, snake_banned_direction, game_field_size)
// displaySnake(snake_body, displayed_blocks);










// get array of current location snake (ACTIVE ELEMENTS)

// set last element to not having a class (game_field_array[3].className = '';)
// remove last element from array

// get new location head from active elements
// set class to snake (game_field_array[3].setAttribute('class', 'snake');)
// add net location head active element to array















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
























