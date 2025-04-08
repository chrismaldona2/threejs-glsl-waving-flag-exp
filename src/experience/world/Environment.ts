import * as THREE from "three";
import Experience from "../Experience";

class Environment {
  private readonly experience: Experience;
  scene: THREE.Scene;

  constructor() {
    this.experience = Experience.getInstance();
    this.scene = this.experience.scene;
    this.scene.background = new THREE.Color(0xffffff);
  }
}
export default Environment;
