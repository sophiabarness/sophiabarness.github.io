function drawGame() {
    var directions = document.getElementById('directions');
    directions.innerText = 'It\'s the dandelion\'s turn! Choose a square on the grid.';
    var compass = document.getElementById("compass");
    var twoCompass = new Two({fitted: true}).appendTo(compass);
    var styles = {
        size: 14, 
        weight: 'bold'
    }
    var x1 = twoCompass.width * 0.5;
    var y1 = twoCompass.height * 0.5;
    var circle = twoCompass.makeCircle(x1, y1, 50);
    var circle1 = twoCompass.makeCircle(x1, y1, 25);
    circle.stroke = 'green';
    circle.fill = 'rgb(220, 238, 244)';
    circle1.fill = 'rgb(220, 238, 244)';
    circle1.stroke = 'green';
    circle.linewidth = '2px';
    circle1.linewidth = '2px';
    let xdirections = [x1, x1+48, x1+66, x1 + 48, x1, x1 - 48, x1-66, x1-48];
    let ydirections = [y1-66, y1-48, y1, y1 + 48, y1+66, y1 + 48, y1, y1 -48];
    let xTextDirections = [x1, x1+57, x1+75, x1 + 57, x1, x1 - 57, x1-75, x1-57];
    let yTextDirections = [y1-75, y1-57, y1, y1 + 57, y1+75, y1 + 57, y1, y1 -57];
    var line = [];
    var text = [];
    for (let i = 0; i < 8; i++) {
        line[i] = twoCompass.makeArrow(x1, y1, xdirections[i], ydirections[i]);
        var textDirection = document.getElementById(String(i));
        text[i] = twoCompass.makeText(textDirection.innerText, xTextDirections[i], yTextDirections[i], styles);
    }
    twoCompass.update();

    var valueTable = [
        [[], [], [1, 2, 3, 4], [6, 12, 18, 24], [5, 10, 15, 20], [], [], []], 
        [[], [], [2, 3, 4], [7, 13, 19], [6, 11, 16, 21], [5], [0], []],
        [[], [], [3, 4], [8, 14], [7, 12, 17, 22], [6, 10], [1, 0], []],
        [[], [], [4], [9], [8, 13, 18, 23], [7, 11, 15], [2, 1, 0], []],
        [[], [], [], [9, 14, 19, 24], [8, 12, 16, 20], [3, 2, 1, 0], []],
        [[0], [1], [6, 7, 8, 9], [11, 17, 23], [10, 15, 20], [], [], []],
        [[1], [2], [7, 8, 9], [12, 18, 24], [11, 16, 21], [10], [5], [0]],
        [[2], [3], [8, 9], [13, 19], [12, 17, 22], [11, 15], [6,5], [1]],
        [[3], [4], [9], [14], [13, 18, 23], [12, 16, 20],[7,6,5], [2]],
        [[4], [], [], [], [14, 19, 24], [13, 17, 21], [8, 7, 6, 5], [3]],
        [[5, 0], [6, 2], [11, 12, 13, 14], [16, 22], [15, 20], [], [], []],
        [[1, 6], [3, 7], [12, 13, 14], [17, 23], [16, 21], [15], [10], [5]],
        [[2, 7], [4, 8], [13, 14], [18, 24], [17, 22], [16, 20], [11, 10], [6,0]],
        [[3, 8], [9], [14], [19], [18, 23], [17, 21], [10, 11, 12], [1,7]],
        [[4, 9], [], [], [], [19, 24], [18, 22], [13, 12,11, 10], [1, 7]],
        [[10, 5, 0], [11, 7, 3], [16, 17, 18, 19], [21], [20], [], [], []],
        [[11, 6, 1], [12, 8, 4], [17, 18, 19], [22], [21], [20], [15], [10]],
        [[12, 7, 2], [13, 9], [18, 19], [23], [22], [21], [16, 15], [11, 5]],
        [[13, 8, 3], [14], [19], [24], [23] ,[22], [17, 16, 15], [11, 5]],
        [[14, 9, 4], [], [], [], [24], [23], [18, 17, 16, 15], [12, 6, 0]],
        [[15, 10, 5,0], [16, 12, 8, 4], [21, 22, 23, 24], [], [], [], [], []],
        [[16, 11, 6, 1], [17, 13, 9], [22, 23, 24], [], [], [], [20], [15]],
        [[17, 12, 7, 2], [18, 14], [23, 24], [], [], [], [21, 20], [16, 10]],
        [[18, 13, 8, 3], [19], [24], [], [], [], [22, 21, 20], [17, 11, 5]],
        [[19, 14, 9, 4], [], [], [], [], [], [23, 22, 21, 20], [18, 12, 6, 0]]
    ]

    var windTurn = false;
    var specialButtons = [];
    var turns = 0;
    let buttons = document.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', windClick);
        function windClick() {
            notClickable = buttons[i].classList.contains('disabled');
            if (windTurn && !notClickable) {
                turns++;
                specialButtons.push(i);
                for (let j = 0; j < buttons.length; j++) {
                    buttons[j].classList.add('disabled');
                }
                line[i].linewidth = 5;
                line[i].stroke = 'green';
                twoCompass.update();
                dandelionTurn = true;
                windTurn = false;
                for (let h = 0; h < dandelionTurns.length; h++) {
                    var toRemove = valueTable[dandelionTurns[h]][i];
                    for (let j = 0; j < toRemove.length; j++) {
                        if (images[toRemove[j]].getAttribute('src') !== 'images/green-asterisk.png') {
                            images[toRemove[j]].setAttribute('src', 'images/green-dot.png');
                        }
                    }
                }
                console.log(isGameOver());
                if (isGameOver()) {
                    gameOver();
                }
                else {
                    directions.innerText = 'It\'s the dandelion\'s turn! Choose a square on the grid.';
                }
            }        
        }
    }

    var images = [];
    var board = document.getElementById('board');
    var dandelionTurn = true;
    var dandelionTurns = [];
    for (let i = 0; i < 25; i++) {
        images[i] = document.createElement("img");
        images[i].setAttribute('src', 'images/white.png');
        board.appendChild(images[i]);
        images[i].addEventListener("click", onMouseClick);
        function onMouseClick() {
            if (dandelionTurn && turns !== 7 && !isGameOver()) {
                for (let j = 0; j < buttons.length; j++) {
                    if (!specialButtons.includes(j)) {
                        buttons[j].classList.remove('disabled');
                    }
                }
                dandelionTurns.push(i);
                images[i].removeEventListener("click", onMouseClick);
                images[i].setAttribute('src', 'images/green-asterisk.png');
                if (isGameOver()) {
                    gameOver();
                }
                else {
                    directions.innerText = 'It\'s the wind\'s turn! Choose a direction to blow.';
                }
                dandelionTurn = false;
                windTurn = true;
            }    
        }
    }

    // checks if the board is filled
    function boardFilled() {
        var counter = 0;
        for (let i = 0; i < 25; i++) {
            if (images[i].getAttribute('src') === 'images/white.png') {
                counter++;
            }
        }
        return (counter === 0);
    }

    // checks if the game is over
    function isGameOver() {
        return (boardFilled() || turns === 7);
    }

    // completes next steps after game is over
    function gameOver() {
        
        if (boardFilled() || turns === 7) {
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].classList.add('disabled');
            }
        }
        if (boardFilled()) {
            directions.innerHTML = 'The dandelion won!';
            
        }
        else if (turns === 7) {
            directions.innerHTML = 'The wind won!';
            
        }
    }
}  

/* Execute the above function when the DOM tree is fully loaded. */
document.addEventListener("DOMContentLoaded", drawGame);
