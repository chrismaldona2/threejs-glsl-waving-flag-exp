// precision mediump float;

uniform vec3 uColor;
uniform sampler2D uColorTexture;
uniform sampler2D uAlphaTexture;

varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 textureColor = texture2D(uColorTexture, vUv);
  textureColor.rgb *= vElevation * 2.0 + 1.1;

  gl_FragColor = textureColor;
}