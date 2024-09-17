window.onload = function() {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(Start, 200);
}

snakeX = 7;
snakeY = 7;
var candy = [
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0],
    [0, 0, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 0, 0],
    [0, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 0],
    [0, 1, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0],
    [1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
    [1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 1, 1, 0],
    [0, 0, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 0, 0],
    [0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
];

var unicorn = [
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 2, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 1, 0, 0, 1, 10, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 2, 1, 0, 1, 10, 1, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 1, 10, 10, 1, 3, 3, 4, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 10, 10, 10, 1, 4, 2, 2, 5, 6, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 10, 10, 10, 10, 1, 5, 5, 6, 7, 7, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 10, 1, 1, 10, 1, 6, 1, 7, 7, 7, 7, 1, 0, 0],
    [0, 0, 0, 1, 10, 10, 1, 10, 1, 10, 1, 10, 1, 7, 7, 8, 9, 1, 0],
    [0, 0, 0, 1, 10, 1, 7, 1, 10, 10, 10, 10, 1, 7, 8, 8, 9, 9, 1],
    [0, 0, 1, 10, 10, 1, 1, 10, 10, 10, 10, 10, 1, 8, 1, 9, 9, 11, 1],
    [0, 0, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 9, 1, 11, 11, 11, 1],
    [0, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 10, 1, 3, 1, 0],
    [0, 1, 10, 10, 1, 10, 10, 1, 1, 10, 10, 10, 10, 10, 10, 1, 3, 1, 0],
    [0, 0, 1, 10, 10, 10, 1, 0, 1, 10, 10, 10, 10, 10, 10, 10, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
];    

size = 38;
smallsize = 10;
gamesize = 38;
currentsize = 12;
appleX = 3;
appleY = 4;
unci = 2;
directionX = 0;
directionY = 0;
gametail = [];
tail = 5;

function keyPush(evt) { 
    switch (evt.keyCode) { 
        case 37: 
            directionX = -1; 
            directionY = 0; 
            break; 
        case 38: 
            directionX = 0; 
            directionY = -1; 
            break; 
        case 39: 
            directionX = 1; 
            directionY = 0; 
            break; 
        case 40: 
            directionX = 0; 
            directionY = 1; 
            break; 
    }
}

function Start() { 
    snakeX += directionX; 
    snakeY += directionY; 
    
    if (snakeX < 0) { 
        snakeX = currentsize - 1; 
    } 
    if (snakeX > currentsize - 1) { 
        snakeX = 0; 
    } 
    if (snakeY < 0) { 
        snakeY = currentsize - 1; 
    } 
    if (snakeY > currentsize - 1) { 
        snakeY = 0; 
    }
    
    ctx.fillStyle = "pink"; 
    ctx.fillRect(0, 0, canv.width, canv.height); 
    
    for (var i = 0; i < gametail.length; i++) {
        if ((i + 1) % 7 == 0) {
            ctx.fillStyle = "violet";
        }
        if ((i + 1) % 7 == 6) {
            ctx.fillStyle = "blue";
        }
        if ((i + 1) % 7 == 5) {
            ctx.fillStyle = "DeepSkyBlue";
        }
        if ((i + 1) % 7 == 4) {
            ctx.fillStyle = "green";
        }
        if ((i + 1) % 7 == 3) {
            ctx.fillStyle = "yellow";
        }
        if ((i + 1) % 7 == 2) {
            ctx.fillStyle = "orange";
        }
        if ((i + 1) % 7 == 1) {
            ctx.fillStyle = "red";
        }
        ctx.fillRect(gametail[i].x * size, gametail[i].y * size, size - 4, size - 4); 
        
        if (gametail[i].x == snakeX && gametail[i].y == snakeY) { 
            tail = 5; 
        } 
    }

    gametail.push({x: snakeX, y: snakeY}); 
    
    while (gametail.length > tail) { 
        gametail.shift(); 
    }

    if (appleX == snakeX && appleY == snakeY) { 
        tail++; 
        appleX = Math.floor(Math.random() * currentsize); 
        appleY = Math.floor(Math.random() * currentsize); 
    }

    for (j = 0; j < unicorn[0].length; j++) {
        for (i = 0; i < unicorn.length; i++) {
            if (gametail.length > 0) {
                if (unicorn[i][j] == 0) {
                    ctx.fillStyle = "pink";
                }
                if (unicorn[i][j] == 10) {
                    ctx.fillStyle = "white";
                }
                if (unicorn[i][j] == 1) {
                    ctx.fillStyle = "black";
                }
                if (unicorn[i][j] == 2) {
                    ctx.fillStyle = "yellow";
                }
                if (unicorn[i][j] == 3) {
                    ctx.fillStyle = "red";
                }
                if (unicorn[i][j] == 4) {
                    ctx.fillStyle = "orange";
                }
                if (unicorn[i][j] == 5) {
                    ctx.fillStyle = "green";
                }
                if (unicorn[i][j] == 6) {
                    ctx.fillStyle = "green";
                }
                if (unicorn[i][j] == 7) {
                    ctx.fillStyle = "blue";
                }
                if (unicorn[i][j] == 9) {
                    ctx.fillStyle = "violet";
                }
                if (unicorn[i][j] == 11) {
                    ctx.fillStyle = "pink";
                }
                ctx.fillRect((j * unci + gametail[gametail.length - 1].x * size), i * unci + gametail[gametail.length - 1].y * size, unci, unci);
            }
        }
    }

    for (j = 0; j < candy[0].length; j++) {
        for (i = 0; i < candy.length; i++) {
            if (candy[i][j] == 0) {
                ctx.fillStyle = "pink";
            }
            if (candy[i][j] == 1) {
                ctx.fillStyle = "red";
            }
            if (candy[i][j] == 2) {
                ctx.fillStyle = "white";
            }
            ctx.fillRect(j * unci + appleX * gamesize, i * unci + appleY * gamesize, unci, unci);
        }
    }

    var sp1 = document.createElement("div"); 
    var div_text2_deep = document.getElementById(1); 
    var content = document.createTextNode((gametail.length - 5)); 

    if (div_text2_deep != null) { 
        var parentDiv = div_text2_deep.parentNode; 
        sp1.appendChild(content); 
        sp1.setAttribute("id", "1"); 
        sp1.setAttribute("style", "font-size: 50px;"); 
        parentDiv.replaceChild(sp1, div_text2_deep); 
    }
}
