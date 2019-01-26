#version 300 es

precision mediump float;

uniform sampler2D uSampler;
uniform bool uHasTexture;
uniform lowp float uAlpha;
uniform lowp vec3 uColor;

in vec2 texCoord;

out lowp vec4 outColor;

void main() {
  if (uHasTexture) {
    vec4 result = texture(uSampler, texCoord);

    if (result.a < 0.9f) {
      discard;
    }

    outColor = vec4(result.rgb, uAlpha);
  } else {
    outColor = vec4(uColor, uAlpha);
  }
}
