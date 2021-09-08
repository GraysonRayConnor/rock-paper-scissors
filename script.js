const gameBtns = document.querySelectorAll("[data-selection]");
const arena = document.querySelector("#arena");
const gameResultContainer = document.querySelector("#gameResultContainer");
const playerResult = document.querySelector("#playerResult");
const computerResult = document.querySelector("#computerResult");
const resultTitle = document.querySelector("#resultTitle");
const playAgain = document.querySelector("#playAgain");
const newGame = document.querySelector("#newGame");
const score = document.querySelector("#score");
const rules = document.querySelector("#rules-btn");
const closeRules = document.querySelector("#closeRules");
const rulesModal = document.querySelector(".rules-modal");
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

let scoreCount = 0;

//function that links user button selection to corresponding object in options array
gameBtns.forEach(btn => {
	btn.addEventListener("click", e => {
		arena.style.display = "none";
		gameResultContainer.style.display = "block";
		//gets button user selected
		const playerSelect = btn.dataset.selection;
		//gets user picked, returns object from 'options' array
		const option = options.find(option => option.name == playerSelect);
		makeSelection(option);
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
	arena.style.display = "flex";
	gameResultContainer.style.display = "none";
	scoreCount = 0;
	score.textContent = scoreCount;
});

function makeSelection(selection) {
	const computerSelection = computerPick();
	const youWin = isWinner(selection, computerSelection);
	const youLose = isWinner(computerSelection, selection);
	resultStyle(selection, computerSelection);
	if (youWin) {
		resultTitle.textContent = "you win";
		scoreCount++;
	} else if (youLose) {
		resultTitle.textContent = "you lose";
	} else {
		resultTitle.textContent = "tie";
	}
	score.textContent = scoreCount;
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
