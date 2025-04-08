import * as THREE from "three";
import Floor from "./elements/Floor";
import Experience from "../Experience";
import Environment from "./Environment";
import Flag from "./elements/flag/Flag";

class World {
  private readonly experience: Experience;
  scene: THREE.Scene;
  environment: Environment;
  floor: Floor;
  flag!: Flag;

  constructor() {
    this.experience = Experience.getInstance();

    this.scene = this.experience.scene;

    /* WORLD ENVIRONMENT */
    this.environment = new Environment();

    /* WORLD ELEMENTS */
    this.floor = new Floor();

    this.experience.resources.on("ready", () => {
      this.flag = new Flag();
      this.scene.add(this.floor.mesh, this.flag.mesh);
    });
  }

  update() {
    if (this.flag) this.flag.update();
  }

  destroy() {
    this.scene.remove(this.floor.mesh);
    this.floor.dispose();
  }
}
export default World;
