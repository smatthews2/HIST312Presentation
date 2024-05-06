// Wait until DOM is loaded, then render the game board.
window.addEventListener("DOMContentLoaded", function() {
    assembleBoard();
});

// 91 = Pyramid
let evens = [[4, 16, 36, 64, 2, 4, 6, 8], // Circles
             [25, 20, 42, 49, 9, 6, 72, 81], // Triangles
             [25, 81, 169, 289, 15, 45, 91, 153] // Squares and Pyramid
            ]

// 190 = Pyramid
let odds = [[9, 7, 5, 3, 81, 49, 25, 9], // Circles
            [100, 90, 12, 16, 64, 56, 30, 36], // Triangles
            [190, 120, 66, 28, 136, 225, 121, 49] // Squares and Pyramid
           ]

let hnefataflPos = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                    [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                    [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
                    [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], 
                    [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55], 
                    [56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66], 
                    [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77], 
                    [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88], 
                    [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99], 
                    [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110], 
                    [111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121]];

// Be nice and declare all your variables at the top of the page.
var lastClicked = "";
var gameTurn = 0;
var denom = 8; // This is for tile color.
var list;

function clearSquares(){
    // THIS IS SO SLOW!
        for(var i = 0; i < document.getElementById("mainBoard").childElementCount; i++){
            document.getElementById("mainBoard").children[i].style.backgroundColor = parseInt((i / denom) + i) % 2 == 0 ? "green" : "beige";  
        }
}

function swapColor(piece){
    switch (true){
        case piece.classList[0] == "evencircle": 
            piece.classList.remove("evencircle");
            piece.classList.add("oddcircle");
            break;
        case piece.classList[0] == "oddcircle": 
            piece.classList.remove("oddcircle");
            piece.classList.add("evencircle");
            break;
        case piece.classList[0] == "evensquare": 
            piece.classList.remove("evensquare");
            piece.classList.add("oddsquare");
            break;
        case piece.classList[0] == "oddsquare": 
            piece.classList.remove("oddsquare");
            piece.classList.add("evensquare");
            break;
        case piece.classList[0] == "oddtriangle": 
            piece.classList.remove("oddtriangle");
            piece.classList.add("eventriangle");
            break;
        case piece.classList[0] == "eventriangle": 
            piece.classList.remove("eventriangle");
            piece.classList.add("oddtriangle");
            break;
        case piece.classList[0] == "oddpyramid": 
            piece.classList.remove("oddpyramid");
            piece.classList.add("evenpyramid");
            break;
        case piece.classList[0] == "evenpyramid": 
            piece.classList.remove("evenpyramid");
            piece.classList.add("oddpyramid");
            break;
    }
}

// Move a given piece to a desired tile.
function movePiece(tile){
    // if((document.getElementById(lastClicked).classList[0].includes("odd") && gameTurn % 2 == 0) || (document.getElementById(lastClicked).classList[0].includes("even") && gameTurn % 2 == 1))
    if(document.getElementById(tile).style.background == "gold" || document.getElementById(tile).style.background == "silver"){
        document.getElementById(tile).appendChild(document.getElementById(lastClicked));
        clearSquares();
        gameTurn++;
        console.log(gameTurn);
    }
    else if(document.getElementById(tile).style.background == "red"){ // capture
        if(document.getElementById(lastClicked).classList[0].includes("odd")){ // If we're a black piece...
            for(i = 1; i <= 8; i++){ // Send our opponent's piece to our back row and convert it.
                let temp = document.getElementById(i.toString());
                if(!temp.hasChildNodes()){
                    swapColor(document.getElementById(tile).children[0]);
                    temp.appendChild(document.getElementById(document.getElementById(tile).children[0].id));
                    break;
                }
            }
        }
        else{ // Vice versa.
            for(i = 121; i <= 128; i++){
                let temp = document.getElementById(i.toString());
                if(!temp.hasChildNodes()){
                    swapColor(document.getElementById(tile).children[0]);
                    temp.appendChild(document.getElementById(document.getElementById(tile).children[0].id));
                    break;
                }
            }
        }
        
        clearSquares();
        gameTurn++;
        console.log(gameTurn);
    }
}

function isSame(position){
    return position.children[0].classList[0].includes("odd") == document.getElementById(lastClicked).classList[0].includes("odd") || position.children[0].classList[0].includes("even") == document.getElementById(lastClicked).classList[0].includes("even");
}

/*
    Calculate and display valid moves for a given piece at a given tile.

    NOTE: Knight moves are in silver, cardinals/diags are in gold, and captures are in red.
*/
function validMoves(){
    if((document.getElementById(lastClicked).classList[0].includes("odd") && gameTurn % 2 == 0) || (document.getElementById(lastClicked).classList[0].includes("even") && gameTurn % 2 == 1)){
        let curPos = document.getElementById(lastClicked).parentElement.id;
        switch(true){
            case lastClicked.includes("pyramid"): // Pyramid falls through every rule.
            case lastClicked.includes("circle"):
                let upleft = document.getElementById(curPos - 9);
                let upright = document.getElementById(curPos - 7);
                let downleft = document.getElementById(parseInt(curPos) + 9);
                let downright = document.getElementById(parseInt(curPos) + 7);

                if(!(upleft === null) && !(curPos % 8 == 1)) !upleft.hasChildNodes() ? upleft.style.background = "gold" : (!isSame(upleft) ? upleft.style.background = "red" : {} );
                if(!(upright === null) && !(curPos % 8 == 0)) !upright.hasChildNodes() ? upright.style.background = "gold" : (!isSame(upright) ? upright.style.background = "red" : {} );
                if(!(downleft === null) && !(curPos % 8 == 0)) !downleft.hasChildNodes() ? downleft.style.background = "gold" : (!isSame(downleft) ? downleft.style.background = "red" : {} );
                if(!(downright === null) && !(curPos % 8 == 1)) !downright.hasChildNodes() ? downright.style.background = "gold" : (!isSame(downright) ? downright.style.background = "red" : {} );
                
                if(lastClicked.includes("circle")) break;
            case lastClicked.includes("square"):
                let unblocked = new Array(4).fill(true);

                let knightmoves = [
                    document.getElementById((curPos - 8 * 3 - 1)), // 3 1 up left
                    document.getElementById((curPos - 8 * 3 + 1)), // 3 1 up right
                    document.getElementById(((parseInt(curPos) + 8 * 3 - 1))), // 3 1 down left
                    document.getElementById(((parseInt(curPos) + 8 * 3 + 1))), // 3 1 down right
                    document.getElementById((curPos - 3 - 8)), // 1 3 up left
                    document.getElementById((parseInt(curPos) + 3 - 8)), // 1 3 up right
                    document.getElementById((curPos - 3 + 8)), // 1 3 down left
                    document.getElementById((parseInt(curPos) + 3 + 8)) // 1 3 down right
                ];

                for(i = 1; i <= 3; i++){
                    let up = document.getElementById((curPos - 8 * i));
                    let down = document.getElementById((parseInt(curPos) + 8 * i));
                    let left = document.getElementById((curPos - i));
                    let right = document.getElementById(((parseInt(curPos) + i)));
                    
                    if(i == 3){
                        if(!(up === null) && unblocked[0]) !up.hasChildNodes() ? up.style.background = "gold" : (!isSame(up) ? up.style.background = "red" : {} );
                        if(!(down === null) && unblocked[1]) !down.hasChildNodes() ? down.style.background = "gold" : (!isSame(down) ? down.style.background = "red" : {} );
                        if(!(left === null) && unblocked[2] && !(curPos % 8 == 1 || curPos % 8 == 2 || curPos % 8 == 3)) !left.hasChildNodes() ? left.style.background = "gold" : (!isSame(left) ? left.style.background = "red" : {} );
                        if(!(right === null) && unblocked[3] && !(curPos % 8 == 6 || curPos % 8 == 7 || curPos % 8 == 0)) !right.hasChildNodes() ? right.style.background = "gold" : (!isSame(right) ? right.style.background = "red" : {} );
                    }
                    else{
                        if(!(up === null) && up.hasChildNodes()) unblocked[0] = false;
                        if(!(down === null) && down.hasChildNodes()) unblocked[1] = false;
                        if(!(left === null) && left.hasChildNodes()) unblocked[2] = false;
                        if(!(right === null) && right.hasChildNodes()) unblocked[3] = false;
                    } 
                }

                for(i = 0; i < knightmoves.length; i++){ // Check if a knight move is valid.
                    if(!(knightmoves[i] === null) && !knightmoves[i].hasChildNodes() && (i % 2 == 0 ? !((curPos % 8 == 1 || curPos % 8 == 2 && i != 0 && i != 2 || curPos % 8 == 3 && i != 0 && i != 2)) : !((curPos % 8 == 6 && i != 1 && i != 3 || curPos % 8 == 7 && i != 1 && i != 3 || curPos % 8 == 0)))) knightmoves[i].style.background = "silver";
                }

                unblocked.fill(true);
                if(lastClicked.includes("square")) break;
            case lastClicked.includes("triangle"):
                { // The braces prevent a block-scope error.
                let unblocked = new Array(4).fill(true);
                
                let knightmoves = [
                                    document.getElementById((curPos - 8 * 2 - 1)), // 2 1 up left 0
                                    document.getElementById((curPos - 8 * 2 + 1)), // 2 1 up right 1
                                    document.getElementById(((parseInt(curPos) + 8 * 2 - 1))), // 2 1 down left 2
                                    document.getElementById(((parseInt(curPos) + 8 * 2 + 1))), // 2 1 down right 3
                                    document.getElementById((curPos - 2 - 8)), // 1 2 up left 4
                                    document.getElementById((parseInt(curPos) + 2 - 8)), // 1 2 up right 5
                                    document.getElementById((curPos - 2 + 8)), // 1 2 down left 6
                                    document.getElementById((parseInt(curPos) + 2 + 8)) // 1 2 down right 7
                                ];
                
                for(i = 1; i <= 2; i++){
                    let up = document.getElementById((curPos - 8 * i));
                    let down = document.getElementById((parseInt(curPos) + 8 * i));
                    let left = document.getElementById((curPos - i));
                    let right = document.getElementById(((parseInt(curPos) + i)));

                    if(i == 2){
                        if(!(up === null) && unblocked[0]) !up.hasChildNodes() ? up.style.background = "gold" : (!isSame(up) ? up.style.background = "red" : {} );
                        if(!(down === null) && unblocked[1]) !down.hasChildNodes() ? down.style.background = "gold" : (!isSame(down) ? down.style.background = "red" : {} );
                        if(!(left === null) && unblocked[2] && !(curPos % 8 == 1 || curPos % 8 == 2)) !left.hasChildNodes() ? left.style.background = "gold" : (!isSame(left) ? left.style.background = "red" : {} );
                        if(!(right === null) && unblocked[3] && !(curPos % 8 == 7 || curPos % 8 == 0)) !right.hasChildNodes() ? right.style.background = "gold" : (!isSame(right) ? right.style.background = "red" : {} );
                    }
                    else{
                        if(!(up === null) && up.hasChildNodes()) unblocked[0] = false;
                        if(!(down === null) && down.hasChildNodes()) unblocked[1] = false;
                        if(!(left === null) && left.hasChildNodes()) unblocked[2] = false;
                        if(!(right === null) && right.hasChildNodes()) unblocked[3] = false;
                    }   
                }                  
                
                for(i = 0; i < knightmoves.length; i++){
                    if(!(knightmoves[i] === null) && !knightmoves[i].hasChildNodes() && (i % 2 == 0 ? !((curPos % 8 == 1|| curPos % 8 == 2 && i != 0 && i != 2 )) : !((curPos % 8 == 7 && i != 1 && i != 3 || curPos % 8 == 0)))) knightmoves[i].style.background = "silver";
                }
                
                unblocked.fill(true);
            }
        }
    }else if(document.getElementById('hnefatafl').checked){
        let curPos = document.getElementById(lastClicked).parentElement.id;
        let temp = findIndex(hnefataflPos, curPos);
        let unblocked = new Array(4).fill(true);
        // Find row by curPos.    
        let row = range(hnefataflPos[temp[0]][0], hnefataflPos[temp[0]][10]);
        
        for(i = 1; i <= 11; i++){
            let up = document.getElementById((curPos - 11 * i));
            let down = document.getElementById((parseInt(curPos) + 11 * i));
            let left = document.getElementById((curPos - i));
            let right = document.getElementById((parseInt(curPos) + i));
            
            if(!(up === null) && up.hasChildNodes()) unblocked[0] = false;
            if(!(down === null) && down.hasChildNodes()) unblocked[1] = false;
            if(!(left === null) && left.hasChildNodes()) unblocked[2] = false;
            if(!(right === null) && right.hasChildNodes()) unblocked[3] = false;

            // Only the king can be on the center tile.
            if(!lastClicked.includes("king")){
                if((curPos - 11 * i) == 61) unblocked[0] = false;   
                if((parseInt(curPos) + 11 * i) == 61) unblocked[1] = false;  
                if((curPos - i) == 61) unblocked[2] = false;  
                if((parseInt(curPos) + i) == 61) unblocked[3] = false;   
            }
            
            if(!(up === null) && unblocked[0]) !up.hasChildNodes() ? up.style.background = "gold" : {};
            if(!(down === null) && unblocked[1]) !down.hasChildNodes() ? down.style.background = "gold" : {};
            if(!(left === null) && unblocked[2] && row.includes(curPos - i)) !left.hasChildNodes() ? left.style.background = "gold" : {};
            if(!(right === null) && unblocked[3] && row.includes(parseInt(curPos) + i)) !right.hasChildNodes() ? right.style.background = "gold" : {};
        }

        unblocked.fill(true);
    }
}

function findIndex(stringArr,keyString)
{
 
    // Initialising result array to -1
    // in case keyString is not found
    let result = [ -1, -1 ];
 
    // Iteration over all the elements
    // of the 2-D array
 
    // Rows
    for (let i = 0; i < stringArr.length; i++) {
 
        // Columns
        for (let j = 0; j < stringArr[i].length; j++) {
 
            // If keyString is found
            if (stringArr[i][j] == keyString) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
 
    // If keyString is not found
    // then -1 is returned
    return result;
}

function range(start, end) {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}

// Put listeners on each of the pieces dynamically.
function pieceHelper(piece){
        piece.addEventListener("click", myFunc = function () {
            clearSquares();
            console.log(piece.id);
            lastClicked = piece.id;
            validMoves();
        });
}

// BUILD THE BOARD!
function assembleBoard(){
    denom = 8;
    gameTurn = 0;
    let j = 0;

    document.getElementById("mainBoard").style['width'] = "480px";
    document.getElementById("mainBoard").style['height'] = "960px";

    for (var i = 0; i < 128; i++){
        let tile = document.getElementById("mainBoard").appendChild(document.createElement("div"));
        tile.style.backgroundColor = parseInt((i / denom) + i) % 2 == 0 ? "green" : "beige";  
        tile.addEventListener("click", function () {
            console.log("tile " + tile.id);
            movePiece(tile.id);
        });
        tile.setAttribute("id", i + 1);
        tile.setAttribute("class", "tile");
    }

    // Place down circles for white.
    for(i = 94; i >= 83; i--){
        if(!(i <= 90 && i >= 87)){
            let circle = document.getElementById(i).appendChild(document.createElement("div"));
            circle.setAttribute("class", "evencircle");
            circle.setAttribute("id", evens[0][j] + " white circle " + j);
            circle.innerHTML = evens[0][j];
            j++;    
        }
    }
    j = 0;

    // Place down triangles for white.
    for(i = 102; i >= 89; i--){
        if(!(i <= 98 && i >= 97) && !(i <= 94 && i >= 91)){
            let triangle = document.getElementById(i).appendChild(document.createElement("div"));
            triangle.setAttribute("class", "eventriangle");
            triangle.setAttribute("id", evens[1][j] + " white triangle " + j);
            triangle.innerHTML = evens[1][j];
            j++;    
        }
    }
    j = 0;

    // Place down squares and pyramid for white.
    for(i = 112; i >= 97; i--){
        if(!(i <= 110 && i >= 107) && !(i <= 102 && i >= 99)){
            let square = document.getElementById(i).appendChild(document.createElement("div"));
            if(evens[2][j] == 91){
                square.setAttribute("class", "evenpyramid");
                square.setAttribute("id", evens[2][j] + " white pyramid " + j);
            }
            else{
                square.setAttribute("class", "evensquare");
                square.setAttribute("id", evens[2][j] + " white square " + j);
            }
            square.innerHTML = evens[2][j];
            j++
        }
    }
    j = 0;

    // Place down circles for black.
    for(i = 46; i >= 35; i--){
        if(!(i <= 42 && i >= 39)){
            let circle = document.getElementById(i).appendChild(document.createElement("div"));
            circle.setAttribute("class", "oddcircle");
            circle.setAttribute("id", odds[0][j] + " black circle " + j);
            circle.innerHTML = odds[0][j];
            j++;    
        }
    }
    j = 0;

    // Place down triangles for black.
    for(i = 40; i >= 27; i--){
        if(!(i <= 38 && i >= 35) && !(i <= 32 && i >= 31)){
            let triangle = document.getElementById(i).appendChild(document.createElement("div"));
            triangle.setAttribute("class", "oddtriangle");
            triangle.setAttribute("id", odds[1][j] + " black triangle " + j);
            triangle.innerHTML = odds[1][j];
            j++;    
        }
    }
    j = 0;

    // Place down squares and pyramid for black.
    for(i = 32; i >= 17; i--){
        if(!(i <= 30 && i >= 27) && !(i <= 22 && i >= 19)){
            let square = document.getElementById(i).appendChild(document.createElement("div"));
            if(odds[2][j] == 190){
                square.setAttribute("class", "oddpyramid");
                square.setAttribute("id", odds[2][j] + " black pyramid " + j);
            }
            else{
                square.setAttribute("class", "oddsquare");
                square.setAttribute("id", odds[2][j] + " black square " + j);
            }
            square.innerHTML = odds[2][j];
            j++
        }
    }

    list = [...document.getElementsByTagName("div")];

    list.forEach(element => { 
        if (!(element.classList[0] === undefined)) element.classList[0].includes("odd") || element.classList[0].includes("even") ? pieceHelper(element) : {};
    });
} 

// BUILD THE BOARD!
function assembleHnefataflBoard(){
    denom = 121;
    gameTurn = 0;
    let j = 0;

    document.getElementById("mainBoard").style['width'] = "660px";
    document.getElementById("mainBoard").style['height'] = "660px";

    for (var i = 0; i < 121; i++){
        let tile = document.getElementById("mainBoard").appendChild(document.createElement("div"));
        tile.style.backgroundColor = parseInt((i / denom) + i) % 2 == 0 ? "green" : "beige";  
        tile.addEventListener("click", function () {
            console.log("tile " + tile.id);
            movePiece(tile.id);
        });
        tile.setAttribute("id", i + 1);
        tile.setAttribute("class", "tile");        
    }

    // Place down circles for attackers.
    for(i = 119; i >= 105; i--){
        if(!(i <= 112 && i >= 106)){
            let circle = document.getElementById(i).appendChild(document.createElement("div"));
            circle.setAttribute("class", "attacker");
            circle.setAttribute("id", 1 + " attacker " + j);
            j++;    
        }
    }
    j = 0;

    for(i = 17; i >= 3; i--){
        if(!(i < 17 && i >= 10)){
            let circle = document.getElementById(i).appendChild(document.createElement("div"));
            circle.setAttribute("class", "attacker");
            circle.setAttribute("id", 2 + " attacker " + j);
            j++;    
        }
    }
    j = 0;

    for(i = 89; i >= 23; i--){
        if((i % 11 == 1) || i == 57){
            let circle = document.getElementById(i).appendChild(document.createElement("div"));
            circle.setAttribute("class", "attacker");
            circle.setAttribute("id", 3 + " attacker " + j);
            j++;    
        }   
    }
    j = 0;

    for(i = 99; i >= 33; i--){
        if((i % 11 == 0) || i == 65){
            let circle = document.getElementById(i).appendChild(document.createElement("div"));
            circle.setAttribute("class", "attacker");
            circle.setAttribute("id", 4 + " attacker " + j);
            j++;    
        }   
    }
    j = 0;

    // Place down circles for defenders.
    for(i = 83; i >= 39; i--){
        if((((i % 11 == 7) || (i % 11 == 6) || (i % 11 == 5)) && ((i != 61) && (i != 40) && (i != 82))) || (i == 63) || (i == 59)){
            let circle = document.getElementById(i).appendChild(document.createElement("div"));
            circle.setAttribute("class", "defender");
            circle.setAttribute("id", "defender " + j);
            j++;    
        }
        else if(i == 61){
            let circle = document.getElementById(i).appendChild(document.createElement("div"));
            circle.setAttribute("class", "king");
            circle.setAttribute("id", "king");   
        }
    }
    j = 0;

    list = [...document.getElementsByTagName("div")];

    list.forEach(element => { 
        if (!(element.classList[0] === undefined)) element.classList[0].includes("king") || element.classList[0].includes("defender") || element.classList[0].includes("attacker") ? pieceHelper(element) : {};
    });
}

// Do what it says on the tin.
function resetGame(){
    const myNode = document.getElementById("mainBoard");
    
    // Clear the container for the board.
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
    }

    if(document.getElementById('rithmomachia').checked) {
        console.log("Rithmomachia!");
        assembleBoard();
    }
    else if(document.getElementById('hnefatafl').checked) {
        console.log("Hnefatafl!");
        assembleHnefataflBoard();
    }
}