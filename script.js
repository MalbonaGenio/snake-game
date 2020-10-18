const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')

let squares = []
let snakePosition = [15,14,13]
let direction = 1 // sets the direction where the snake is moving.

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
  //remove the tail of the snake and then we store it to remove the styling of that square
  const tailPosition = snakePosition.pop() 
  squares[tailPosition].classList.remove('snake')
  //add the head of the snake on the first index of the snakePosition array. Then style that number in the squares array.
  snakePosition.unshift(snakePosition[0] + direction)
  squares[snakePosition[0]].classList.add('snake')
}

move()

const timer = setInterval(move, 1000)

