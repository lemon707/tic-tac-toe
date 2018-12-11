document.addEventListener("DOMContentLoaded", function() {
  const game = new Game()
  game.board.createBoard()

  const reset = document.getElementById("reset")
  reset.addEventListener("click", () => game.reset())  
})
