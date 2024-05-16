import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundController extends Component {
    @property(AudioSource)
    private bgmAudioSource: AudioSource = null;

    @property(AudioSource)
    private sfxAudioSource: AudioSource = null;

    @property(AudioClip)
    private bgmAudioClip: AudioClip = null;

    @property(AudioClip)
    private buttonClickClip: AudioClip = null;

    private static _instance: SoundController | null = null;
    // Static method to get the singleton instance
    public static get instance(): SoundController {
        return this._instance;
    }

    onLoad() {
        if (SoundController._instance) {
            this.destroy();
            return;
        }
        SoundController._instance = this;
        this.bgmAudioSource.loop = true;
        this.sfxAudioSource.loop = false;
        this.bgmAudioSource.volume = 0.3;
        this.sfxAudioSource.volume = 1;
    }

    public playBackgroundMusic(bgmClip?: AudioClip) {
        this.bgmAudioSource.stop();
        if(bgmClip){
            this.bgmAudioSource.clip = bgmClip;
        }else{
            this.bgmAudioSource.clip = this.bgmAudioClip;
        }
        this.bgmAudioSource.play();
    }
    // Method to stop background music
    public stopBackgroundMusic() {
        this.bgmAudioSource.stop();
    }

    // Method to play a one-shot sound
    public playOneShot(sfxClip: AudioClip): void {
        this.sfxAudioSource.playOneShot(sfxClip);
    }

    public PlayButtonClick(): void {
        this.sfxAudioSource.playOneShot(this.buttonClickClip);
    }
}

