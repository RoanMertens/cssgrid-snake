window.addEventListener("click", function(){




  // let elem= document.getElementById("field");
  // let snek= document.getElementById("test");
  // style = window.getComputedStyle(snek);
  // let gridArea = style.getPropertyValue('grid-area');
  // loc = gridArea.substring(0,2);
  // var numbers = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
  // var letters = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k");
  // var randnum = numbers[Math.floor(Math.random()*numbers.length)];
  // var randlet = letters[Math.floor(Math.random()*letters.length)];
  // var value = randlet.concat(randnum.toString());
  // snek.style.gridArea = value;
});

document.onkeydown = checkKey;

function checkKey(e) {

  let snek= document.getElementById("test");
  style = window.getComputedStyle(snek);
  let gridArea = style.getPropertyValue('grid-area');

  let loc = gridArea.split(" ")[0];
  let located = loc.split("");
  let oldChar = located[0];
  located.shift();
  console.log(located.join(''));
  let oldNum = parseInt(located.join(''), 10);

  var numbers = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  var letters = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k");


  e = e || window.event;

  let newNum = oldNum;
  newNum = numbers.find(function(number) {
    if (e.keyCode == '37') {
      // left arrow
      if (oldNum === numbers[0]) {
        return number == numbers[10]
      }
      else {
        return number == (oldNum - 1);
      }
    }
    else if (e.keyCode == '39') {
      // right arrow
      if (oldNum === numbers[10]) {
        return number == numbers[0]
      }
      else {
      return number == (oldNum + 1);
      }
    }
    else {
      return number == oldNum;
    }
  });

  let newChar = oldChar;
  let place = parseInt(letters.indexOf(oldChar), 10);
  if (e.keyCode == '38') {
      // up arrow
    if (letters[place] === letters[0]) {
      newChar = letters[10];
    } else {
      newChar = letters[place - 1];
    }
  }
  else if (e.keyCode == '40') {
      // down arrow
    if (letters[place] === letters[10]) {
      newChar = letters[0];
    } else {
      newChar = letters[place + 1];
    }
  };

  var value = newChar.concat(newNum.toString());

  snek.style.gridArea = value;
}


// snake

// grid
// player_name = "bob"

// location snake = {x: 1, y: 1}
// orientation snake = {orientation: u} up(u), down(d), right(r), left(l) (beginning orientation: r)
// length snake = {length: 3}


// game flow:
//   step
//   check hit
//     if hit: stop game
//       You lost!
//        return high-score
//   check food
//     if food: speed up snake.
//   check max length
//     if max length: stop game
//       You won!
//        return high-score
//   check direction


// ##creates and runs the game
// class game
//   def initialise(name)
//     @name = name
//     @running = true
//   end
// end

// ##this defines the playingfield
// class playingfield
//   def initialise()
//     @size = {height: , length: }
//     @board = []
//   end

//   def create_board
//     number_0f_fields = @size[:height] * @size[:width]

//   end
// end


// ##creates snake instance
// class snake
//   def initialise()
//     @location = ##middle of the field at start
//     @length = ##3 at the beginning of the game
//     @orientation = 'right'
//   end

//   def change_orientation(new_direction)
//     @orientation = new_direction if permission_for_change(new_direction)
//   end

//   private

//   def permission_for_change(new_direction)
//     directions  = [new_direction, @orientation].sort
//     return false if ['left', 'right'] == directions
//     return false if ['up', 'down'] == directions
//     true
//   end
// end
