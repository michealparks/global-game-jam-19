precision mediump float;

uniform sampler2D uSampler;
uniform lowp float uAlpha;

varying vec2 texCoord;

void main() {
  vec4 result = texture2D(uSampler, texCoord);

  if (result.a < 0.1) {
    discard;
  }

  gl_FragColor = result;
}
