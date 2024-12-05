let stock = 0;
let crackedGames = 0;
let money = 0.00;

let hackerCost = 270.45;
let crackRate = 1;

let autocrackerCost = 998.99;
let autocracker = 0;

let electricity = 500;
let billCost = 500;

document.getElementById('crackButton').onclick = () => {
	if (electricity > 0) {
		crackedGames += crackRate;
		stock += crackRate;
		if (electricity - crackRate < 0) {
			electricity = 0;
		} else {
			electricity -= crackRate; // crackRate = number of Hacker "in the room"
		}

		document.title = `Cracked Games: ${crackedGames}`;
		updateDisplay();
	} else {
		logAction("You have to pay the electricity bill!");
	}
};

function updateDisplay() {
	moveBar(electricity);
	document.getElementById('stock').innerText = stock.toLocaleString("fr-FR");
	document.getElementById('games').innerText = crackedGames.toLocaleString("fr-FR");
	document.getElementById('money').innerText = money.toLocaleString("en-US", {style:"currency", currency:"USD"});
	document.getElementById('hacker').innerText = hackerCost.toLocaleString("en-US", {style:"currency", currency:"USD"});
	document.getElementById('autocracker').innerText = autocrackerCost.toLocaleString("en-US", {style:"currency", currency:"USD"});
	document.getElementById('billCost').innerText = billCost.toLocaleString("en-US", {style:"currency", currency:"USD"});

	document.title = `Cracked Games: ${crackedGames.toLocaleString("fr-FR")}`;


	if (money >= hackerCost) {
		document.getElementById('buyHacker').style.display = 'inline-block';
	} else {
		document.getElementById('buyHacker').style.display = 'none';
	}
	if (money >= autocrackerCost) {
		document.getElementById('buyAutocracker').style.display = 'inline-block';
	} else {
		document.getElementById('buyAutocracker').style.display = 'none';
	}

	if (electricity <= 0) {
		document.getElementById('payBill').style.display = 'inline-block';
	} else {
		document.getElementById('payBill').style.display = 'none';
	}
}

document.getElementById('buyHacker').onclick = () => {
	if (money >= hackerCost) {
		money -= hackerCost;
		crackRate++;
		hackerCost *= 2;
		billCost = 500 * crackRate;
		logAction('Engaged a Hacker');
		updateDisplay();
	} else {
		alert("Not enough money to buy hacker!");
	}
};

document.getElementById('buyAutocracker').onclick = () => {
	if (money >= autocrackerCost) {
		money -= autocrackerCost;
		autocracker++;
		autocrackerCost *= 2;
		logAction('Bought an Autocracker Software');
		updateDisplay();
	};
};

document.getElementById('payBill').onclick = () => {
	if (money >= billCost) {
		money -= billCost;
		electricity += 500 * crackRate;
		moveBar();
		logAction('Paid electricity bill');
		updateDisplay();
	}
};

function logAction(action) {
	const logContainer = document.getElementById('logContainer');
	const logEntry = document.createElement('div');

	const now = new Date();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	const timestamp = `${hours}:${minutes}:${seconds}`;

	logEntry.innerText = `${timestamp} - ${action}`;

	logContainer.appendChild(logEntry);
	logContainer.scrollTop = logContainer.scrollHeight;
}

function moveBar(watts) {
	var elem = document.getElementById("electricityBar");
	elem.style.width = Math.round(watts/(5*crackRate)) + "%";
	elem.innerHTML = watts.toLocaleString("fr-FR") + " W";
} 

setInterval(() => {
	if (stock > 0) {
		if (stock - crackRate < 0) {
			stock = 0;
		} else {
			stock -= crackRate;
		}
		money += crackRate * Math.random()*(10 + crackRate); // Game price between 0 to $10
		updateDisplay();
	}
}, 500);

setInterval(() => {
	if (autocracker > 0 && electricity > 0) {
		crackedGames += autocracker * crackRate;
		stock += autocracker * crackRate;
		if (electricity - crackRate < 0) {
			electricity = 0;
		} else {
			electricity -= crackRate;
		}
		updateDisplay();
	}
}, 5000);

setInterval(() => {
	if (electricity > 0) {
		electricity--;
		updateDisplay();
	}
}, 1000);

window.onload = () => {
	updateDisplay();
};