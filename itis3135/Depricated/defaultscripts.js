function nameFeeling() {
    const userName = document.getElementById('name').value;
    const userMood = document.getElementById('feeling').value;

    const resultDiv = document.getElementById('nameFeelingResult');
    resultDiv.innerText = `The Zooby Wizardds welcomes you, ${userName}!\nWe're glad you are doing ${userMood}!`;
}

function favNumber() {
    const favoriteNumber = parseFloat(document.getElementById('numberInput').value);
    
    if (!isNaN(favoriteNumber) && favoriteNumber >= 0 && favoriteNumber <= 10) {
        const squareRoot = Math.sqrt(favoriteNumber);
        
        const resultDiv = document.getElementById('favNumberResult');
        resultDiv.innerText = `The square root of your favorite number is: ${squareRoot.toFixed(2)}`;
    } else {
        const resultDiv = document.getElementById('favNumberResult');
        resultDiv.innerText = "Valid number between 0 and 10.";
    }
}




function randInsult() {
    const insultInput = document.getElementById('insultInput').value;
    const insults = [
        "You're a no one",
        "You stink ",
       
    ];
    const randomInsult = insults[Math.floor(Math.random() * insults.length)];

    const resultDiv = document.getElementById('randInsultResult');
    resultDiv.innerText = randomInsult;
}

function randFact() {
    const factInput = document.getElementById('factInput').value;
    const facts = [
        "Ice cream is not cream.",
        "Water is wet",
        "What is what"
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    const resultDiv = document.getElementById('randFactResult');
    resultDiv.innerText = randomFact;
}
