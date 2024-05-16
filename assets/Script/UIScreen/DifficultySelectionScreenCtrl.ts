import { _decorator, Button, Component, Node } from 'cc';
import { UIScreenBaseCtrl, UIScreenOption } from './UIScreenBaseCtrl';
import { SoundController } from '../Manager/SoundController';
const { ccclass, property } = _decorator;

@ccclass('DifficultySelectionScreenCtrl')
export class DifficultySelectionScreenCtrl extends UIScreenBaseCtrl {
    @property(Button)
    EasyButton: Button = null;
    @property(Button)
    MediumButton: Button = null;
    @property(Button)
    HardButton: Button = null;

    private _selectedDifficulty: Difficulty = Difficulty.Easy;
    private _option : DifficultySelectionOption;

    protected onLoad(): void {
        this.setupButtonClickHandlers();
    }

    public init(option: DifficultySelectionOption): void {
        super.init(option);
        this._option = option;
    }


    // Method to set up button click event handlers
    private setupButtonClickHandlers(): void {
        this.EasyButton?.node.on(Button.EventType.CLICK, () => {
            this.onSelectDifficulty(Difficulty.Easy);
        }, this);
        this.MediumButton?.node.on(Button.EventType.CLICK, () => {
            this.onSelectDifficulty(Difficulty.Medium);
        }, this);
        this.HardButton?.node.on(Button.EventType.CLICK, () => {
            this.onSelectDifficulty(Difficulty.Hard);
        }, this);
    }

    private onSelectDifficulty(difficulty: Difficulty): void {
        this._selectedDifficulty = difficulty;
        if (this._option.selectionCallback) {
            this._option.selectionCallback(difficulty);
        }
        SoundController.instance.PlayButtonClick();
        this.hide();
    }
}
export class DifficultySelectionOption extends UIScreenOption{
    selectionCallback: (value: Difficulty) => void = null;
}
export enum Difficulty {
    Easy,
    Medium,
    Hard
}

