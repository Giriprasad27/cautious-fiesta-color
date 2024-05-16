import { _decorator, Button, Component, Node } from 'cc';
import { SceneManager } from './SceneManager';
import { MenuScreenCtrl, MenuScreenOption } from '../UIScreen/MenuScreenCtrl';
import { InGameScreenCtrl, InGameScreenOption } from '../UIScreen/InGameScreenCtrl';
import { GameOverScreenCtrl, GameOverScreenOption } from '../UIScreen/GameOverScreenCtrl';
import { DifficultySelectionOption, DifficultySelectionScreenCtrl, Difficulty } from '../UIScreen/DifficultySelectionScreenCtrl';
import { PauseScreenCtrl, PauseScreenOption } from '../UIScreen/PauseScreenCtrl';

const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property(MenuScreenCtrl)
    MenuScreen:MenuScreenCtrl = null; 
    @property(DifficultySelectionScreenCtrl)
    DifficultySelectionScreen:DifficultySelectionScreenCtrl = null; 
    @property(InGameScreenCtrl)
    InGameScreen:InGameScreenCtrl = null; 
    @property(PauseScreenCtrl)
    PauseScreen:PauseScreenCtrl = null; 
    @property(GameOverScreenCtrl)
    GameOverScreen:GameOverScreenCtrl = null; 

    private _sceneManager: SceneManager;

    public initUIManager(sceneManager: SceneManager ): void{
        this._sceneManager = sceneManager;
        this.showMenuScreen();
    }

    public showMenuScreen(): void{
        let option: MenuScreenOption = {
            callback: this.menuScreenCallBack.bind(this)
        };
        this.MenuScreen.init(option);
    }

    public showDifficultySelectionScreen(): void{
        let option: DifficultySelectionOption = {
            selectionCallback: this.difficultyScreenCallBack.bind(this)
        };
        this.DifficultySelectionScreen.init(option);
    }

    public showInGameUIScreen(): void{
        let option: InGameScreenOption = {
            callback: this.inGameScreenCallBack.bind(this)
        };
        this.InGameScreen.init(option);
    }

    public showPauseScreen(): void{
        let option: PauseScreenOption = {
            callback: this.pauseScreenCallBack.bind(this)
        };
        this.InGameScreen.hide();
        this.PauseScreen.init(option);
    }

    public showGameOverScreen(score : number): void{
        this.InGameScreen.hide();
        let option: GameOverScreenOption = {
            callback: this.gameOverScreenCallBack.bind(this),
            score : score
        };
        this.GameOverScreen.init(option);
    }

    private menuScreenCallBack = (type: string): void => {
        switch (type) {
            case "playbutton":
                this._sceneManager.goToDifficultySelectionScreen();
                break;
        }
    }

    private difficultyScreenCallBack = (type: Difficulty): void => {
        this._sceneManager.goToGamePlayScreen(type);
    }

    private inGameScreenCallBack = (type: string): void => {
        switch (type) {
            case "pausebutton":
                this._sceneManager.pauseGamePlay(true);
                break;
            case "taptostart":
                this._sceneManager.startGamePlay();
                break;
        }
    }

    private pauseScreenCallBack = (type: string): void => {
        switch (type) {
            case "resumebutton":
                this.InGameScreen.show();
                this._sceneManager.pauseGamePlay(false);
                break;
            case "gotomenubutton":
                this._sceneManager.OnGoToMenu();
                break;
        }
    }
    private gameOverScreenCallBack = (type: string): void => {
        switch (type) {
            case "retrybutton":
                this._sceneManager.OnRestartGame();
                break;
            case "gotohomebutton":
                this._sceneManager.OnGoToMenu();
                break;
        }
    }
}

class UiCallback {
    type: string;
    value: number = 0;

    constructor(type: string) {
        this.type = type;
    }
}

