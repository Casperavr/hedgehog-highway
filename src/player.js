class Player{
    constructor(){
        this.positionX = 10; //windowDimensions.width / 100 * 
        this.positionY = 5;
        this.width = 12;
        this.height = 20;

        this.createHedgie();
    }

    createHedgie(){
        this.hedgieElement = document.createElement("div");
        this.hedgieElement.id = "hedgie";
        this.hedgieElement.style.left = `${this.positionX}%`;
        this.hedgieElement.style.bottom = `${this.positionY}%`;
        this.hedgieElement.style.width = `${this.width}%`;
        this.hedgieElement.style.height = `${this.height}%`;
        const rootElement = document.getElementById("board");
        rootElement.appendChild(this.hedgieElement);
    }

    moveLeft(){
        if(this.positionX > 0){
            this.positionX -= 1.5;
            this.hedgieElement.style.left = `${this.positionX}%`;
            this.hedgieElement.style.transform = "rotate(-20deg)"            

        }
    }

    stopMoveLeft(){
        this.hedgieElement.style.transform = "rotate(0)"
    }

    moveRight(){
        if(this.positionX < 90){
            this.positionX += 1.5;
            this.hedgieElement.style.left = `${this.positionX}%`;
            this.hedgieElement.style.transform = "rotate(20deg)"

        }
    }

    stopMoveRight(){
        this.hedgieElement.style.transform = "rotate(0)"
    }

    moveUp(){
        if(this.positionY < 65){
            this.positionY += 1;
            this.hedgieElement.style.bottom = `${this.positionY}%`;
        }
    }

    moveDown(){
        if(this.positionY > 0){
            this.positionY -= 1;
            this.hedgieElement.style.bottom = `${this.positionY}%`;
        }
    }

    hasDied(scoreCounter){

        clearInterval(gameTick);

        if(scoreCounter > localStorage.getItem("highscore")){
            localStorage.setItem("highscore", scoreCounter);
        }

        setTimeout(() => {

            this.scoreElement.remove();

            this.deathScreenElement = document.createElement("div");
            this.deathScreenElement.id = "gameover";
            const bodyElement = document.getElementsByTagName("body")[0];
            bodyElement.appendChild(this.deathScreenElement);

            this.deathMessageElement = document.createElement("h2");
            this.deathMessageElement.innerText = "Game Over";
            this.deathScreenElement.appendChild(this.deathMessageElement);

            this.finalScoreElement = document.createElement("h3");
            this.finalScoreElement.innerText = `Score: ${scoreCounter}
            Highscore: ${localStorage.getItem("highscore")}`;
            this.deathScreenElement.appendChild(this.finalScoreElement);

            this.tryAgainButton = document.createElement("a")
            this.tryAgainButton.setAttribute("href", "./index.html")
            this.tryAgainButton.innerText = "Press Space or click to try again";

            this.deathScreenElement.appendChild(this.tryAgainButton);
        }, 2000);
    }
}