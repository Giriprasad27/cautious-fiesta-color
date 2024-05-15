import { _decorator, Button, Component, Node } from 'cc';
import { UIScreenBaseCtrl, UIScreenOption } from './UIScreenBaseCtrl';
import { SoundController } from '../Manager/SoundController';
const { ccclass, property } = _decorator;

@ccclass('PauseScreenCtrl')
export class PauseScreenCtrl extends UIScreenBaseCtrl {
    @property(Button)
    ResumeButton: Button = null;
    @property(Button)
    HomeButton: Button = null;

    private _option : PauseScreenOption;

    protected onLoad(): void {
        this.ResumeButton.node.on(Button.EventType.CLICK, this.onResumeButtonClick, this);
        this.HomeButton.node.on(Button.EventType.CLICK, this.onMenuButtonClick, this);
    }

    public init(option: PauseScreenOption): void{
        super.init(option);
        this._option = option;
    }

    private onResumeButtonClick(): void {
        if (this._option.callback) {
            this._option.callback("resumebutton");
        }
        this.hide();
        SoundController.instance.playOneShot("ButtonClick");
    }
    private onMenuButtonClick(): void {
        if (this._option.callback) {
            this._option.callback("gotomenubutton");
        }
        this.hide();
        SoundController.instance.playOneShot("ButtonClick");
    }
}
export class PauseScreenOption extends UIScreenOption{

}

