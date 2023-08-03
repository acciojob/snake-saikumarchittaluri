//your code here
document.addEventListener("DOMContentLoaded", () => {
	const gameContainer = document.getElementById("gameContainer");
	let snake = [{ row: 20, col: 1 }]; // Starting position of the snake
	let food = null;
	let direction = "right";
	let score = 0;
	const speed = 100; // Snake speed (1 pixel in 100ms)

	function createPixel(row, col, className) {
		const pixel = document.createElement("div");
		pixel.id = `pixel${row}_${col}`;
		pixel.classList.add(className);
		gameContainer.appendChild(pixel);
	}

	function drawSnake() {
		snake.forEach((segment) => {
			const { row, col } = segment;
			const pixel = document.getElementById(`pixel${row}_${col}`);
			pixel.classList.add("snakeBodyPixel");
		});
	}

	function generateFood() {
		const row = Math.floor(Math.random() * 40) + 1;
		const col = Math.floor(Math.random() * 40) + 1;
		food = { row, col };
		const pixel = document.getElementById(`pixel${row}_${col}`);
		pixel.classList.add("food");
	}

	function moveSnake() {
		const head = { ...snake[0] };

		switch (direction) {
			case "up":
				head.row--;
				break;
			case "down":
				head.row++;
				break;
			case "left":
				head.col--;
				break;
			case "right":
				head.col++;
				break;
		}

		snake.unshift(head);

		const tail = snake.pop();
		const tailPixel = document.getElementById(`pixel${tail.row}_${tail.col}`);
		tailPixel.classList.remove("snakeBodyPixel");

		checkCollision();
		checkFood();
		drawSnake();
	}

	function checkCollision() {
		const head = snake[0];

		// Check for collision with the boundary
		if (head.row <= 0 || head.row > 40 || head.col <= 0 || head.col > 40) {
			gameOver();
		}

		// Check for collision with the snake body
		const body = snake.slice(1);
		if (body.some(segment => segment.row === head.row && segment.col === head.col)) {
			gameOver();
		}
	}

	function checkFood() {
		const head = snake[0];
		if (head.row === food.row && head.col === food.col) {
			// Increase score and update scoreboard
			score++;
			const scoreBoard = document.getElementById("scoreBoard");
			scoreBoard.textContent = `Score: ${score}`;

			// Generate new food
			const foodPixel = document.getElementById(`pixel${food.row}_${food.col}`);
			foodPixel.classList.remove("food");
			generateFood();

			// Grow the snake
			const newTail = { ...snake[snake.length - 1] };
			snake.push(newTail);
		}
	}

	function gameOver() {
		clearInterval(gameInterval);
		alert("Game Over!");
	}

	// Create pixels
	for (let i = 1; i <= 40; i++) {
		for (let j = 1; j <= 40; j++) {
			createPixel(i, j, "pixel");
		}
	}

	// Generate initial snake
	drawSnake();

	// Generate initial food
	generateFood();

	// Start moving the snake automatically
	const gameInterval = setInterval(moveSnake, speed);

	// Handle arrow key presses to change snake direction
	document.addEventListener("keydown", (event) => {
		switch (event.key) {
			case "ArrowUp":
				direction = "up";
				break;
			case "ArrowDown":
				direction = "down";
				break;
			case "ArrowLeft":
				direction = "left";
				break;
			case "ArrowRight":
				direction = "right";
				break;
		}
	});

	// Initialize the scoreboard
	const scoreBoard = document.createElement("div");
	scoreBoard.classList.add("scoreBoard");
	scoreBoard.textContent = "Score: 0";
	gameContainer.appendChild(scoreBoard);
});

