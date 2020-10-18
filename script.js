const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')

let squares = []
let snakePosition = [13,14,15]

function createGrid() {
  for (let i = 0; i < 100; i++){
    const square = document.createElement("div")
    square.classList.add("square")
    grid.append(square)
    squares.push(square)
  }
}

createGrid()

// we change the style on the squares array on the indexes specified by snake position.
snakePosition.forEach(index => squares[index].classList.add("snake"))

