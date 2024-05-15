import { _decorator, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIScreenBaseCtrl')
export class UIScreenBaseCtrl extends Component {

    @property(Animation)
    animator : Animation = null;
    public init(option : UIScreenOption): void{
        this.show();
    }

    public show(): void {
        this.node.active = true;
        if (this.animator) {
            this.animator.play("show");
        }
    }

    public hide(): void {
        if (this.animator) {
            this.animator.play("hide");
        } else {
            this.node.active = false;
        }
        this.node.active = false;
    }

    onFinishHideAnimation(): void {
        this.node.active = false;
    }
}

export class UIScreenOption{
    callback?: (value: string) => void = null;
}

