// Initialize core variables for the game state
let games = 0;                 // Number of games cracked by the player
let money = 0.00;              // Player's current money
let totalGames = 0;            // Total number of games cracked (for stats)
let crackRate = 1;             // Rate at which the player cracks games (starts at 1)
let sellRate = 1;             // Rate at which the player sells games (starts at 1)
let autocrackers = 0;          // Number of autocrackers the player has
let upgrades = 0;              // Number of upgrades the player has bought
let upgradeCost = 50.00;      // Initial cost for the first upgrade
let autocrackerCost = 100.00; // Initial cost for the first autocracker
let sellPrice = 1.50;              // Default price for cracked games
let publicDemand = 100;         // Public demand for cracked games (starts at 100%)
let marketing = 100               // Marketing level
let marketingCost = 500;        // Initial cost for the first marketing
// Kind of achievements
let unlocks = {
    "gameVersion2": false,
    "localization": false,
    "antiPiracy": false,
    "marketingCampaign": false,
    "merchandiseStore": false,
    "serverHosting": false,
    "communityEvents": false,
    "patchSystem": false,
    "expansionPacks": false,
    "achievements": false,
    "virtualEconomy": false,
    "legalDefenseFund": false
};

// Player clicks the "Crack a Game" button
document.getElementById('crackButton').onclick = () => {
    games += crackRate;         // Increase the number of cracked games by crackRate
    totalGames += crackRate;    // Update the total number of cracked games
    updateDisplay();            // Refresh the displayed stats
};

// Player clicks to buy a Hacker
document.getElementById('buyUpgrade').onclick = () => {
    if (money >= upgradeCost) {    // Check if the player has enough money to buy the upgrade
        money -= upgradeCost;      // Subtract the upgrade cost from the player's money
        crackRate++;               // Increase the crack rate by 1 (faster game cracking)
        upgrades++;                // Increase the number of upgrades the player has
        upgradeCost *= 2;          // Double the cost for the next upgrade
        logAction('Engaged a Hacker'); // Log the purchase action
        playButtonSound();         // Play a sound when the button is clicked
        updateDisplay();           // Refresh the displayed stats
    } else {
        alert("Not enough money to buy upgrade!"); // Alert if the player doesn't have enough money
    }
};

// Player clicks to buy an autocracker
document.getElementById('buyautocracker').onclick = () => {
    if (money >= autocrackerCost) {  // Check if the player has enough money to buy an autocracker
        money -= autocrackerCost;    // Subtract the autocracker cost from the player's money
        autocrackers++;              // Increase the number of autocrackers the player has
        autocrackerCost *= 2;        // Double the cost for the next autocracker
        logAction('Bought an autocracker'); // Log the purchase action
        playButtonSound();           // Play a sound when the button is clicked
        updateDisplay();             // Refresh the displayed stats
    } else {
        alert("Not enough money to buy autocracker!"); // Alert if the player doesn't have enough money
    }
};

// Player clicks to buy marketing
document.getElementById('buyMarketing').onclick = () => {
    if (money >= marketingCost) {  // Check if the player has enough money to buy an marketing
        money -= marketingCost;    // Subtract the marketing cost from the player's money
        marketing += 4000;              // Increase the number of marketings the player has
        marketingCost *= 4;        // Double the cost for the next marketing
        logAction('Upgraded marketing'); // Log the purchase action
        playButtonSound();           // Play a sound when the button is clicked
        updatePublicDemand()        // Refresh the public demand stat
        updateDisplay();             // Refresh the displayed stats
    } else {
        alert("Not enough money to upgrade marketing!"); // Alert if the player doesn't have enough money
    }
};

// Player adjusts the sell price using a slider
document.getElementById('sellPriceInput').oninput = (e) => {
    sellPrice = parseFloat(e.target.value); // Update the sell price based on slider value
    document.getElementById('sellPriceValue').innerText = sellPrice.toFixed(2); // Display the selected price
    updatePublicDemand(); // Update the public demand based on the sell price
};

// Adjust public demand based on the sell price
function updatePublicDemand() {
    publicDemand = ((150+marketing) / (Math.pow(sellPrice, 2) + 1)) + (150+marketing) * Math.exp(-sellPrice);
    document.getElementById('publicDemandPercentage').innerText = publicDemand.toFixed(2) + "%";
}

function checkUnlocks() {
    // Unlock features based on total cracked games
    if (totalGames >= 1000 && !unlocks.gameVersion2) {
        unlocks.gameVersion2 = true;
        logAction("============================================");
        logAction("\nUNLOCKED: Game Version 2.0\n\nDESCRIPTION: Unlocked the ability to release a new and improved version of their cracked game, attracting more attention and boosting sales.\n\nEFFECT: Increased price and sales rate for cracked games");
        logAction("============================================");
        marketing += 5000;
        sellRate += 0.25;
        playButtonSound();
    }
    if (totalGames >= 2000 && !unlocks.localization) {
        unlocks.localization = true;
        logAction("============================================");
        logAction("\nUNLOCKED: Localization\n\nDESCRIPTION: Unlocked the ability to localize cracked game into different languages, increasing its reach globally.\n\nEFFECT: Multiplies sales from international markets, giving a global boost to the game's sales.");
        logAction("============================================");
        sellRate += 0.25;
        playButtonSound();
    }
    if (totalGames >= 3000 && !unlocks.antiPiracy) {
        unlocks.antiPiracy = true;
        logAction("UNLOCKED: Anti-Piracy Measures");
    }
    if (totalGames >= 5000 && !unlocks.marketingCampaign) {
        unlocks.marketingCampaign = true;
        logAction("UNLOCKED: Marketing Campaign");
    }
    if (totalGames >= 6000 && !unlocks.merchandiseStore) {
        unlocks.merchandiseStore = true;
        logAction("UNLOCKED: Merchandise Store");
    }
    updateDisplay();
}

// Play a button click sound
function playButtonSound() {
    const buttonClickSound = document.getElementById('buttonClickSound');
    buttonClickSound.play();
}

// Function to log actions with a timestamp
function logAction(action) {
    const logContainer = document.getElementById('logContainer');
    const logEntry = document.createElement('div');

    // Get the current time (HH:MM:SS)
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${hours}:${minutes}:${seconds}`;

    // Create the log entry with the timestamp and action
    logEntry.innerText = `${timestamp} - ${action}`;

    // Append the log entry to the log container
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight; // Keep scroll at bottom
}

function formatNumber(number) {
    return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Update the displayed stats on the screen
function updateDisplay() {
    document.getElementById('games').innerText = games; // Display the number of cracked games stock
    document.getElementById('money').innerText = formatNumber(money); // Display the player's money
    document.getElementById('totalGames').innerText = formatNumber(totalGames); // Display the total cracked games
    document.getElementById('upgradesCount').innerText = upgrades; // Display the number of upgrades
    document.getElementById('upgradeCost').innerText = formatNumber(upgradeCost); // Display the upgrade cost
    document.getElementById('autocrackersCount').innerText = autocrackers; // Display the number of autocrackers
    document.getElementById('autocrackerCost').innerText = formatNumber(autocrackerCost); // Display the autocracker cost
    document.getElementById('marketingCost').innerText = formatNumber(marketingCost); // Display the marketing cost

    // Show or hide upgrade buttons based on the player's money
    if (money >= upgradeCost) {
        document.getElementById('buyUpgrade').style.display = 'inline-block';
    } else {
        document.getElementById('buyUpgrade').style.display = 'none';
    }

    if (money >= autocrackerCost) {
        document.getElementById('buyautocracker').style.display = 'inline-block';
    } else {
        document.getElementById('buyautocracker').style.display = 'none';
    }

    if (money >= marketingCost) {
        document.getElementById('buyMarketing').style.display = 'inline-block';
    } else {
        document.getElementById('buyMarketing').style.display = 'none';
    }

    // Show unlocked features
    if (unlocks.gameVersion2) document.getElementById('version').innerText = ' v2';
    if (unlocks.localization) document.getElementById('language-selector').style.display = 'inline-block';
    /* if (unlocks.antiPiracy) document.getElementById('antiPiracy').style.display = 'inline-block';
    if (unlocks.marketingCampaign) document.getElementById('marketingCampaign').style.display = 'inline-block';
    if (unlocks.merchandiseStore) document.getElementById('merchandiseStore').style.display = 'inline-block'; */
}

// Sale mechanic triggered every 0.5s
setInterval(() => {
    checkUnlocks();
    updatePublicDemand();
    let chanceToSell = Math.random() * 100; // Generate a random value for sale chance
    if (chanceToSell <= publicDemand && games > 0) { // Check if the sale is successful based on demand and there are games to sell
        let tempNumber = Math.round(crackRate * sellRate);
        games -= tempNumber * (autocrackers+1);  // Decrease the number of games by autocrackers rate
        if (games < 0) { // If games count goes below 0 imma reset it
            games = 0;
        }
        money += sellPrice * tempNumber * (publicDemand / 100);  // Add the sale value to the money
        updateDisplay();            // Refresh the stats display
    }

    if (autocrackers > 0) {
        games += autocrackers * crackRate;
        totalGames += autocrackers * crackRate;
        updateDisplay();
    }
}, 500);

// Display a message acknowledging the game creator (Kvn)
function displayCreatorInfo() {
    const creatorInfo = document.createElement('div');
    creatorInfo.innerText = 'This game was created by Kvn. Enjoy the game!';
    document.getElementById('creatorInfoContainer').appendChild(creatorInfo);
}

// Initialize the creator info display on page load
// Call the calculatePublicDemand function when the page loads
window.onload = () => {
    updatePublicDemand();
    updateDisplay();
    displayCreatorInfo();
};