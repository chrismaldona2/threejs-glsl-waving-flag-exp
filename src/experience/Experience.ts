import * as THREE from "three";
import Size from "./utils/Size";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Timer from "./utils/Timer";
import World from "./world/World";
import Canvas from "./Canvas";
import Debug from "./utils/Debug";
import Resources from "./utils/Resources";
import FullscreenHandler from "./utils/FullscreenHandler";

class Experience {
  private static instance: Experience | null = null;
  debug!: Debug;
  canvas!: Canvas;
  fullscreenHandler!: FullscreenHandler;
  sizes!: Size;
  timer!: Timer;
  resources!: Resources;
  scene!: THREE.Scene;
  camera!: Camera;
  renderer!: Renderer;
  world!: World;

  constructor() {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    // FOR CONSOLE DEBUG ↓
    // @ts-ignore
    window.experience = this;

    this.debug = new Debug();
    this.canvas = new Canvas();
    this.fullscreenHandler = new FullscreenHandler();
    this.sizes = new Size();
    this.timer = new Timer();
    this.resources = new Resources();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    this.timer.on("tick", () => this.update());
    this.update();
  }

  update() {
    this.world.update();
    this.camera.update();
    this.renderer.update();
  }

  destroy() {
    this.debug.destroy();
    this.fullscreenHandler.dispose();
    this.sizes.dispose();
    this.timer.dispose();
    this.world.destroy();
    this.renderer.dispose();
    this.camera.dispose();
    this.canvas.remove();
  }

  static getInstance() {
    if (!Experience.instance) {
      throw new Error("Experience not initialized yet");
    }
    return Experience.instance;
  }
}
export default Experience;
