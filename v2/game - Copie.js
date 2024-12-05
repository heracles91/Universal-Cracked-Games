let stock = 0;
let crackedGames = 0;
let money = 0.00;

let hackerCost = 27.45;
let crackRate = 1;

let autocrackerCost = 98.99;
let autocracker = 0;

// Initialize the worker
//const worker = new Worker("worker.js");
var blobURL = URL.createObjectURL( new Blob([ "(", function() {
    console.log("Works!");
}.toString(), ")()" ], { type: 'application/javascript' } ))

var worker = new Worker(blobURL);// Track worker data
let workerData = {
	autocracker: 0,
	crackRate: 1,
	stock: 0
};


// Start the worker when the game begins
//worker.postMessage({ action: "start", data: workerData });
// ================================================================================================
let interval = {}; // Object to store mutilple intervals

// Handle messages from the main script
worker.onmessage = (e) => {
	const { action, data } = e.data;

	if (action === "start") {
		const { autocracker, crackRate, stock } = data;

		// Interval for auto-selling
		if (!intervals.sale && stock > 0) {
			intervals.sale = setInterval(() => {
				const saleOutput = {
					stock: 0,
					money: 0
				};
				saleOutput.stock = crackRate;
				saleOutput.money = crackRate * Math.random()*(10 + crackRate); // Game price between 0 to $10
				worker.postMessage({ type: "sale", data: saleOutput });
			}, 500);
		}

		if (!intervals.autocrack && autocracker > 0) {
			intervals.autocrack = setIntervals(() => {
				const autocrackOutput = {
					crackedGames: autocracker * crackRate,
					stock: autocracker * crackRate
				};
				worker.postMessage({ type: "autocracker", data: autocrakerOutput });
			}, 5000);
		}
	}

	if (action === "stop") {
		// Clear all intervals
		for (let key in intervals) {
			clearInterval(intervals[key]);
		}
		intervals = {}
	}

	if (action === "update") {
		// Handle updates to worker data
		if (1 > 2){
			console.log("Error");
		} else {
			console.log("Ok?..");
		}
	}
};
worker.postMessage({ action: "start", data: workerData });
// ================================================================================================


document.getElementById('crackButton').onclick = () => {
	crackedGames += crackRate;
	stock += crackRate;

	document.title = `Cracked Games: ${crackedGames}`;
	updateDisplay();
	updateWorkerData();
};

function updateDisplay() {
	document.getElementById('stock').innerText = stock;
	document.getElementById('games').innerText = crackedGames;
	document.getElementById('money').innerText = money.toFixed(2);
	document.getElementById('hacker').innerText = hackerCost;
	document.getElementById('autocracker').innerText = autocrackerCost;


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
}

document.getElementById('buyHacker').onclick = () => {
	if (money >= hackerCost) {
		money -= hackerCost;
		crackRate++;
		hackerCost *= 2;
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

function updateWorkerData() {
	const workerData = {
		autocracker: autocracker,
		crackRate: crackRate,
		stock: stock                                                                                                                                                                                                                                                                                                                                                                                                                
	};

	worker.postMessage({ action: "update", data: workerData });
}

// worker.onmessage handles outputs from the worker
worker.onmessage = (e) => {
	const { type, data } = e.data;

	if (type === "autocrack") {
		// Autocrack logic
		crackedGames += data.crackedGames;
		stock += data.stock;
		document.title = `Cracked Games: ${data.crackedGames}`;
	}

	if (type === "sale") {
		// Sale logic
		if (stock - crackRate < 0) {
			stock = 0;
		} else {
			stock -= data.stock;
		}
		money += data.money;
	}

	updateDisplay;
};

window.onload = () => {
	updateDisplay();
};