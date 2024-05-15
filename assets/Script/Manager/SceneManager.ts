import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { UIManager } from './UIManager';
import { CardManager } from '../Card/CardManager';
import { Difficulty } from '../UIScreen/DifficultySelectionScreenCtrl';

// import { PingPong } from '../Card/PingPong';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {

    @property(UIManager)
    private UIManager: UIManager = null;
    @property(CardManager)
    private CardManager: CardManager = null;

    start() {
        this.init();
    }
    public goToDifficultySelectionScreen(): void{
        this.UIManager.showDifficultySelectionScreen();
    }

    public goToGamePlayScreen(type : Difficulty): void{
        this.CardManager.initCardManager(type,this);
        this.UIManager.showInGameUIScreen();
    }

    public startGamePlay():void{
        this.CardManager.startGame();
    }
    public pauseGamePlay(val : boolean):void{
        if(val){
            this.UIManager.showPauseScreen();
        }
        this.CardManager.pauseGame(val);
    }

    public onCardMatchFail(): void{
        this.UIManager.showGameOverScreen();
    }

    public OnRestartGame(): void{
        this.CardManager.resetGame();
        this.UIManager.showInGameUIScreen();
    }

    public OnGoToMenu(): void{
        this.CardManager.ClearGrid();
        this.UIManager.showMenuScreen();
    }

    private init() : void{
        this.UIManager.initUIManager(this);
    }
}

