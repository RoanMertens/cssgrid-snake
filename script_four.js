// creeér grid
// vul grid met blokjes
//
// <div id="snake-5-3" class="snake" style="grid-area: snake-5-3 / snake-5-3 / snake-5-3 / snake-5-3; border-radius: 10%;"></div>

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

// expects integers
// returns one block from the grid as string
function createBlock(height, width){
  return `snake-${height}-${width}`
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

// expects hash of integers height and width
// returns start location of snake as array
function calcSnakeStartLocation(game_field_size){
  const height = Math.round((game_field_size.height-1)/2);
  const width = Math.round((game_field_size.width-1)/2);
  const snake = [createBlock(height, width),
                 createBlock(height, width-1),
                 createBlock(height, width-2)]
  return snake
}

function createSnake(snake_start_location, game_field){
  const new_snake_body = []
  snake_start_location.map( function(part){
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
// css info
// ................
const elem = document.getElementById("field"); // get grid id
const game_field_size = { height:5 , width:5 }; // get width and height of grid
const snake_start_location = calcSnakeStartLocation(game_field_size);
const game_field_css = calculateGrid(game_field_size, "css"); //css version of grid for displaying
let game_field_array = calculateGrid(game_field_size, "array"); //array version of grid for displaying snake

game_field = displayGrid(game_field_array, game_field_css, game_field_size, elem); // displays grid and returns array of active blocks

snake_body = createSnake(snake_start_location, game_field);
console.log(snake_body);


// get array of current location snake (ACTIVE ELEMENTS)

// set last element to not having a class (game_field_array[3].className = '';)
// remove last element from array

// get new location head from active elements
// set class to snake (game_field_array[3].setAttribute('class', 'snake');)
// add net location head active element to array











