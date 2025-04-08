import * as THREE from "three";

class Floor {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  mesh: THREE.Mesh;

  constructor() {
    const params = {
      color: 0xf3f3f3,
    };

    this.geometry = new THREE.CircleGeometry(0.5, 64);
    this.material = new THREE.MeshBasicMaterial(params);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(1, 0.5, 1);
    this.mesh.name = "Flag shadow";

    // POSITIONING
    this.mesh.position.y = -1.1;
    this.mesh.rotation.x = -Math.PI / 2;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
export default Floor;
