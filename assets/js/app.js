document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  const squares = document.querySelectorAll(".grid div");
  const scoreBoard = document.querySelector("#scoreBoard");

  const width = 10;
  let currentIndex = 0; //snake head start at first div in the grid
  let appleIndex = 0; //apple position start at first div in the grid
  let currentSnake = [2, 1, 0]; // 2 = head, 1 = body , 0 = tail
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  //To start the game
  function startGame() {
    currentSnake.forEach((index) => {
      squares[index].classList.remove("snake");
      squares[appleIndex].classList.remove("apple");
      clearInterval(interval);
      score = 0;
      //randomApple();
      direction = 1;
      scoreBoard.innerHTML = score;
      intervalTime = 1000;
      currentSnake = [2, 1, 0];
      currentIndex = 0;
      currentSnake.forEach((index) => {
        squares[index].classList.add("snake");
        interval = setInterval(moveOutcomes, intervalTime);
      });
    });
  }

  //cover outcomes
  function moveOutcomes() {
    //when snake hits his head
    if (
      (currentSnake[0] + width >= width * width && direction === width) || //hits bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || //hits right
      (currentSnake[0] % width === 0 && direction === -1) || //hits left
      (currentSnake[0] - width < 0 && direction === -width) || //hits top
      squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
      return clearInterval(interval);
    }

    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0].classList].contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      //randomApple();
    }
  }

  document.addEventListener("keyup", (event) => {
    squares[currentIndex].classList.remove("snake");

    if (event.keyCode === 39) {
      direction = 1; //if user press right arrow btn ahead 1 time
    } else if (event.keyCode === 38) {
      direction = -width; //if user press up arrow btn go back 10 times
    } else if (event.keyCode === 37) {
      direction = -1; //if user press left arrow btn go back 1 time
    } else if (event.target === 40) {
      direction = width; //if user press down arrow btn go ahead 10 times
    }
  });
});
