class Obstacle{
    constructor(lanePos, dimensions, speed){
        //car
        this.positionX = lanePos;
        this.positionY = 120;
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

        this.carImage = document.createElement("img")
        this.carImage.className = "car-image"
        if(this.width === 18 && this.positionX > 40){
            this.carImage.src = "./src/img/truck.png"
            this.carImage.style.transform = "rotate(0deg)"
        }
        if(this.width === 18 && this.positionX < 40){
            this.carImage.src = "./src/img/truck.png"
            this.carImage.style.transform = "rotate(180deg)"
        }
        if(this.width === 13 && this.positionX > 40){
            this.carImage.src = "./src/img/car.png"
            this.carImage.style.transform = "rotate(0deg)" 
        }
        if(this.width === 13 && this.positionX < 40){
            this.carImage.src = "./src/img/car.png"
            this.carImage.style.transform = "rotate(180deg)" 
        }
        if(this.width === 10){
            this.carImage.src = "./src/img/lca-shield.gif"
        }
        this.carElement.appendChild(this.carImage)
    }

    moveDown(){
        this.positionY -= this.speed;
        this.carElement.style.bottom = `${this.positionY}%`
    }

    removeCar(){
        this.carElement.remove()
    }
}