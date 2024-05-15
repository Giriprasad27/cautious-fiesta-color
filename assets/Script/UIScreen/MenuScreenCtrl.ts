import { _decorator, Button, Component, Node } from 'cc';
import { UIScreenBaseCtrl, UIScreenOption } from './UIScreenBaseCtrl';
import { SoundController } from '../Manager/SoundController';
const { ccclass, property } = _decorator;

@ccclass('MenuScreenCtrl')
export class MenuScreenCtrl extends UIScreenBaseCtrl {
    @property(Button)
    StartButton: Button = null;
    private _option : MenuScreenOption;

    protected onLoad(): void {
        this.StartButton.node.on(Button.EventType.CLICK, this.onPlayButtonClick, this);
    }

    public init(option: MenuScreenOption): void{
        super.init(option);
        this._option = option;
    }

    private onPlayButtonClick(): void {
        if (this._option.callback) {
            this._option.callback("playbutton");
        }
        this.hide();
        SoundController.instance.playOneShot("ButtonClick");
    }
}
export class MenuScreenOption extends UIScreenOption{

}

