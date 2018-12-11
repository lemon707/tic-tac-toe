class Game {
  constructor() {
    this.board = new Board()
  }

  reset() {
    this.board.clear()
  }
}

class Board {
  constructor() {
    this.size = 3
    this.turn = true
    this.winner = null
    this.squares = []
  }

  createBoard() {
    let game,
    board,
    counter

    game = document.getElementById("game")
    board = document.getElementById("board")

    if(board) game.removeChild(board)

    document.getElementById("status").innerHTML = `Turn: ${this.turn ? "O" : "X"}`

    board = document.createElement("table")
    board.id = "board"
    game.appendChild(board)

    counter = 0

    for (let i = 0; i < this.size; i++) {
      const row = document.createElement("tr")

      for(let j = 0; j < this.size; j++) {
        this.squares.push(new Square())

        const col = document.createElement("td")
        col.id = counter
        row.appendChild(col)

        col.addEventListener("click", ((k) => {
          return () => {
            !this.winner ? this.handleClick(k) : null
          }
        })(counter))

        counter++
      }

      board.appendChild(row)
    }
  }

  checkWinner(squares) {
    const combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

    for(let i = 0; i < combos.length; i++) {
      const line = combos[i]
      const a = this.squares[line[0]].state
      const b = this.squares[line[1]].state
      const c = this.squares[line[2]].state

      if(a && b && c && (a === b) && (b === c)) {
        line.forEach(id => {
          document.getElementById(id).style.borderColor = "green"
          document.getElementById(id).style.backgroundColor = "lightgreen"
        })
        return a
      }
    }

    if(this.squares.every(square => square.state)) return "draw"

    return null
  }

  handleClick(i) {
    if(this.squares[i].state) return null

    this.squares[i].state = this.turn ? "O" : "X"
    this.turn = !this.turn

    document.getElementById("status").innerHTML = `Turn: ${this.turn ? "O" : "X"}`
    document.getElementById(i).innerHTML = this.squares[i].state

    this.winner = this.checkWinner(this.squares)

    if(this.winner) {
      document.getElementById("status").innerHTML = `Winner: ${this.winner}`
      return null
    }
  }

  clear() {
    this.squares = []
    this.turn = true
    this.winner = null
    this.createBoard()
  }
}

class Square {
  constructor() {
    this.state = null
  }
}
