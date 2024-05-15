import { _decorator, Component, Node, UITransform, Prefab, instantiate, Vec3, SpriteFrame } from 'cc';
import { SceneManager } from '../Manager/SceneManager';
import { CardCtrl } from './CardCtrl';
import { CardOption } from "./CardCtrl";
import { Difficulty } from '../UIScreen/DifficultySelectionScreenCtrl';
const { ccclass, property } = _decorator;

@ccclass('CardManager')
export class CardManager extends Component {
   // Properties
    @property(Prefab)
    private cardPrefab: Prefab = null;
    CardCtrl
    @property({ type: [SpriteFrame] })
    spriteArray: SpriteFrame[] = [];
    @property(Node)
    private grid: Node = null;
    private columnCount: number = 10; 
    private rowCount: number = 10; 
    @property
    private xPadding: number = 0; 
    @property
    private yPadding: number = 0; 

    // event
    public static onScoreIncrement: ((score: number) => void) | null = null;
    public static onTurnChange: ((turn: string) => void) | null = null;
    

    // private paramenters
    private _cards: CardCtrl[] = [];

    //gameData
    private _scoreIncrementor : number = 10;
    private _turns: number[] = [];
    private _score :number = 0;
    private _isPlayerTurn :boolean = false;
    private _playerTurnCounter :number = 0;
    private _isGameCompleted : boolean = false;
    private _type : Difficulty = Difficulty.Easy;

    private _sceneManager: SceneManager;
    public initCardManager(type : Difficulty, sceneManager :SceneManager ): void{
        this._sceneManager = sceneManager;
        this._type = type;
        switch (this._type ) {
            case Difficulty.Easy:
                this.columnCount = 2;
                this.rowCount = 2;
                break;
            case Difficulty.Medium:
                this.columnCount = 3;
                this.rowCount = 2;
                break;
            case Difficulty.Hard:
                this.columnCount = 4;
                this.rowCount = 2;
            break;
        }
        this.resetGame();
        this.createCardGrid();
    }
    
    public resetGame(): void{
        this._turns = [];
        this._score = 0;
        this._isGameCompleted = false;
    }

    public startGame():void{
        this.playInitEffects(100);
        this.playCpuTurn();
    }

    public ClearGrid():void{
        for (const card of this._cards) {
            card.node.destroy();
        }
        this._cards = [];
    }

    private createCardGrid(): void{
        let sprintCounter = 0;
        const uiTransform = this.grid.getComponent(UITransform);
        const itemWidth = uiTransform.width / this.columnCount;
        const itemHeight = uiTransform.height / this.rowCount;
        // // Generate grid items
        for (let row = 0; row < this.rowCount; row++) {
            for (let col = 0; col < this.columnCount; col++) {
                // Instantiate grid item prefab
                const cardItem = instantiate(this.cardPrefab);
                this.grid.addChild(cardItem);
                // Set size of grid item based on content size. Position grid item within the grid
                const cardTransform = cardItem.getComponent(UITransform);
                cardTransform.width = itemWidth;
                cardTransform.height = itemHeight;
                const pos = new Vec3((col * itemWidth)+this.xPadding , (row * itemHeight)+this.yPadding, 0);
                cardItem.setPosition(pos);
                //Init card
                const card = cardItem.getComponent(CardCtrl);
                let cardOption: CardOption = {
                    newSpriteFrame : this.spriteArray[sprintCounter],
                    cardId : sprintCounter,
                    callback: this.onCardButtonClick.bind(cardItem)
                };
                card.initialiseCard(cardOption);
                this._cards.push(card);

                sprintCounter++;
                if(sprintCounter>=this.spriteArray.length){
                    sprintCounter = 0;
                }

                //naming card, debug purpose only
                card.name = "Card_"+row+"_"+col;
            }
        }
    }

    private onCardButtonClick = (card: CardCtrl): void => {
        if(this._isPlayerTurn && !this._isGameCompleted){
            card.onPlayEffects();
            this.checkForCardMarch(card.cardId);
            if(this._playerTurnCounter == this._turns.length){
                this._isPlayerTurn = false;
                this.playCpuTurn();
            }
        }
    }
    

    private checkForCardMarch(cardId:number) : void{
        if(cardId == this._turns[this._playerTurnCounter]){
            this._playerTurnCounter++;
            // add score
            this._score += this._scoreIncrementor;
            if(CardManager.onScoreIncrement){
                CardManager.onScoreIncrement(this._score);
            }
            console.log("checkForCardMarch sucess ");
        }else{
            // trigger game over
            this._isGameCompleted = true;
            this._sceneManager.onCardMatchFail();
            console.log("checkForCardMarch failed "+cardId+"  "+this._turns[this._playerTurnCounter]);
        }
    }

    private playInitEffects( delaytime: number): void{
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < this._cards.length) {
                this._cards[index].onPlayEffects();
                index++;
            } else {
                this._isPlayerTurn = true;
                this._playerTurnCounter = 0;
                clearInterval(intervalId); // Stop the interval when all elements have been processed
            }
        }, delaytime);
    }

    private playCpuTurn(): void{
        this._isPlayerTurn = false;
        this._playerTurnCounter = 0;
        if(CardManager.onTurnChange){
            CardManager.onTurnChange("CPU");
        }
        setTimeout(() => {
            let index = 0;
            let randomId = Math.floor(Math.random() * this._cards.length);
            this._turns.push(randomId);
            const intervalId = setInterval(() => {
                if (index < this._turns.length) {
                    this._cards[this._turns[index]].onPlayEffects();
                    index++;
                } else {
                    this._isPlayerTurn = true;
                    this._playerTurnCounter = 0;
                    if(CardManager.onTurnChange){
                        CardManager.onTurnChange("USER");
                    }
                    console.log("playEffects ends "+this._isPlayerTurn+"  "+this._playerTurnCounter);
                    clearInterval(intervalId); // Stop the interval when all elements have been processed
                }
            }, 600);//wait time between each cpu turn
        }, 2000); // wait time to start cpu turn
        
    }
}

