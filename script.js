// Wait until DOM is loaded, then render the Rithmomachia board.
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

// Be nice and declare all your variables at the top of the page.
var lastClicked = "";
var gameTurn = 0;
var list;

function clearSquares(){
    // THIS IS SO SLOW!
        for(var i = 0; i < 128; i++){
            document.getElementById("mainBoard").children[i].style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? "green" : "beige";  
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
                    if(!(knightmoves[i] === null) && !knightmoves[i].hasChildNodes() && (i % 2 == 0 ? !((curPos % 8 == 1|| curPos % 8 == 2 && i != 0 && i != 2 )) : !((curPos % 8 == 7 && i != 1 && i != 3|| curPos % 8 == 0)))) knightmoves[i].style.background = "silver";
                }
                
                unblocked.fill(true);
            }
        }
    }
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
    let j = 0;

    for (var i = 0; i < 128; i++){
        let tile = document.getElementById("mainBoard").appendChild(document.createElement("div"));
        tile.style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? "green" : "beige";  
        if(tile.id % 8 == 0 || tile.id % 8 == 1)
        tile.addEventListener("click", function () {
            console.log(tile.id);
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
            // pieceHelper(circle);
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
            // pieceHelper(triangle);
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
            // pieceHelper(square);
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
            // pieceHelper(circle);
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
            // pieceHelper(triangle);
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
            // pieceHelper(square);
            square.innerHTML = odds[2][j];
            j++
        }
    }

    list = [...document.getElementsByTagName("div")];

    list.forEach(element => { 
        if (!(element.classList[0] === undefined)) element.classList[0].includes("odd") || element.classList[0].includes("even") ? pieceHelper(element) : {};
    });
} 