import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import Experience from "../../../Experience";

class Flag {
  geometry: THREE.BufferGeometry;
  material: THREE.RawShaderMaterial | THREE.ShaderMaterial;
  colorTexture?: THREE.Texture;
  mesh: THREE.Mesh;
  wavingSpeed: number;
  private readonly experience: Experience;

  constructor() {
    this.experience = Experience.getInstance();

    /* TEXTURE */
    const flagTexture = this.experience.resources.getItem(
      "argentinaFlagTexture"
    );
    if (flagTexture instanceof THREE.Texture) {
      this.colorTexture = flagTexture;
      this.colorTexture.colorSpace = THREE.SRGBColorSpace;
    } else {
      console.error(
        "Expected a THREE.Texture for 'argentinaFlagTexture2', but got something else."
      );
    }

    /* MESH */
    this.geometry = new THREE.PlaneGeometry(1, 1, 25, 25);

    // RAW SHADER MATERIAL VARIANT
    // this.material = new THREE.RawShaderMaterial({
    //   side: THREE.DoubleSide,
    //   transparent: true,
    //   depthWrite: false,
    //   vertexShader,
    //   fragmentShader,
    //   uniforms: {
    //     uFrecuency: { value: new THREE.Vector2(6.5, 5) },
    //     uTime: { value: 0 },
    //     uColorTexture: { value: this.colorTexture },
    //   },
    // });

    // SHADER MATERIAL
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      vertexShader,
      fragmentShader,
      uniforms: {
        uFrecuency: { value: new THREE.Vector2(4.75, 5.25) },
        uTime: { value: 0 },
        uColorTexture: { value: this.colorTexture },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = "Flag";
    this.wavingSpeed = 1;
    // TWEAKS
    const gui = this.experience.debug.gui;
    const tweaks = gui.addFolder("Flag");

    tweaks
      .add(this.material.uniforms.uFrecuency.value, "x")
      .min(0)
      .max(20)
      .step(0.01)
      .name("frecuencyX");

    tweaks
      .add(this.material.uniforms.uFrecuency.value, "y")
      .min(0)
      .max(20)
      .step(0.01)
      .name("frecuencyY");

    tweaks.add(this, "wavingSpeed").min(0).max(10).step(0.01);
  }

  update() {
    // ANIMATION
    const elapsedTime = this.experience.timer.elapsedTime;
    const { uTime } = this.material.uniforms;
    uTime.value = elapsedTime * this.wavingSpeed;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

export default Flag;
