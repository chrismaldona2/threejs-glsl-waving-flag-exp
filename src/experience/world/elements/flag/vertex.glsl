// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
uniform vec2 uFrecuency;
uniform float uTime;

// attribute vec3 position;
// attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrecuency.x - uTime) * 0.06;
  elevation += sin(modelPosition.y * uFrecuency.y - uTime) * 0.05;

  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
  vElevation = elevation;
}