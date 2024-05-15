import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundController extends Component {

    private static _instance: SoundController | null = null;
    // Static method to get the singleton instance
    public static get instance(): SoundController {
        if (!SoundController._instance) {
            SoundController._instance = new SoundController();
        }
        return SoundController._instance;
    }

    // Method to play a one-shot sound
    public playOneShot(soundName: string): void {
        console.log(`Playing one-shot sound: ${soundName}`);
    }
}

