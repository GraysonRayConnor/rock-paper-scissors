const gameBtns = document.querySelectorAll("[data-selection]");
const arena = document.querySelector("#arena");
const gameResultContainer = document.querySelector("#gameResultContainer");
const playerResult = document.querySelector("#playerResult");
const computerResult = document.querySelector("#computerResult");
const resultTitle = document.querySelector("#resultTitle");
const resultBtns = document.querySelector("#resultBtns");
const playAgain = document.querySelector("#playAgain");
const newGame = document.querySelector("#newGame");
const playerScoreOp = document.querySelector("#playerScoreOp");
const computerScoreOp = document.querySelector("#computerScoreOp");
const rules = document.querySelector("#rules-btn");
const closeRules = document.querySelector("#closeRules");
const rulesModal = document.querySelector(".rules-modal");
const bestOfThreeCheck = document.querySelector("#bestOfThree");
const bestOfThreeOp = document.querySelector("#bestOfThreeOp");
const scoreBox = document.querySelector(".score-box");
const bestOfThreeCount = document.querySelector("#bestOfThreeCount");
const options = [
	{
		name: "rock",
		img: "images/icon-rock.svg",
		beats: "scissors",
		border: "hsl(349, 71%, 52%)"
	},
	{
		name: "paper",
		img: "images/icon-paper.svg",
		beats: "rock",
		border: "hsl(230, 89%, 62%)"
	},
	{
		name: "scissors",
		img: "images/icon-scissors.svg",
		beats: "paper",
		border: "hsl(39, 89%, 49%)"
	}
];

let playerScore = 0;
let computerScore = 0;
let round = 0;

//function that links user button selection to corresponding object in options array
gameBtns.forEach(btn => {
	btn.addEventListener("click", e => {
		arena.style.display = "none";
		gameResultContainer.style.display = "block";
		//gets button user selected
		const playerSelect = btn.dataset.selection;
		//gets user picked, returns object from 'options' array
		const option = options.find(option => option.name == playerSelect);
		if (bestOfThreeCheck.checked === true) {
			bestOfThree(option);
		} else {
			makeSelection(option);
		}
	});
});

playAgain.addEventListener("click", () => {
	arena.style.display = "flex";
	gameResultContainer.style.display = "none";
});

rules.addEventListener("click", () => {
	rulesModal.style.display = "flex";
});

closeRules.addEventListener("click", () => {
	rulesModal.style.display = "none";
});

newGame.addEventListener("click", () => {
	startNewGame();
});

bestOfThreeCheck.addEventListener("change", () => {
	if (bestOfThreeCheck.checked == true) {
		bestOfThreeOp.style.display = "block";
		scoreBox.classList.add("bestOfThreeOn");
	} else {
		bestOfThreeOp.style.display = "none";
		scoreBox.classList.remove("bestOfThreeOn");
	}
	startNewGame();
});

function startNewGame() {
	arena.style.display = "flex";
	gameResultContainer.style.display = "none";
	playerScore = 0;
	computerScore = 0;
	playerScoreOp.textContent = playerScore;
	computerScoreOp.textContent = computerScore;
	playerScoreOp.style.color = "black";
	computerScoreOp.style.color = "black";
	playAgain.style.display = "block";
	newGame.style.display = "block";
	playAgain.textContent = "play again";
	newGame.textContent = "reset score";
	resultBtns.style.justifyContent = "space-between";
	round = 0;
	bestOfThreeCount.textContent = `${round}`;
	resultTitle.style.fontSize = "5rem";
	resultTitle.style.color = "white";
}

function makeSelection(selection) {
	let computerSelection = computerPick();
	let youWin = isWinner(selection, computerSelection);
	let youLose = isWinner(computerSelection, selection);
	resultStyle(selection, computerSelection);
	if (youWin) {
		resultTitle.textContent = "you win";
		playerScore++;
	} else if (youLose) {
		resultTitle.textContent = "you lose";
		computerScore++;
	} else {
		resultTitle.textContent = "tie";
	}
	playerScoreOp.textContent = playerScore;
	computerScoreOp.textContent = computerScore;
}

function bestOfThree(selection) {
	let computerSelection = computerPick();
	let youWin = isWinner(selection, computerSelection);
	let youLose = isWinner(computerSelection, selection);
	resultTitle.style.fontSize = "3rem";
	newGame.style.display = "none";
	resultBtns.style.justifyContent = "center";
	playAgain.textContent = "next round";
	newGame.textContent = "new game";
	resultStyle(selection, computerSelection);
	if (youWin) {
		round++;
		resultTitle.textContent = `you win round ${round}`;
		playerScore++;
		if (playerScore >= 2) {
			bestOfThreeWin("player");
		}
	}
	if (youLose) {
		round++;
		resultTitle.textContent = `house wins round ${round}`;
		computerScore++;
		if (computerScore >= 2) {
			bestOfThreeWin("computer");
		}
	}
	if (selection === computerSelection) {
		resultTitle.textContent = "tie";
	}
	playerScoreOp.textContent = playerScore;
	computerScoreOp.textContent = computerScore;
	bestOfThreeCount.textContent = `${round}`;
}

function bestOfThreeWin(player) {
	newGame.style.display = "block";
	playAgain.style.display = "none";
	if (player === "player") {
		playerScoreOp.style.color = "green";
		resultTitle.textContent = "you win";
		resultTitle.style.color = "green";
	}
	if (player === "computer") {
		computerScoreOp.style.color = "red";
		resultTitle.textContent = "house wins";
		resultTitle.style.color = "red";
	}
}

function isWinner(selection, computerSelection) {
	return selection.beats === computerSelection.name;
}

function resultStyle(player, computer) {
	computerResult.src = computer.img;
	playerResult.src = player.img;
	computerResult.style.borderColor = computer.border;
	playerResult.style.borderColor = player.border;
}

function computerPick() {
	const rando = Math.floor(Math.random() * options.length);
	return options[rando];
}
