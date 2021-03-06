const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')

let squares = []
let snakePosition = [35,34,33]
let direction = 1 // sets the direction where the snake is moving.
let gameWidth = 10 //sets the witdh of the grid for up and down movement
let applePosition = 0 
let score = 0
let timeInterval = 1000 //set the timer for the movement of the snake.
let timer = 0 //declares 
let speed = 0.9 // value used to speed up the game every time an apple is eaten.

function createGrid() {
  for (let i = 0; i < gameWidth * gameWidth; i++){
    const square = document.createElement("div")
    square.classList.add("square")
    grid.append(square)
    squares.push(square)
  }
}

createGrid()

// change the style on the squares array on the indexes specified by snake position.
snakePosition.forEach(index => squares[index].classList.add("snake"))

function startGame() {
  clearInterval(timer)
  snakePosition.forEach(index => squares[index].classList.remove('snake')) //same forEach as we use to add the class snake to squares from snakePosition
  squares[applePosition].classList.remove('apple')
  direction = 1
  score = 0
  scoreDisplay.textContent = score
  timeInterval = 1000
  snakePosition = [35,34,33]
  snakePosition.forEach(index => squares[index].classList.add('snake')) //reads the snake
  genApple()
  timer = setInterval(move, 1000)
}

function move() {

  //If the position is more or equal to 100 or less than 0 and the direction we are out of the grid. If the modulo is equal to 0 (left side of the grid) or 9 (right side of the grid) and the direction is towards the respective boundary we are out of the grid. If the head of the snake is on a square with the style snake it has folded over itself.
  if (
    (snakePosition[0] + gameWidth >= gameWidth * gameWidth && direction === gameWidth) || //hit bottom
    (snakePosition[0] % gameWidth === gameWidth - 1 && direction === 1) || //hit right wall
    (snakePosition[0] % gameWidth === 0 && direction === -1) || //hit left wall
    (snakePosition[0] - gameWidth < 0 && direction === -gameWidth) ||//hit top
    squares[snakePosition[0] + direction].classList.contains('snake') //fold on itself
    )
    return clearInterval(timer) // Stop timer

  //remove the tail of the snake and then we store it to remove the styling of that square
  const tailPosition = snakePosition.pop() 
  squares[tailPosition].classList.remove('snake')
  //add the head of the snake on the first index of the snakePosition array. Then style that number in the squares array.
  snakePosition.unshift(snakePosition[0] + direction)

  //when apple is eaten snake grows by 1, score goes up by 1 and timeInterval decreseases by the value set at speed.
  
  if (squares[snakePosition[0]].classList.contains('apple')) {
    squares[snakePosition[0]].classList.remove('apple')
    squares[tailPosition].classList.add('snake')
    snakePosition.push(tailPosition)
    genApple()
    score++
    scoreDisplay.textContent = score //update the html side with the new score.
    clearInterval(timer)
    timeInterval = timeInterval * speed
    timer = setInterval(move, timeInterval)
    }
  squares[snakePosition[0]].classList.add('snake')
}



function genApple (){
  do {
    applePosition = Math.floor(Math.random() * squares.length)

  } while (squares[applePosition].classList.contains('snake'))
  squares[applePosition].classList.add('apple')
}

genApple()



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
startButton.addEventListener('click', startGame)