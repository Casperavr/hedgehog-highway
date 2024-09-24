// create instances
const gameBoard = new Board();
const peterHedgehog = new Player();
const tataSteel = new Obstacle(9, {width: 13, height: 20}, 0.9);

// global variable declaration and/or initialization
let keyState = {};
let vehicleArray = []
vehicleArray.push(tataSteel)


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
    
    
    // iterating over vehicle instances: collision detection and out of bounds removal
    // collision detection
    for(let i = 0 ; i < vehicleArray.length; i++){
        vehicleArray[i].moveDown();
        
        if(
            peterHedgehog.positionX < vehicleArray[i].positionX + vehicleArray[i].width &&
            peterHedgehog.positionX + peterHedgehog.width > vehicleArray[i].positionX &&
            peterHedgehog.positionY < vehicleArray[i].positionY + vehicleArray[i].height &&
            peterHedgehog.positionY + peterHedgehog.height > vehicleArray[i].positionY
        ) {
            console.log("dead");
            clearInterval(gameTick);     
            clearInterval(spawnInterval);    
            peterHedgehog.hasDied();
        }
        // out of bounds removal
        if(vehicleArray[i].positionY + vehicleArray[i].height < -30){
            vehicleArray[i].removeCar()
            vehicleArray.splice(vehicleArray.indexOf(vehicleArray[i]), 1);
        }
    }    
    
          
}, 20) //20
    
const spawnInterval = setInterval(() => {
    let randomPos = Math.floor(Math.random()*4)
    let lanePos = randomPos === 0 ? 9 : randomPos === 1 ? 31.3 : randomPos === 2 ? 54.7 : 77
    // let lanePos = 9; // 7 for trucks, 9 for cars for pos 0
    // let lanePos = 31.3; // 29.3 for trucks, 31.3 for cars for pos 1
    // let lanePos = 54.7; // 52.7 for trucks, 54.7 for cars for pos 2
    // let lanePos = 77; // 75 for trucks, 77 for cars for pos 3
    // let lanePos = 77;
    
    let randomDimensions = Math.floor(Math.random() * 2)
    let dimensions = randomDimensions === 0 ? {width: 13, height: 20} : {width: 18, height: 36}

    let speed = 0.9;

    if(dimensions.width === 18){lanePos -= 2; speed = 0.6}
    console.log(lanePos)

    vehicleArray.push(new Obstacle(lanePos, dimensions, speed))
}, 1000)
