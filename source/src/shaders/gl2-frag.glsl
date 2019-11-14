#version 300 es

precision mediump float;

uniform sampler2D uSampler;
uniform lowp float uAlpha;

in vec2 texCoord;

out lowp vec4 outColor;

void main() {
  vec4 result = texture(uSampler, texCoord);

  if (result.a < 0.1f) {
    discard;
  }

  outColor = result;
}
