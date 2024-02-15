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

var lastClicked = '';
var gameTurn = 0;

function clearSquares(){
    // THIS IS SO SLOW!
        for(var i = 0; i < 128; i++){
            document.getElementById("mainBoard").children[i].style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? 'green' : 'beige';  
        }
}

function movePiece(tile){
    if(document.getElementById(tile).style.background == "gold" || document.getElementById(tile).style.background == "silver"){
        document.getElementById(tile).appendChild(document.getElementById(lastClicked));
        clearSquares();
    }
    else if(document.getElementById(tile).style.background == "red"){ // capture
        console.log("We're in!");
        // if()
        for(i = 1; i <= 8; i++){
            let temp = document.getElementById(i.toString());
            if(!temp.hasChildNodes()){
                temp.appendChild(document.getElementById(document.getElementById(tile).children[0].id));
                break;
            }
        }
        // document.getElementById(tile).appendChild(document.getElementById(tile).firstChild);
        document.getElementById(tile).appendChild(document.getElementById(lastClicked));
        clearSquares();
    }
    else{
        // alert("Invalid move.");
    };
}

function validMoves(){
    let curPos = document.getElementById(lastClicked).parentElement.id;
    switch(true){
        case lastClicked.includes("pyramid"): // Pyramid falls through every rule.
        case lastClicked.includes("circle"):
            let upleft = document.getElementById(curPos - 9);
            let upright = document.getElementById(curPos - 7);
            let downleft = document.getElementById(parseInt(curPos) + 9);
            let downright = document.getElementById(parseInt(curPos) + 7);
            
            if(!(upleft === null) && !(curPos % 8 == 1)) !upleft.hasChildNodes() ? upleft.style.background = "gold" : upleft.style.background = "red";
            if(!(upright === null) && !(curPos % 8 == 0)) !upright.hasChildNodes() ? upright.style.background = "gold" : upright.style.background = "red";
            if(!(downleft === null) && !(curPos % 8 == 0)) !downleft.hasChildNodes() ? downleft.style.background = "gold" : downleft.style.background = "red";
            if(!(downright === null) && !(curPos % 8 == 1)) !downright.hasChildNodes() ? downright.style.background = "gold" : downright.style.background = "red";
            
            if(lastClicked.includes("circle")) break;
        case lastClicked.includes("square"):
            let up = document.getElementById((curPos - 8 * 3));
            let down = document.getElementById(((parseInt(curPos) + 8 * 3)));
            let left = document.getElementById((curPos - 3));
            let right = document.getElementById(((parseInt(curPos) + 3)));
            
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

            if(!(up === null) && !up.hasChildNodes()) up.style.background = "gold";
            if(!(down === null) && !down.hasChildNodes()) down.style.background = "gold";
            if(!(left === null) && !left.hasChildNodes() && !(curPos % 8 == 1 || curPos % 8 == 2 || curPos % 8 == 3)) left.style.background = "gold";
            if(!(right === null) && !right.hasChildNodes() && !(curPos % 8 == 6 || curPos % 8 == 7 || curPos % 8 == 0)) right.style.background = "gold";       
            
            for(i = 0; i < knightmoves.length; i++){ // Check if a knight move is valid.
                if(!(knightmoves[i] === null) && !knightmoves[i].hasChildNodes() && (i % 2 == 0 ? !((curPos % 8 == 1 || curPos % 8 == 2 && i != 0 && i != 2 || curPos % 8 == 3 && i != 0 && i != 2)) : !((curPos % 8 == 6 && i != 1 && i != 3 || curPos % 8 == 7 && i != 1 && i != 3 || curPos % 8 == 0)))) knightmoves[i].style.background = "silver";
            }

            if(lastClicked.includes("square")) break;
        case lastClicked.includes("triangle"):
            { // The braces prevent a block-scope error.
            let up = document.getElementById((curPos - 8 * 2));
            let down = document.getElementById(((parseInt(curPos) + 8 * 2)));
            let left = document.getElementById((curPos - 2));
            let right = document.getElementById(((parseInt(curPos) + 2)));
            
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
            
            if(!(up === null) && !up.hasChildNodes()) up.style.background = "gold";
            if(!(down === null) && !down.hasChildNodes()) down.style.background = "gold";
            if(!left.hasChildNodes() && !(curPos % 8 == 1 || curPos % 8 == 2)) left.style.background = "gold";
            if(!right.hasChildNodes() && !(curPos % 8 == 7 || curPos % 8 == 0)) right.style.background = "gold";
            
            for(i = 0; i < knightmoves.length; i++){
                // 1 2 7 0
                // console.log(i % 2 == 0 ? !((curPos % 8 == 1 || curPos % 8 == 2)) : !((curPos % 8 == 7 || curPos % 8 == 0)))
                if(!(knightmoves[i] === null) && !knightmoves[i].hasChildNodes() && (i % 2 == 0 ? !((curPos % 8 == 1|| curPos % 8 == 2 && i != 0 && i != 2 )) : !((curPos % 8 == 7 && i != 1 && i != 3|| curPos % 8 == 0)))) knightmoves[i].style.background = "silver";
            }
            
            }
    }
    gameTurn++;
}

function pieceHelper(piece){
    piece.addEventListener("click", function () {
        clearSquares();
        console.log(piece.id);
        lastClicked = piece.id;
        validMoves();
    });
}

function assembleBoard(){
    let j = 0;

    // Build the board!
    for (var i = 0; i < 128; i++){
        let tile = document.getElementById("mainBoard").appendChild(document.createElement("div"));
        tile.style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? 'green' : 'beige';  
        if(tile.id % 8 == 0 || tile.id % 8 == 1)
        tile.addEventListener("click", function () {
            console.log(tile.id);
            movePiece(tile.id);
        });
        tile.setAttribute('id', i + 1);
    }

    // Place down circles for white.
    for(i = 110; i >= 99; i--){
        if(!(i <= 106 && i >= 103)){
            let circle = document.getElementById(i).appendChild(document.createElement("div"));
            circle.setAttribute('class', 'evencircle');
            circle.setAttribute('id', evens[0][j] + ' white circle ' + j);
            pieceHelper(circle);
            circle.innerHTML = evens[0][j];
            j++;    
        }
    }
    j = 0;

    // Place down triangles for white.
    for(i = 118; i >= 105; i--){
        if(!(i <= 114 && i >= 113) && !(i <= 110 && i >= 107)){
            let triangle = document.getElementById(i).appendChild(document.createElement("div"));
            triangle.setAttribute('class', 'eventriangle');
            triangle.setAttribute('id', evens[1][j] + ' white triangle ' + j);
            pieceHelper(triangle);
            triangle.innerHTML = evens[1][j];
            j++;    
        }
    }
    j = 0;

    // Place down squares and pyramid for white.
    for(i = 128; i >= 113; i--){
        if(!(i <= 126 && i >= 123) && !(i <= 118 && i >= 115)){
            let square = document.getElementById(i).appendChild(document.createElement("div"));
            if(evens[2][j] == 91){
                square.setAttribute('class', 'evenpyramid');
                square.setAttribute('id', evens[2][j] + ' white pyramid ' + j);
            }
            else{
                square.setAttribute('class', 'evensquare');
                square.setAttribute('id', evens[2][j] + ' white square ' + j);
            }
            pieceHelper(square);
            square.innerHTML = evens[2][j];
            j++
        }
    }
    j = 0;

    // Place down circles for black.
    for(i = 30; i >= 19; i--){
        if(!(i <= 26 && i >= 23)){
            let circle = document.getElementById(i).appendChild(document.createElement("div"));
            circle.setAttribute('class', 'oddcircle');
            circle.setAttribute('id', odds[0][j] + ' black circle ' + j);
            pieceHelper(circle);
            circle.innerHTML = odds[0][j];
            j++;    
        }
    }
    j = 0;

    // Place down triangles for black.
    for(i = 24; i >= 11; i--){
        if(!(i <= 22 && i >= 19) && !(i <= 16 && i >= 15)){
            let triangle = document.getElementById(i).appendChild(document.createElement("div"));
            triangle.setAttribute('class', 'oddtriangle');
            triangle.setAttribute('id', odds[1][j] + ' black triangle ' + j);
            pieceHelper(triangle);
            triangle.innerHTML = odds[1][j];
            j++;    
        }
    }
    j = 0;

    // Place down squares and pyramid for black.
    for(i = 16; i >= 1; i--){
        if(!(i <= 14 && i >= 11) && !(i <= 6 && i >= 3)){
            let square = document.getElementById(i).appendChild(document.createElement("div"));
            if(odds[2][j] == 190){
                square.setAttribute('class', 'oddpyramid');
                square.setAttribute('id', odds[2][j] + ' black pyramid ' + j);
            }
            else{
                square.setAttribute('class', 'oddsquare');
                square.setAttribute('id', odds[2][j] + ' black square ' + j);
            }
            pieceHelper(square);
            square.innerHTML = odds[2][j];
            j++
        }
    }
}
