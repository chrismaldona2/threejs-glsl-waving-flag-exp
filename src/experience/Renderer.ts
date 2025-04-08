import * as THREE from "three";
import Experience from "./Experience";
import Size from "./utils/Size";

class Renderer {
  instance: THREE.WebGLRenderer;
  sizes: Size;
  scene: THREE.Scene;
  camera: THREE.Camera;

  constructor() {
    const experience = Experience.getInstance();

    this.sizes = experience.sizes;
    this.camera = experience.camera.instance;
    this.scene = experience.scene;

    this.instance = new THREE.WebGLRenderer({
      antialias: true,
      canvas: experience.canvas.domElement,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
    this.instance.setClearColor(0xffffff);

    this.sizes.on("resize", () => this.resize());
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera);
  }

  dispose() {
    this.instance.dispose();
  }
}

export default Renderer;
