// create instances
const gameBoard = new Board();
const peterHedgehog = new Player();
const tataSteel = new Obstacle(9, {width: 13, height: 20}, 2);

// global variable declaration and/or initialization
let keyState = {};
let vehicleArray = []
vehicleArray.push(tataSteel)
let score = 0;
let isDead = false;
let difficulty = 1;
let shields = 0;
gameBoard.updateShields(shields);
let spawnIntervalSpeed = 1000;

//
// functionality
//


// interaction

document.addEventListener("keydown", (event) => {
    keyState[event.keyCode] = true;
}, true);
document.addEventListener("keyup", (event) => {
    keyState[event.keyCode] = false;
}, true);

document.addEventListener("keydown", (event) => {
    if(event.code == "Space" && isDead){location.href = "./index.html"}
})


const gameTick = setInterval(() => {
    
    // movement logic
    if (!keyState[37]){ //left
        peterHedgehog.stopMoveLeft();
    }    
    
    if (!keyState[39]){ //right
        peterHedgehog.stopMoveRight();
    }
    
    if (keyState[37]){ //left
        peterHedgehog.moveLeft();
    }    
    
    if (keyState[39]){ //right
        peterHedgehog.moveRight();
    }
    
    if (keyState[38]){ //up
        peterHedgehog.moveUp();
    }
    
    if (keyState[40]){ //down
        peterHedgehog.moveDown();
    }


    // scorecounter
    score += 1;
    gameBoard.updateScore(score.toString().split(""))   
    
    // update difficulty
    if(score % 200 === 0){
        difficulty += 1;
        // if(difficulty % 5 === 0){
        //     clearInterval(spawnInterval);
        //     spawnIntervalSpeed -= 100;
        //     setInterval();
        // }
        // gameBoard.updateDifficulty(difficulty)
    }
    
    
    // iterating over vehicle instances: collision detection and out of bounds removal
    for(let i = 0 ; i < vehicleArray.length; i++){
        vehicleArray[i].moveDown();
        
        // collision detection
        if(
            peterHedgehog.positionX < vehicleArray[i].positionX + vehicleArray[i].width &&
            peterHedgehog.positionX + peterHedgehog.width > vehicleArray[i].positionX &&
            peterHedgehog.positionY < vehicleArray[i].positionY + vehicleArray[i].height &&
            peterHedgehog.positionY + peterHedgehog.height > vehicleArray[i].positionY
        ) { 
            if(vehicleArray[i].width !== 10 && shields === 0){
                console.log("dead");
                clearInterval(gameTick);     
                clearInterval(spawnInterval);    
                peterHedgehog.hasDied(score);
                isDead = true;
                gameBoard.updateDifficulty(60)
            } else if(vehicleArray[i].width === 10 && shields < 3){
                vehicleArray[i].removeCar()
                vehicleArray.splice(vehicleArray.indexOf(vehicleArray[i]), 1);
                shields += 1
                gameBoard.updateShields(shields);
                console.log(shields)
            } else if(vehicleArray[i].width !== 10 && shields > 0){
                vehicleArray[i].removeCar()
                vehicleArray.splice(vehicleArray.indexOf(vehicleArray[i]), 1);
                shields -= 1
                gameBoard.updateShields(shields);
            }

        }

        // out of bounds removal
        if(vehicleArray[i].positionY + vehicleArray[i].height < -30){
            vehicleArray[i].removeCar()
            vehicleArray.splice(vehicleArray.indexOf(vehicleArray[i]), 1);
        }
    }    

}, 20)
    
const spawnInterval = setInterval(() => {
    // pick a random lane
    let randomPos = Math.floor(Math.random()*4)
    let lanePos = randomPos === 0 ? 9 : randomPos === 1 ? 31.3 : randomPos === 2 ? 54.7 : 77;
    // console.log(vehicleArray[vehicleArray.length - 1].positionX, lanePos)
    if(vehicleArray[0] && vehicleArray[vehicleArray.length - 1].positionX === lanePos || 
        vehicleArray[0] && vehicleArray[vehicleArray.length - 1].positionX === lanePos - 2 ||
        vehicleArray[0] && vehicleArray[vehicleArray.length - 1].positionX === lanePos + 2){
        if(randomPos === 0 || randomPos === 1){
            randomPos += 1;
        } else {
            randomPos -= 1;
        }
        lanePos = randomPos === 0 ? 9 : randomPos === 1 ? 31.3 : randomPos === 2 ? 54.7 : 77;
        // console.log(lanePos)
    }
    

    // pick a random vehicle type
    let randomDimensions = Math.floor(Math.random() * 2)
    let dimensions = randomDimensions === 0 ? {width: 13, height: 23} : {width: 18, height: 45}

    // define base vehicle speed
    let speed;
    if(randomPos === 0 || randomPos === 1){
        speed = 1.3 + difficulty * 0.1
    } else if(randomPos === 2 || randomPos === 3){
        speed = 1 - difficulty * 0.05
    }

    // fix offset and speed for trucks
    if(dimensions.width === 18 && randomPos < 2){
        lanePos -= 2; 
        speed /= 0.9;
    } else if(dimensions.width === 18 && randomPos > 1){
        lanePos -= 2; 
        speed *= 1.5;
    }

    if(score % 1000 === 0 && shields < 3){
        vehicleArray.push(new Obstacle(lanePos + 2, {width: 10, height: 10}, speed))
    } else if(vehicleArray[vehicleArray.length - 1].lanePos !== lanePos){
        vehicleArray.push(new Obstacle(lanePos, dimensions, speed))
    } 
    // console.log(vehicleArray[vehicleArray.length - 1])
}, spawnIntervalSpeed)
