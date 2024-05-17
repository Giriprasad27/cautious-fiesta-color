import { _decorator, Button, Component, Label, Node, Sprite, SpriteFrame, sys } from 'cc';
import { UIScreenBaseCtrl, UIScreenOption } from './UIScreenBaseCtrl';
import { CardManager } from '../Card/CardManager';
import { SoundController } from '../Manager/SoundController';
const { ccclass, property } = _decorator;

@ccclass('InGameScreenCtrl')
export class InGameScreenCtrl extends UIScreenBaseCtrl{
    @property(Node)
    TapPanel: Node = null;
    @property(Node)
    IngamePanel: Node = null;
    @property(Button)
    TapToStartButton: Button = null;
    @property(Button)
    PauseButton: Button = null;
    @property(Label)
    Turn: Label = null;
    @property(Label)
    Score: Label = null;
    @property(Label)
    HighScore: Label = null;
    @property(Sprite)
    TurnIcon: Sprite = null;
    @property(SpriteFrame)
    RepeatIcon: SpriteFrame = null;
    @property(SpriteFrame)
    ListenIcon: SpriteFrame = null;
    private _option : InGameScreenOption;

    private currentHighscore : number = 0;


    protected onLoad(): void {
        this.TapToStartButton.node.on(Button.EventType.CLICK, this.onTapToStartuttonClick, this);
        this.PauseButton.node.on(Button.EventType.CLICK, this.onPauseButtonClick, this);
    }

    public init(option: InGameScreenOption): void{
        super.init(option);
        this._option = option;
        this.TapPanel.active = true;
        this.IngamePanel.active = false;
        this.PauseButton.node.active = true;
        this.Score.string = "0";

        const currentHighScore = sys.localStorage.getItem('highScore');
        if (currentHighScore !== null) {
            this.currentHighscore = parseInt(currentHighScore);
            this.HighScore.string = currentHighScore;
        } else {
            this.HighScore.string = "0";
        }

        CardManager.onScoreIncrement = this.updateScoreLabel;
        CardManager.onTurnChange = this.updateTurnLabel;
    }

    private onTapToStartuttonClick(): void {
        this.TapPanel.active = false;
        this.IngamePanel.active = true;
        if (this._option.callback) {
            this._option.callback("taptostart");
        }
        SoundController.instance.PlayButtonClick();
    }

    private onPauseButtonClick(): void {
        if (this._option.callback) {
            this._option.callback("pausebutton");
        }
        SoundController.instance.PlayButtonClick();
    }

    private updateScoreLabel = (score: number): void => {
        // Update the score label with the new score
        this.Score.string = score.toString();
        if(score>this.currentHighscore){
            this.HighScore.string = score.toString();
        }
    }

    private updateTurnLabel = (isPlayerTurn: boolean): void => {
        setTimeout(() => {
            if(isPlayerTurn){
                this.Turn.string = "Repeat";
                this.TurnIcon.spriteFrame = this.RepeatIcon;
            }
            else{
                this.Turn.string = "Listen";
                this.TurnIcon.spriteFrame = this.ListenIcon
            }
        },800);
    }
}

export class InGameScreenOption extends UIScreenOption{

}

