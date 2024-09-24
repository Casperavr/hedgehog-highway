class Board{
    constructor(){
        // this.positionX = positionX
        this.createTitle();
        this.createBoard();
    }


    createTitle(){
        this.titleElement = document.createElement("h1");
        this.titleElement.id = "title";
        this.titleElement.innerText = "Hedgehog Highway".toUpperCase()
        const rootElement = document.getElementById("root")
        rootElement.appendChild(this.titleElement)
    }
    
    createBoard(){
        this.boardElement = document.createElement("div");
        this.boardElement.id = "board";
        const rootElement = document.getElementById("root")
        rootElement.appendChild(this.boardElement)
    }
}