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

    private _option : GameOverScreenOption;

    protected onLoad(): void {
        this.RetryButton.node.on(Button.EventType.CLICK, this.onRetryButtonClick, this);
        this.GoToMenuButton.node.on(Button.EventType.CLICK, this.onGoToMenuButtonClick, this);
        SoundController.instance.playOneShot(this.gameOverSFX);
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
    }

}

export class GameOverScreenOption extends UIScreenOption{
    public score :number = 0;
}

