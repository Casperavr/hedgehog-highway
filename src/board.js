class Board{
    constructor(){
        this.scoreArray = ["first", "second", "third", "fourth", "fifth", "sixth"];
        this.shieldsArray = ["one", "two", "three"];
        this.createTitle();
        this.createBoard();
        this.createScore();
        this.createShields();
        this.animationSpeed = 2; // Initial speed
        // this.updateDifficulty(1);
    }


    createTitle(){
        this.titleElement = document.createElement("h1");
        this.titleElement.id = "title";
        this.titleElement.innerText = "Hedgehog Highway".toUpperCase();
        const rootElement = document.getElementById("root");
        rootElement.appendChild(this.titleElement);
    }
    
    createBoard(){
        this.boardElement = document.createElement("div");
        this.boardElement.id = "board";
        const rootElement = document.getElementById("root");
        rootElement.appendChild(this.boardElement);
    }
    
    createScore(){
        this.scoreElement = document.createElement("div");
        this.scoreElement.id = "score";
        const rootElement = document.getElementById("root");
        rootElement.appendChild(this.scoreElement);
        for(let i = 0; i < this.scoreArray.length; i++){
            this.scoreIndex = document.createElement("div");
            this.scoreIndex.className = "scoreNumber";
            this.scoreElement.appendChild(this.scoreIndex);
            this.scoreImage = document.createElement("img");
            this.scoreImage.id = this.scoreArray[i];
            this.scoreIndex.appendChild(this.scoreImage);
        }
    }

    createShields(){
        this.shieldsElement = document.createElement("div");
        this.shieldsElement.id = "shields";
        const rootElement = document.getElementById("root")
        rootElement.appendChild(this.shieldsElement);
        for(let i = 0; i < this.shieldsArray.length; i++){
            this.shieldsIndex = document.createElement("div");
            this.shieldsIndex.className = "shieldNumber";
            this.shieldsElement.appendChild(this.shieldsIndex);
            this.shieldsImage = document.createElement("img");
            this.shieldsImage.id = this.shieldsArray[i];
            this.shieldsIndex.appendChild(this.shieldsImage);
        }
    }

    updateScore(score){
        for(let i = 0; i < score.length; i++){
            const scoreIndex = document.getElementById(this.scoreArray[i]);
            scoreIndex.src = `./src/img/${score[i]}.png`;
        }
    }

    updateShields(shieldCount){
        for(let i = 0; i < shieldCount; i++){
            const shieldsIndex = document.getElementById(this.shieldsArray[i]);
            shieldsIndex.src = `./src/img/lca-shield.png`
        }
        for(let i = shieldCount; i < this.shieldsArray.length; i++){
            const shieldsIndex = document.getElementById(this.shieldsArray[i]);
            shieldsIndex.src = `./src/img/emptyshield.png`
        }
    }

    updateDifficulty(difficulty) {
        this.animationSpeed = 2 - (difficulty / 20);
        this.boardElement = document.getElementById("board");
        this.boardElement.style.animationDuration = `${this.animationSpeed}s`;
    // }

    // startAnimation() {
    // if(difficulty === 1){
    //     let startTime = null;
    //     const animate = (timestamp) => {
    //         if (!startTime) startTime = timestamp;
    //         const elapsed = (timestamp - startTime) / 1000;
    //         const progress = (elapsed % this.animationSpeed) / this.animationSpeed;
    //         const backgroundPositionY = progress * 100;
    //         this.boardElement.style.backgroundPositionY = `${backgroundPositionY}%`;
    //         console.log(backgroundPositionY)
    //         requestAnimationFrame(animate);
    //     };
    //     requestAnimationFrame(animate);
    //     }
    }

    
}