window.onload = function () {
    var scramble = document.getElementById("scramble");
    var selectedEvent = document.getElementById("selectedEvent");

    console.clear();
}

var solves = 0;
var times = [];
function calculateGlobalAvg(array) { 
    var toParse = [];
    var avg = 0, globalAvg = 0; 
    for (var i = 0; i < array.length; i++) { 
        toParse[i] = parseFloat(array[i]);
        avg += toParse[i];
    }
    globalAvg = avg / array.length; 
    globalAvg = globalAvg.toFixed(2);
    console.log("Global avg: " + globalAvg); 
}

var generateScramble = function () {
    var newScramble = '';
    var prevMove = '';
    var prevPrevMove = '';
    if (selectedEvent.options[ selectedEvent.selectedIndex ].value == "3x3") {
        var moves = ["U", "D", "R", "L", "F", "B", "U\'", "D\'", "R\'", "L\'", "F\'", "B\'", "U2", "D2", "R2", "L2", "F2", "B2"];

        for (var i = 0; i < 20; i++) {
            var randomInt = Math.floor((Math.random() * moves.length));
            move = moves[randomInt];
            if (prevMove == 'U' & prevPrevMove != 'D' || prevMove == 'D' && prevPrevMove != 'U' || prevMove == 'L' && prevPrevMove != 'R' || prevMove == 'R' && prevPrevMove != 'L' || prevMove == 'F' && prevPrevMove != 'B' || prevMove == 'B' && prevPrevMove != 'F') {
                prevPrevMove = '';
            }
            while (move.charAt(0) == prevMove || move.charAt(0) == prevPrevMove) {
                var randomInt = Math.floor((Math.random() * moves.length));
                move = moves[randomInt];
            }
            prevPrevMove = prevMove.charAt(0);
            prevMove = move.charAt(0);
            newScramble = newScramble + move + ' ';
            scramble.innerHTML = newScramble;
        }
    }
    else if (selectedEvent.options[ selectedEvent.selectedIndex ].value == "2x2") {
        var moves = ["U", "R", "F", "U\'", "R\'", "F\'", "U2", "R2", "F2"];

        for (var i = 0; i < 11; i++) {
            var randomInt = Math.floor((Math.random() * moves.length));
            move = moves[randomInt];
            while (move.charAt(0) == prevMove) {
                var randomInt = Math.floor((Math.random() * moves.length));
                move = moves[randomInt];
            }
            prevMove = move.charAt(0);
            newScramble = newScramble + move + ' ';
            scramble.innerHTML = newScramble;
        }
    }
    else if (selectedEvent.options[ selectedEvent.selectedIndex ].value == "Skewb") {
        var moves = ["U", "R", "F", "U\'", "R\'", "F\'"];

        for (var i = 0; i < 9; i++) {
            var randomInt = Math.floor((Math.random() * moves.length));
            move = moves[randomInt];
            while (move.charAt(0) == prevMove) {
                var randomInt = Math.floor((Math.random() * moves.length));
                move = moves[randomInt];
            }
            prevMove = move.charAt(0);
            newScramble = newScramble + move + ' ';
            scramble.innerHTML = newScramble;
        }
    }
    // else {
        // rMoves = ["R++ ", "R-- "];
        // dMoves = ["D++ ", "D-- "];
        // uMoves = ["U<br>", "U\'<br>"];

        // for (var i = 0; i < 7; i++) {
        //     for (var k = 0; k < 10; k++) {
        //         if (k % 2 == 0) {
        //             var randomInt = Math.floor((Math.random() * rMoves.length));
        //             newScramble += rMoves[randomInt];
        //         }
        //         else {
        //             var randomInt = Math.floor((Math.random() * dMoves.length));
        //             newScramble += dMoves[randomInt];
        //         }
        //     }
        //     var randomInt = Math.floor((Math.random() * uMoves.length));
        //     newScramble += uMoves[randomInt];
        // }
        // scramble.innerHTML = newScramble;
    // }
}

function trim(string) { return string.replace (/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, ''); }
var init = 0;
var startDate;
var clocktimer;
var time = '00:00:00.00';  

function clearFields() {
    init = 0;
    clearTimeout(clocktimer);
    document.getElementById('current-time').innerHTML = '00:00:00.00';
    document.getElementById('current-time').innerHTML = '';
}

function startTIME() { 
    var thisDate = new Date();
    var t = thisDate.getTime() - startDate.getTime();
    var ms = t%1000; t -= ms; ms = Math.floor(ms/10);
    t = Math.floor (t/1000);
    var s = t%60; t -= s;
    t = Math.floor (t/60);
    var m = t%60; t -= m;
    t = Math.floor (t/60);
    var h = t%60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;
    if (init == 1) {
        time = h + ':' + m + ':' + s + '.' + ms;
    }
    document.getElementById('current-time').innerHTML = time;
    clocktimer = setTimeout("startTIME()",10);
 
}

function findTIME() {
    if (init==0) {
        startDate = new Date();
        startTIME();
        init = 1;
    } else {
        var str = trim(document.getElementById('current-time').innerHTML);
        clearFields();
        document.getElementById('current-time').innerHTML = time;
        document.querySelector(".times").innerHTML += "<li><a class=\"popup-with-form\" href=\"#edit-time\">" + time + " <br> <span>" + document.getElementById("scramble").innerHTML + "</span></a></li>";
        solves = solves + 1;
        document.querySelector(".count-solves").innerHTML = "Number of solves: " + solves;
        generateScramble();
    }
}

generateScramble();

document.onkeydown = function (event) {
    event = event || window.event;
    if(event.keyCode == 32) {
        document.querySelector('.timer').style.background = "#2c3e50";
        document.getElementById('current-time').style.color = "#fff";
    }
}

document.onkeyup = function (event) {
    event = event || window.event;
    if(event.keyCode == 32) {
        document.querySelector('.timer').style.background = "#fff";
        document.getElementById('current-time').style.color = "#2c3e50";
        findTIME();
    }
}

document.querySelector(".timer").addEventListener("touchstart", function () {
    document.querySelector('.timer').style.background = "#2c3e50";
    document.getElementById('current-time').style.color = "#fff";
});

document.querySelector(".timer").addEventListener("touchend", function () {
    document.querySelector('.timer').style.background = "#fff";
    document.getElementById('current-time').style.color = "#2c3e50"; 
    findTIME();
});