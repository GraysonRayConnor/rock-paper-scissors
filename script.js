const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const arena = document.querySelector(".arena");
const winLoseContainer = document.querySelector(".win-lose-container");

rock.addEventListener("click", e => {
	e.preventDefault();
	step2("rock", computerPick(0, "paper"));
});

paper.addEventListener("click", e => {
	e.preventDefault();
	step2("paper", computerPick(1, "rock"));
});

scissors.addEventListener("click", e => {
	e.preventDefault();
	step2("scissors", computerPick(2, "paper"));
});

//reset.addEventListener("click", () => {

//rock.style.display = "block";
//paper.style.display = "block";
//scissors.style.display = "block";
//arena.style.background = "url(images/bg-triangle.svg)";
//});

function step2(pick, computerPick) {
	rock.style.display = "none";
	paper.style.display = "none";
	scissors.style.display = "none";
	arena.style.background = "none";
	const step2Area = document.createElement("div");
	step2Area.classList.add("step2Area");
	const titleContainer = document.createElement("div");
	const outputContainer = document.createElement("div");
	titleContainer.classList.add("titleContainer");
	outputContainer.classList.add("outputContainer");

	//player pick
	const pickArea = document.createElement("div");
	pickArea.classList.add("pickStyle");
	pickArea.classList.add("pickArea");
	const pickedImg = document.createElement("img");
	pickedImg.classList.add("pickedImg");
	pickedImg.src = `images/icon-${pick}.svg`;
	pickArea.append(pickedImg);
	const pickTitle = document.createElement("span");
	pickTitle.classList.add("pickTitle");
	pickTitle.textContent = "You picked...";
	titleContainer.append(pickTitle);
	//computer pick
	const computerPickArea = document.createElement("div");
	computerPickArea.classList.add("pickStyle");
	computerPickArea.classList.add("computerPickArea");
	const computerPickedImg = document.createElement("img");
	computerPickedImg.classList.add("computerPickedImg");
	computerPickedImg.src = `images/icon-${computerPick}.svg`;
	computerPickArea.append(computerPickedImg);
	const computerPickTitle = document.createElement("span");
	computerPickTitle.classList.add("pickTitle");
	computerPickTitle.textContent = "House picked...";
	titleContainer.append(computerPickTitle);
	//section build
	outputContainer.append(pickArea);
	outputContainer.append(computerPickArea);
	step2Area.append(outputContainer);
	step2Area.append(titleContainer);
	arena.append(step2Area);

	//logic
	if (pick === "rock" && computerPick === "paper") {
		winLose("YOU LOSE");
	} else if (pick === "rock" && computerPick === "scissors") {
		winLose("YOU WIN");
	}

	if (pick === "paper" && computerPick === "scissors") {
		winLose("YOU LOSE");
	} else if (pick === "paper" && computerPick === "rock") {
		winLose("YOU WIN");
	}

	if (pick === "scissors" && computerPick === "rock") {
		winLose("YOU LOSE");
	} else if (pick === "scissors" && computerPick === "paper") {
		winLose("YOU WIN");
	}
}

function winLose(winLose) {
	winLoseContainer.style.display = "flex";
	const result = document.createElement("span");
	result.classList.add("result");
	result.textContent = `${winLose}`;
	const playAgain = document.createElement("button");
	playAgain.textContent = "Play Again";
	playAgain.classList.add("playAgain");
	winLoseContainer.append(result);
	winLoseContainer.append(playAgain);
	playAgain.onclick = reset();
}

function reset(e) {
	e.preventDefault;
	console.log("working");
}

function computerPick(playerPick, alternative) {
	let rando = Math.floor(Math.random() * 3);
	if (rando === 0 && rando !== playerPick) {
		return "rock";
	} else if (rando === 1 && rando !== playerPick) {
		return "paper";
	} else if (rando === 2 && rando !== playerPick) {
		return "scissors";
	} else {
		return alternative;
	}
}
