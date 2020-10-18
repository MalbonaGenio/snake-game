const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')

let squares = []
let snakePosition = [15,14,13]
let direction = 1 // sets the direction where the snake is moving.
let gameWidth = 10 //sets the witdh of the grid for up and down movement

function createGrid() {
  for (let i = 0; i < 100; i++){
    const square = document.createElement("div")
    square.classList.add("square")
    grid.append(square)
    squares.push(square)
  }
}

createGrid()

// change the style on the squares array on the indexes specified by snake position.
snakePosition.forEach(index => squares[index].classList.add("snake"))

function move() {

  //If the position is more or equal to 100 or less than 0 and the direction we are out of the grid. If the modulo is equal to 0 (left side of the grid) or 9 (right side of the grid) and the direction is towards the respective boundary we are out of the grid. If the head of the snake is on a square with the style snake it has folded over itself.
  if (
    (snakePosition[0] + gameWidth >= 100 && direction === 10) || //hit bottom
    (snakePosition[0] % gameWidth === 9 && direction === 1) || //hit right wall
    (snakePosition[0] % gameWidth === 0 && direction === -1) || //hit left wall
    (snakePosition[0] - gameWidth < 0 && direction === -10) ||//hit top
    squares[snakePosition[0] + direction].classList.contains('snake') //fold on itself
    )
    return clearInterval(timer) // Stop timer

  //remove the tail of the snake and then we store it to remove the styling of that square
  const tailPosition = snakePosition.pop() 
  squares[tailPosition].classList.remove('snake')
  //add the head of the snake on the first index of the snakePosition array. Then style that number in the squares array.
  snakePosition.unshift(snakePosition[0] + direction)
  squares[snakePosition[0]].classList.add('snake')
}

move()

const timer = setInterval(move, 1000)
// Keyboard keycodes:
// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

//Attach the keycode to the eventlinster. Then assigning a new value to direction we modify the next value on the snakePosition array which result in moving in the desired position.

function control(key) {
    if (key.keyCode === 39) {
      direction = 1
    } else if (key.keyCode === 38){
      direction = -gameWidth
    } else if (key.keyCode === 37){
      direction = -1
    } else if (key.keyCode === 40){
      direction = +gameWidth
    }
}

document.addEventListener("keydown", control)