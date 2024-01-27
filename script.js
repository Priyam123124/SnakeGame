let inputdir = {x: 0, y: 0}
let snakearr = [{x: 13, y: 15}]
let food = {x: 8, y: 9}
let speed = 19;
let lastPaintTime = 0;
let iscore = 0;
let heightscore = 0;
let score = document.getElementsByClassName("score");
let highscore = document.getElementsByClassName("highscore");
let board = document.getElementById('board');

//game sounds
let gamesound = new Audio("game sound.mp3")
let gamestart = new Audio("game-start-6104.mp3");
let foodeat = new Audio('food eat.mp3');
let gameover = new Audio('game over.mp3')

//variables for different levels
let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");

let division = document.getElementById("id1");

easy.addEventListener('click', ()=>{
    division.style.display = "none";
    function main(ctime){
        window.requestAnimationFrame(main);
        if((ctime - lastPaintTime)/3000 < 1/speed){
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }
    
    window.requestAnimationFrame(main);
    control();
})

medium.addEventListener('click', ()=>{
    division.style.display = "none";
    function main(ctime){
        window.requestAnimationFrame(main);
        if((ctime - lastPaintTime)/2000 < 1/speed){
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }
    window.requestAnimationFrame(main);
    control();
})

hard.addEventListener('click', ()=>{
    division.style.display = "none";
    function main(ctime){
        window.requestAnimationFrame(main);
        if((ctime - lastPaintTime)/1000 < 1/speed){
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }

    window.requestAnimationFrame(main);
    control();
    
})

function collision(snakearr){
    if(snakearr.length === 0) {
        return false;
    }

    for(let i = 1; i < snakearr.length; i++) {
        if(snakearr[0].x === snakearr[i].x && snakearr[0].y === snakearr[i].y){
            return true;
        }
    }
    if(snakearr[0].x > 18 || snakearr[0].y > 18 || snakearr[0].y <=0 || snakearr[0].x <=0) {
        return true;
}

return false;
}

function gameEngine(){

    setInterval(()=>{
        gamesound.play();
    }, 0);

    //Function Of Collision

    if(collision(snakearr)){
        gamesound.pause();
        gameover.play();
        inputdir = {x: 0, y: 0};
        iscore = 0;
        alert("GameOver! Press any key to play again")
        score[0].innerHTML = `<p class ="score">Score:- ${iscore}</p>`
        snakearr = [{x: 13, y: 15}]
        food = {x: 8, y: 9}
        
    }

    if(iscore > heightscore) {
        heightscore = iscore;
        highscore[0].innerHTML = `<p class="highscore">HighScore:- ${heightscore}</p>`
    }



    //Display of snake
    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement)
    })
    //Display of food
    let FoodElement = document.createElement('div');
        FoodElement.style.gridRowStart = food.y;
        FoodElement.style.gridColumnStart = food.x;
            FoodElement.classList.add("food");
        board.appendChild(FoodElement)

        //move the snake
        for(let i = snakearr.length - 2; i >=0; i--) {
            snakearr[i+1].x = snakearr[i].x;
            snakearr[i+1].y = snakearr[i].y;
        }
        // in the prev syntax we are not doing anything to 0th element
        // so we are adding inpurdir's x and y in snakearr's x and y
        //watch 51:06 video timeStamp
        snakearr[0].x += inputdir.x;  
        snakearr[0].y += inputdir.y;

        //eat food
        if(food.x === snakearr[0].x && food.y === snakearr[0].y) {
            foodeat.play();
            food = {x: Math.round(2 + 16*Math.random()), y: Math.round(2 + 16*Math.random())}
            snakearr.push({x: inputdir.x, y: inputdir.y})

            iscore +=1
            score[0].innerHTML = `<p class ="score">Score:- ${iscore}</p>`

        }

}

//game function
window.requestAnimationFrame(main);
function control(){
window.addEventListener('keydown', e=>{
    switch(e.key) {
        case "ArrowUp":
        inputdir.x = 0;
        inputdir.y = -1;
        break;

        case "ArrowDown":
        inputdir.x = 0;
        inputdir.y = 1;
        break;

        case "ArrowLeft":
        inputdir.x = -1;
        inputdir.y = 0;
        break;

        case "ArrowRight":
        inputdir.x = 1;
        inputdir.y = 0;
        break;

        default:
        break;
    }
})
}
