class Obstacle{
    constructor(lanePos, dimensions, speed){
        //car
        this.positionX = lanePos; // 29 {2 8 2 8 2 8 2 8 2} 29 // 31 : 41 ; 51 : 61
        this.positionY = 120;      // 6 19 33 46
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.speed = speed;

        this.createCarElement();
    }

    createCarElement(){
        this.carElement = document.createElement("div")

        this.carElement.className = "car-div"
        this.carElement.style.left = `${this.positionX}%`
        this.carElement.style.bottom = `${this.positionY}%`
        this.carElement.style.width = `${this.width}%`
        this.carElement.style.height = `${this.height}%`
        
        const boardElement = document.getElementById("board");
        boardElement.appendChild(this.carElement);
    }

    moveDown(){
        this.positionY -= this.speed;
        this.carElement.style.bottom = `${this.positionY}%`
    }

    removeCar(){
        this.carElement.remove()
    }
}