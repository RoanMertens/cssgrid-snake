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

//expects hash of integers height and width
function calcSnakeStartLocation(game_field_size){ //returns start location of snake as array
  const height = Math.round(game_field_size.height/2);
  const width = Math.round(game_field_size.width/2);
  return [createBlock(width, height),
          createBlock(width-1, height),
          createBlock(width-2, height)]
}

//expects integers
function createBlock(width, height){ //returns one block from the grid as string
  return `snake-${width}-${height}`
}

//expects hash of integers height and width and string with hash or css as type
function createGrid(game_field_size, type){ //returns the playing field as array of strings
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

// expects two array of strings
function calcEmptySpaceGrid(game_field_array, snake_body){ //returns game field without location where snake is as array of strings
  return game_field_array.filter(x => !snake_body.includes(x));
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
  if (snake_current_direction === snake_banned_direction ) {
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

// expects string
function findBannedDirectionSnakehead(snake_current_direction){ //returns opposite direction of snake_current_direction as string
    let reverse_direction = {up: "down", down: "up", left: "right", right: "left"}
    return reverse_direction[snake_current_direction]
}

//expects integers
function calcDelay(game_difficulty, candies_eaten){ //returns delay between each step as integer
  return 1000/(game_difficulty + (candies_eaten/100))
}

// ................
// game & snake info
// ................
// top of the page
let game_running = false;
let game_difficulty = 2; //easy1 || medium2 || hard3 || hell4
const game_field_size = { height:5 , width:5 };
const game_field_css = createGrid(game_field_size, "css");
const game_field_array = createGrid(game_field_size, "array");
const snake_body = calcSnakeStartLocation(game_field_size) // (middle field)
const game_field_empty_space_array = calcEmptySpaceGrid(game_field_array, snake_body);
let snake_current_direction = "down"; //up || right || down || left
let snake_banned_direction = findBannedDirectionSnakehead(snake_current_direction)
let snake_body_size = 3 // grows by eating candies
let snake_distance_moved = 0 //begint op nul (telt een op met elke loop)

// ................
// candy info
// ................
let candies_eaten = 0 //starts at 0 and adds one as the snake eats candies
let candy_current_location = getRandomInt(field.height)



document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '37') {
    // left arrow
    snake_current_direction = 'left'
    snake_banned_direction = findBannedDirectionSnakehead(snake_current_direction)
    console.log("left: ", snake_banned_direction);
  } else if (e.keyCode == '39') {
    // right arrow
    snake_current_direction = 'right'
    snake_banned_direction = findBannedDirectionSnakehead(snake_current_direction)
    console.log("right: ", snake_banned_direction);
  } else if (e.keyCode == '38') {
    // up arrow
    snake_current_direction = 'up'
    snake_banned_direction = findBannedDirectionSnakehead(snake_current_direction)
    console.log("up: ", snake_banned_direction);
  } else if (e.keyCode == '40') {
    // down arrow
    snake_current_directio = 'down'
    snake_banned_direction = findBannedDirectionSnakehead(snake_current_direction)
    console.log("down: ", snake_banned_direction);
  }
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// what if snake moves over the border??????????????????????????????????????????????????
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!





