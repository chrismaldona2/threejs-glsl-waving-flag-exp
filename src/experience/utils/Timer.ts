import { Timer as ThreeTimer } from "three/examples/jsm/Addons.js";
import EventEmitter from "./EventEmitter";

class Timer extends EventEmitter {
  instance: ThreeTimer;
  elapsedTime!: number;
  deltaTime!: number;

  constructor() {
    super();
    this.instance = new ThreeTimer();

    window.requestAnimationFrame(() => this.tick());
  }

  tick() {
    window.requestAnimationFrame(() => this.tick());
    this.instance.update();
    this.elapsedTime = this.instance.getElapsed();
    this.deltaTime = this.instance.getDelta();
    this.trigger("tick");
  }

  dispose() {
    this.off("tick");
    this.instance.dispose();
  }
}
export default Timer;
