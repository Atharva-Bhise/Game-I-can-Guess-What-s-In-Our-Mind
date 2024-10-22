//Copyright (c) 2024 Atharva Bhise
let rowsList = [];
let rearrangedRowsList = [];
let resultRowsList = [];
let resultColumnsList = [];
let resultWord = "";
let numberOfLetters = 0;
let initialTable = [
    [0, ['a', 'e', 'i', 'm', 'q', 'u', 'y']],
    [1, ['b', 'f', 'j', 'n', 'r', 'v', 'z']],
    [2, ['c', 'g', 'k', 'o', 's', 'w']],
    [3, ['d', 'h', 'l', 'p', 't', 'x']]
];

function showModal() {
    const modal = document.getElementById("modal");
    const contentToBlur = document.getElementById("content"); 
    modal.style.display = "block";
    contentToBlur.classList.add("blur-background"); 
}

function closeModal() {
    const modal = document.getElementById("modal");
    const contentToBlur = document.getElementById("content");
    modal.style.display = "none";
    contentToBlur.classList.remove("blur-background"); 
}

function startGame() {
    document.getElementById('letsPlayButton').addEventListener('click', function() {
        const letterCountValue = document.getElementById("letterCount").value;
        if (letterCountValue !== "" && letterCountValue > 0) {
            numberOfLetters = parseInt(letterCountValue); 
            rowsList = [];
            rearrangedRowsList = [];
            resultRowsList = [];
            resultColumnsList = [];
            resultWord = "";
            closeModal(); 
            setupColumnButtons(); 
        } else {
            document.getElementById("errorMessage").innerHTML = `<strong style="color: red;">Please, Enter the Number Of Letters!</strong>`;
        }
    });
}

function setupColumnButtons() {
    let columnButtons = document.getElementsByClassName('columnButton');
    for (let i = 0; i < columnButtons.length; i++) {
        columnButtons[i].addEventListener('click', function () {
            if (rowsList.length < numberOfLetters && numberOfLetters > 0) {
                const columnNumber = parseInt(this.value);
                rowsList.push(columnNumber - 1);
                if (rowsList.length === numberOfLetters) {
                    rearrangeTable();
                }
            }
        });
    }
}

function rearrangeTable() {
    rearrangedRowsList = [];

    rowsList.forEach(index => {
        rearrangedRowsList.push(initialTable[index][1]);
    });

    addAdditionalColumns(rearrangedRowsList);

    updateTable(rearrangedRowsList); 

    setupResultSelection(); 
}

function addAdditionalColumns(rearrangedRowsList) {
    rearrangedRowsList.forEach(row => {
        while (row.length < 7) {
            row.push(''); 
        }
    });
}


function updateTable(rearrangedRowsList) {
    const tableBody = document.getElementById('alphabetTable').getElementsByTagName('tbody')[0];
    const tableHead = document.getElementById('alphabetTable').getElementsByTagName('thead')[0];
    
    tableBody.innerHTML = '';
    tableHead.innerHTML = '';

    let columnRow = document.createElement('tr');
    for (let i = 1; i <= 7; i++) {
        let th = document.createElement('th');
        let button = document.createElement('input');
        button.type = 'button';
        button.className = 'columnButton';
        button.value = i;
        th.appendChild(button);
        columnRow.appendChild(th);
    }
    tableHead.appendChild(columnRow);

    rearrangedRowsList.forEach(rowData => {
        let row = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            let cell = document.createElement('td');
            cell.textContent = rowData[i] || '';  
            row.appendChild(cell);
        }
        tableBody.appendChild(row);  
    });

    document.getElementById("Messages").innerHTML = `
        <strong style="font-size: 1.5em; color: red;">Again!!!</strong>
        <b>Click The Column Number Where The First Letter Of Your Word Appears.
        Repeat This For Each Letter Of Your Word Till The Last Letter.</b>`;
}

function setupResultSelection() {
    let columnButtons = document.getElementsByClassName('columnButton');
    for (let i = 0; i < columnButtons.length; i++) {
        columnButtons[i].addEventListener('click', function () {
            if (resultColumnsList.length < numberOfLetters) {
                const columnNumber = parseInt(this.value);
                resultColumnsList.push(columnNumber - 1);
                resultRowsList.push(columnNumber - 1);

                if (resultColumnsList.length === numberOfLetters) {
                    calculateResult();
                }
            }
        });
    }
}

function calculateResult() {
    let i = 0;
    resultWord = "";  

    resultColumnsList.forEach(columnIndex => {
        let letter = rearrangedRowsList[i][columnIndex];
        resultWord += letter;
        i++;
    });

    document.getElementById("resultMessage").innerHTML = 
        `The word in your mind is: <strong style="font-size: 1.5em; color: #ff5733;">${resultWord.charAt(0).toUpperCase() + resultWord.slice(1).toLowerCase()}</strong>. Try Again`;
    document.getElementById("resultModal").style.display = "block";
    document.getElementById("content").classList.add("blur-background");
}

document.querySelector(".close-button").addEventListener("click", function() {
    document.getElementById("resultModal").style.display = "none";
    location.reload();
});

window.addEventListener("click", function(event) {
    const modal = document.getElementById("resultModal");
    if (event.target === modal) {
        modal.style.display = "none";
        location.reload();
    }
});

window.onload = function() {
    showModal();
};

startGame();
