import { _decorator, Button, Component, Label, Node } from 'cc';
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
        SoundController.instance.playOneShot("ButtonClick");
    }
    private onGoToMenuButtonClick(): void {
        if (this._option.callback) {
            this._option.callback("gotohomebutton");
        }
        this.hide();
        SoundController.instance.playOneShot("ButtonClick");
    }

    public init(option: GameOverScreenOption): void{
        super.init(option);
        this._option = option;
    }

}

export class GameOverScreenOption extends UIScreenOption{

}

