import { _decorator, Component, instantiate, Node, Prefab, sys } from 'cc';
import { UIManager } from './UIManager';
import { CardManager } from '../Card/CardManager';
import { Difficulty } from '../UIScreen/DifficultySelectionScreenCtrl';
import { SoundController } from './SoundController';

// import { PingPong } from '../Card/PingPong';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {

    @property(UIManager)
    private UIManager: UIManager = null;
    @property(CardManager)
    private CardManager: CardManager = null;

    private _currentDifficultyType : Difficulty = Difficulty.Easy;
    start() {
        this.init();
    }
    public goToDifficultySelectionScreen(): void{
        this.UIManager.showDifficultySelectionScreen();
    }

    public goToGamePlayScreen(type : Difficulty): void{
        this._currentDifficultyType = type;
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

    public onCardMatchFail(score : number): void{
        const currentHighScore = sys.localStorage.getItem('highScore');
        let newHighScore : boolean = false;
        if (currentHighScore !== null) {
            const currenthighscore = parseInt(currentHighScore);
            if(score>currenthighscore){
                sys.localStorage.setItem('highScore', score.toString());
                newHighScore = true;
            }
        } else {
            sys.localStorage.setItem('highScore', score.toString());
            newHighScore = true;
        }
        this.UIManager.showGameOverScreen(score,newHighScore);
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
        SoundController.instance.playBackgroundMusic();
        this.UIManager.initUIManager(this);
    }
}

