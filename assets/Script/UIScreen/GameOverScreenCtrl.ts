import { _decorator, AudioClip, Button, Component, Label, Node } from 'cc';
import { UIScreenBaseCtrl, UIScreenOption } from './UIScreenBaseCtrl';
import { SoundController } from '../Manager/SoundController';
const { ccclass, property } = _decorator;

@ccclass('GameOverScreenCtrl')
export class GameOverScreenCtrl extends UIScreenBaseCtrl {
    @property(Button)
    RetryButton: Button = null;
    @property(Button)
    GoToMenuButton: Button = null;
    @property(Label)
    Score: Label = null;
    @property(AudioClip)
    gameOverSFX: AudioClip = null;
    @property(AudioClip)
    highScoreSfx: AudioClip = null;
    @property(Node)
    newHighScoreObject: Node = null;

    private _option : GameOverScreenOption;

    protected onLoad(): void {
        this.RetryButton.node.on(Button.EventType.CLICK, this.onRetryButtonClick, this);
        this.GoToMenuButton.node.on(Button.EventType.CLICK, this.onGoToMenuButtonClick, this);
    }

    private onRetryButtonClick(): void {
        if (this._option.callback) {
            this._option.callback("retrybutton");
        }
        this.hide();
        SoundController.instance.PlayButtonClick();
    }
    private onGoToMenuButtonClick(): void {
        if (this._option.callback) {
            this._option.callback("gotohomebutton");
        }
        this.hide();
        SoundController.instance.PlayButtonClick();
    }

    public init(option: GameOverScreenOption): void{
        super.init(option);
        this._option = option;
        this.Score.string = "Score: "+this._option.score;
        SoundController.instance.playOneShot(this.gameOverSFX);
        this.newHighScoreObject.active = false;
        if(this._option.isNewHighScore){
            setTimeout(() => {
                this.newHighScoreObject.active = this._option.isNewHighScore;
                SoundController.instance.playOneShot(this.highScoreSfx);
            }, 1600);
        }
        
    }

}

export class GameOverScreenOption extends UIScreenOption{
    public score :number = 0;
    public isNewHighScore :boolean = false;
}

