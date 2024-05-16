import { _decorator, Animation, AudioClip, Button, Color, Component, Node, Sprite, SpriteFrame } from 'cc';
import { SoundController } from '../Manager/SoundController';
const { ccclass, property } = _decorator;

@ccclass('CardCtrl')
export class CardCtrl extends Component {
    @property(Animation)
    cardAnim : Animation = null;
    @property(Button)
    button : Button = null;
    @property(Sprite)
    lightBG : Sprite = null;

    cardId : number = 0;
    private _option: CardOption = null;

    public initialiseCard(option: CardOption): void {
        this._option = option;
        this.cardId = option.cardId;
        // this.lightBG.spriteFrame = this._option.newSpriteFrame;
        this.lightBG.color = this._option.color;
        this.playAnimation('normal')
    }

    onLoad() {
        this.button.node.on(Node.EventType.TOUCH_END, this.onCardButtonClick, this);
    }
    public onPlayEffects() : void{
        this.playAnimation('highlight');
        SoundController.instance.playOneShot(this._option.sfxClip);
    }

    private playAnimation(animName : string): void{
        if (this.cardAnim) {
            this.cardAnim.play(animName);
        }
    }

    private onCardButtonClick(): void{
        if (this._option && this._option.callback) {
            this._option.callback(this);
        }
    }
}

export interface CardOption {
    newSpriteFrame : SpriteFrame;
    color : Color;
    cardId : number;
    sfxClip :AudioClip;
    callback?: (card: CardCtrl) => void;
}

