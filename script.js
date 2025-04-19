
/**
 * Point culture (en Français car je suis un peu obligé): 
 * Dans ce genre de jeu, un mot equivaut a 5 caractères, y compris les espaces. 
 * La precision, c'est le pourcentage de caractères tapées correctement sur toutes les caractères tapées.
 * 
 * Sur ce... Amusez-vous bien ! 
 */
let startTime = null, previousEndTime = null;
let currentWordIndex = 0;
const wordsToType = [];

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const results = document.getElementById("results");

const words = {
    easy: ["apple", "banana", "grape", "orange", "cherry"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery"],
    hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
};

const getRandomWord = (mode) => words[mode][Math.floor(Math.random() * words[mode].length)];

const startTest = (wordCount = 50) => {
    wordsToType.length = 0;
    wordDisplay.innerHTML = "";
    currentWordIndex = 0;
    startTime = null;
    previousEndTime = null;

    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
    }

    const container = document.createElement("div");
    container.className = "words-container";
    
    wordsToType.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        span.className = "word";
        if (index === 0) span.classList.add("current");
        container.appendChild(span);
    });

    wordDisplay.appendChild(container);
    inputField.value = "";
    results.textContent = "";
};

const highlightNextWord = () => {
    const words = document.querySelectorAll(".word");
    if (currentWordIndex < words.length) {
        words.forEach((word, i) => {
            word.classList.toggle("current", i === currentWordIndex);
        });
    }
};

inputField.addEventListener("keydown", (e) => {
    if (!startTime) startTime = Date.now();
    
    if (e.key === " " && inputField.value.trim() === wordsToType[currentWordIndex]) {
        if (!previousEndTime) previousEndTime = startTime;
        
        const time = (Date.now() - previousEndTime) / 1000;
        const wpm = ((wordsToType[currentWordIndex].length / 5) / (time / 60)).toFixed(2);
        results.textContent = `WPM: ${wpm}`;
        
        currentWordIndex++;
        previousEndTime = Date.now();
        highlightNextWord();
        inputField.value = "";
        e.preventDefault();
    }
});

modeSelect.addEventListener("change", () => startTest());
startTest();