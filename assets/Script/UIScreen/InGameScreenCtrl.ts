import { _decorator, Button, Component, Label, Node } from 'cc';
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
    private _option : InGameScreenOption;

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
        this.Score.string = "Score: 0";
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
        this.Score.string = "Score: "+score;
    }

    private updateTurnLabel = (turn: string): void => {
        this.Turn.string = "Turn: "+turn;
        
    }
}

export class InGameScreenOption extends UIScreenOption{

}

