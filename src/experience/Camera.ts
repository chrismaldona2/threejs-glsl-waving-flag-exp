import * as THREE from "three";
import Experience from "./Experience";
import Size from "./utils/Size";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class Camera {
  sizes: Size;
  scene: THREE.Scene;
  instance: THREE.Camera;
  orbitControls: OrbitControls;

  constructor() {
    const { canvas, sizes, scene } = Experience.getInstance();
    this.sizes = sizes;
    this.scene = scene;

    /* PERSPECTIVE CAMERA */
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.instance.position.set(0, 0, 3.5);
    this.sizes.on("resize", () => this.resize());
    scene.add(this.instance);

    /* ORBIT CONTROLS */
    this.orbitControls = new OrbitControls(this.instance, canvas.domElement);
    this.orbitControls.target.set(0, -0.25, 0);
    this.orbitControls.enableDamping = true;
    this.orbitControls.maxPolarAngle = Math.PI / 2.1;
    this.orbitControls.maxDistance = 5;
    this.orbitControls.minAzimuthAngle = -Math.PI / 2.75;
    this.orbitControls.maxAzimuthAngle = Math.PI / 2.75;
  }

  update() {
    this.orbitControls.update();
  }

  resize() {
    if (this.instance instanceof THREE.PerspectiveCamera) {
      this.instance.aspect = this.sizes.width / this.sizes.height;
      this.instance.updateProjectionMatrix();
    }
  }

  dispose() {
    this.scene.remove(this.instance);
    this.orbitControls.dispose();
  }
}
export default Camera;
