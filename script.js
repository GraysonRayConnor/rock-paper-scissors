const gameBtns = document.querySelectorAll("[data-selection]");
const options = [
	{
		name: "rock",
		img: "images/icon-rock.svg",
		beats: "scissors"
	},
	{
		name: "paper",
		img: "images/icon-paper.svg",
		beats: "rock"
	},
	{
		name: "scissors",
		img: "images/icon-rock.svg",
		beats: "paper"
	}
];

//function that links user button selection to corresponding object in options array
gameBtns.forEach(btn => {
	btn.addEventListener("click", e => {
		//gets button user selected
		const playerSelect = btn.dataset.selection;
		//gets user picked, returns object from 'options' array
		const option = options.find(option => option.name == playerSelect);
		makeSelection(option);
	});
});

function makeSelection(selection) {
	const computerSelection = computerPick();
	const youWin = isWinner(selection, computerSelection);
	const youLose = isWinner(computerSelection, selection);
	console.log(computerSelection);
}

function isWinner(selection, computerSelection) {
	return selection.beats === computerSelection.name;
}

function computerPick() {
	const rando = Math.floor(Math.random() * options.length);
	return options[rando];
}
