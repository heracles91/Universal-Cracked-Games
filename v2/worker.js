let interval = {}; // Object to store mutilple intervals

// Handle messages from the main script
self.onmessage = (e) => {
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
				self.postMessage({ type: "sale", data: saleOutput });
			}, 500);
		}

		if (!intervals.autocrack && autocracker > 0) {
			intervals.autocrack = setIntervals(() => {
				const autocrackOutput = {
					crackedGames: autocracker * crackRate,
					stock: autocracker * crackRate
				};
				self.postMessage({ type: "autocracker", data: autocrakerOutput });
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
		}
	}
};			