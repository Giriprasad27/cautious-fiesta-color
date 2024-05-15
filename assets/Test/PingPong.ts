import { _decorator, Component, Node, Vec3, EventTarget } from 'cc';
const { ccclass, property } = _decorator;
const eventTarget = new EventTarget();

@ccclass('PingPong')
export class PingPong extends Component {
   // Properties
   
   // variables
   private playerNode: Node = null;
   private startPos: Vec3 = new Vec3(-5, 0,0);
   private endPos: Vec3 = new Vec3(5, 0,0); 
   private isInit: boolean = false; 

   protected start(): void {
       this
   }
   onLoad() {
       // Initialization code here
       this.playerNode = this.node;
       this.node.position = this.startPos;
   }

   // Update method, called every frame
   update(dt: number) {
    if(this.isInit){
     this.pingPing(dt);
    }
   }

   // Custom methods
   pingPing(dt:number){
    let position = this.node.position;
    position = position.lerp(this.endPos,dt);
    this.node.position = position;
     if(Vec3.distance(this.node.position,this.endPos)<0.1){
        this.endPos = this.endPos.multiplyScalar(-1);
     }
   }

   initObject(){
    this.isInit = true;
    this.node.on(Node.EventType.MOUSE_DOWN, this.onTouchEnd, this);
   }

   onTouchEnd(event: EventTarget) {
    console.log("Cube clicked! "+this.node.name);
    }
}


